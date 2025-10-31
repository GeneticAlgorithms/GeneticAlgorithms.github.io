import asyncio
import os
from pathlib import Path
import time
import httpx

API_URL = os.environ.get("API_URL", "http://localhost:8000/process-pdfs")
PDF_DIR = Path(os.environ.get("PDF_DIR", str(Path(__file__).parent / "pdfs")))
OUT_MD = Path(os.environ.get("OUT_MD", str(Path(__file__).parent / "output.md")))

async def main():
    pdfs = sorted(PDF_DIR.glob("*.pdf"))
    if len(pdfs) < 10:
        raise SystemExit(f"Need at least 10 PDFs in {PDF_DIR}")

    files = [("files", (p.name, p.read_bytes(), "application/pdf")) for p in pdfs[:15]]
    data = {"message": "Summarize all documents", "chatid": "demo123", "userid": "alex"}

    t0 = time.perf_counter()
    async with httpx.AsyncClient(timeout=None) as client:
        resp = await client.post(API_URL, files=files, data=data)
        elapsed = time.perf_counter() - t0
        print("Status:", resp.status_code)
        print("Elapsed (client):", f"{elapsed:.2f}s")
        print("Server X-Elapsed-Seconds:", resp.headers.get("x-elapsed-seconds"))
        print("X-Processed-Files:", resp.headers.get("x-processed-files"))
        resp.raise_for_status()
        content = resp.text
    OUT_MD.write_text(content)
    print("Saved:", OUT_MD)

if __name__ == "__main__":
    asyncio.run(main())
