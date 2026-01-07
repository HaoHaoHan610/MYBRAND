def gogoduck_trafilatura_openai(
    query: str,
    k: int = 2,
    region: str = "vn-vi",
    backend: str = "duckduckgo",
    model: str = "gpt-4o-mini",
    max_input_chars: int = 12000,
    max_output_tokens: int = 220,
    timeout_sec: int = 20,
    api_key: str | None = None,
    save_json_path: str | None = None,
    verbose: bool = True,
):
    """
    One-function pipeline:
    DDG search (ddgs) -> scrape & extract (trafilatura) -> summarize (OpenAI).

    Requirements:
      pip install -U ddgs trafilatura openai python-dotenv
    Env:
      OPENAI_API_KEY=...

    Returns:
      payload dict (query, created_at, results...)
    """
    import os
    import re
    import json
    from copy import deepcopy
    from datetime import datetime, timezone
    from typing import Any, Dict, List

    from ddgs import DDGS
    from trafilatura import fetch_url, extract
    from trafilatura.settings import DEFAULT_CONFIG
    from openai import OpenAI

    # ---- tiny utils (kept inside to stay "one function") ----
    def is_probably_non_html(url: str) -> bool:
        u = (url or "").lower()
        return any(u.endswith(ext) for ext in [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx"])

    def compress_text_for_llm(text: str, max_chars: int) -> str:
        text = re.sub(r"\s+", " ", (text or "")).strip()
        if len(text) <= max_chars:
            return text
        head = int(max_chars * 0.65)
        tail = max_chars - head
        return text[:head] + " ... [TRUNCATED MIDDLE] ... " + text[-tail:]

    def scrape_main_text(url: str) -> str:
        cfg = deepcopy(DEFAULT_CONFIG)
        cfg["DEFAULT"]["DOWNLOAD_TIMEOUT"] = str(timeout_sec)

        html = fetch_url(url, config=cfg)  # no timeout= param here
        if not html:
            return ""
        text = extract(
            html,
            include_comments=False,
            include_tables=False,
            favor_precision=True,
            deduplicate=True,
            config=cfg,
        )
        return (text or "").strip()

    def summarize_openai(client: OpenAI, text: str) -> str:
        prompt = f"""Tóm tắt nội dung sau bằng tiếng Việt, KHÔNG bịa:
- Đúng 3 gạch đầu dòng (không hơn, không kém)
- Mỗi gạch 1 câu ngắn
- Giữ tên riêng/số liệu/mốc thời gian (nếu có)
- Nếu bài thiếu dữ kiện quan trọng: ghi "không thấy đề cập"

NỘI DUNG:
{text}
"""
        resp = client.responses.create(
            model=model,
            input=prompt,
            max_output_tokens=max_output_tokens,
        )
        return (resp.output_text or "").strip()

    # ---- OpenAI client ----
    key = api_key or os.getenv("OPENAI_API_KEY")
    if not key:
        raise RuntimeError("Thiếu OPENAI_API_KEY (env) hoặc truyền api_key=... vào hàm.")
    client = OpenAI(api_key=key)

    # ---- search ----
    with DDGS() as ddgs:
        raw = ddgs.text(
            query=query,
            region=region,
            safesearch="moderate",
            timelimit=None,
            max_results=k,
            page=1,
            backend=backend,
        )

    results_clean: List[Dict[str, str]] = [
        {
            "title": (r.get("title") or "").strip(),
            "url": (r.get("href") or "").strip(),
            "snippet": (r.get("body") or "").strip(),
        }
        for r in raw
    ]

    output: List[Dict[str, Any]] = []

    for idx, r in enumerate(results_clean, 1):
        url = r["url"]
        title = r["title"] or "(no title)"

        item: Dict[str, Any] = {
            "rank": idx,
            "title": title,
            "url": url,
            "snippet": r["snippet"],
            "extracted_chars": 0,
            "sent_chars": 0,
            "summary": "",
            "error": "",
        }

        if not url or is_probably_non_html(url):
            item["error"] = "Skip (non-HTML or empty URL)."
            output.append(item)
            continue

        try:
            text = scrape_main_text(url)
            item["extracted_chars"] = len(text)

            if len(text) < 200:
                item["error"] = "Extract quá ít text (bị chặn / trang JS nặng / không phải bài viết)."
                output.append(item)
                continue

            slim = compress_text_for_llm(text, max_input_chars)
            item["sent_chars"] = len(slim)

            item["summary"] = summarize_openai(client, slim)

        except Exception as e:
            item["error"] = f"{type(e).__name__}: {e}"

        output.append(item)

        if verbose:
            print("\n" + "=" * 90)
            print(f"{item['rank']}. {item['title']}")
            print(item["url"])
            if item["error"]:
                print(f"[ERROR] {item['error']}")
            else:
                print(f"[extracted_chars] {item['extracted_chars']} | [sent_chars] {item['sent_chars']}")
                print(item["summary"])

    payload = {
        "query": query,
        "region": region,
        "backend": backend,
        "model": model,
        "max_input_chars": max_input_chars,
        "max_output_tokens": max_output_tokens,
        "timeout_sec": timeout_sec,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "results": output,
    }

    if save_json_path:
        with open(save_json_path, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)
        if verbose:
            print(f"\nSaved JSON -> {save_json_path}")

    return payload

