from __future__ import annotations
import time
import asyncio
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request
from fastapi.responses import PlainTextResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.cors import CORSMiddleware
from .config import settings
from .di_client import AzureDIExtractor
from .markdown_utils import assemble_consolidated_markdown

app = FastAPI(title="Emporia Multi-PDF Processor", version="1.0.0")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup templates
templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PDF_MIME = "application/pdf"
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB

@app.post("/process-pdfs", response_class=PlainTextResponse)
async def process_pdfs(
    files: List[UploadFile] = File(..., description="1-15 PDF files"),
    message: str = Form(...),
    chatid: Optional[str] = Form(None),
    userid: Optional[str] = Form(None),
):
    start_time = time.perf_counter()

    if not (1 <= len(files) <= 15):
        raise HTTPException(status_code=400, detail="files must contain between 1 and 15 PDFs")

    pdf_buffers: List[bytes] = []
    file_names: List[str] = []
    for f in files:
        content_type = f.content_type or ""
        if content_type != PDF_MIME and not f.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail=f"Invalid file type for {f.filename}; only PDF allowed")
        data = await f.read()
        if len(data) == 0:
            raise HTTPException(status_code=400, detail=f"{f.filename} is empty")
        if len(data) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail=f"{f.filename} exceeds 20MB limit")
        pdf_buffers.append(data)
        file_names.append(f.filename)

    extractor = AzureDIExtractor()
    sem = asyncio.Semaphore(settings.max_concurrency)

    async def process_one(idx: int):
        async with sem:
            name = file_names[idx]
            buf = pdf_buffers[idx]
            return await extractor.extract_markdown(name, buf)

    tasks = [asyncio.create_task(process_one(i)) for i in range(len(pdf_buffers))]
    results = await asyncio.gather(*tasks)
    await extractor.close()

    consolidated = assemble_consolidated_markdown(message, results)

    elapsed = time.perf_counter() - start_time
    headers = {
        "X-Processed-Files": str(len(files)),
        "X-Elapsed-Seconds": f"{elapsed:.2f}",
        "X-ChatId": chatid or "",
        "X-UserId": userid or "",
    }
    return PlainTextResponse(content=consolidated, headers=headers)

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}
