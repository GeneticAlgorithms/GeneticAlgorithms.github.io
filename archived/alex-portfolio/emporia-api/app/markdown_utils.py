from __future__ import annotations
from typing import List, Tuple

def assemble_consolidated_markdown(message: str, per_file_markdown: List[Tuple[str, str]]) -> str:
    parts: List[str] = []
    if message:
        parts.append(f"# Context\n\n{message}\n")
    parts.append("# Documents Summary\n")
    for file_name, md in per_file_markdown:
        if not md.lstrip().startswith("# "):
            md = f"# {file_name}\n\n" + md
        parts.append(md)
        parts.append("\n\n---\n")
    return "\n".join(parts).strip()
