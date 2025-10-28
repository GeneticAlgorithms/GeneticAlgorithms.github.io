from __future__ import annotations
import asyncio
from typing import Tuple
from azure.ai.documentintelligence.aio import DocumentIntelligenceClient
from azure.core.credentials import AzureKeyCredential
from azure.core.exceptions import HttpResponseError
from .config import settings

class AzureDIExtractor:
    def __init__(self):
        self._client = DocumentIntelligenceClient(
            endpoint=settings.azure_di_endpoint,
            credential=AzureKeyCredential(settings.azure_di_key),
        )
        self._model_id = settings.model_id
        self._timeout = settings.request_timeout_seconds

    async def extract_markdown(self, file_name: str, file_bytes: bytes) -> Tuple[str, str]:
        # Returns (file_name, markdown)
        try:
            poller = await self._client.begin_analyze_document(
                model_id=self._model_id,
                analyze_request=file_bytes,
                content_type="application/pdf",
            )
            result = await asyncio.wait_for(poller.result(), timeout=self._timeout)
        except (asyncio.TimeoutError, HttpResponseError) as e:
            return file_name, f"# {file_name}\n\n> Extraction failed: {e}"

        # Build a simple markdown from pages with lines
        md_lines = [f"# {file_name}"]
        try:
            if getattr(result, "pages", None):
                for page in result.pages:
                    md_lines.append(f"\n## Page {page.page_number}")
                    lines_accum = []
                    if getattr(page, "lines", None):
                        for ln in page.lines:
                            text = getattr(ln, "content", "").strip()
                            if text:
                                lines_accum.append(text)
                    elif getattr(page, "words", None):
                        words = [w.content for w in page.words if getattr(w, "content", None)]
                        if words:
                            lines_accum.append(" ".join(words))
                    if lines_accum:
                        md_lines.append("\n" + "\n".join(f"- {l}" for l in lines_accum))
            else:
                content = getattr(result, "content", "")
                if content:
                    md_lines.append("\n" + content)
        except Exception as e:
            md_lines.append(f"\n> Post-processing error: {e}")
        return file_name, "\n".join(md_lines)

    async def close(self):
        await self._client.close()
