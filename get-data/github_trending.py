"""
Lấy top repo trending trên GitHub theo ngày/tuần/tháng.
Không lọc theo ngôn ngữ lập trình — lấy toàn bộ danh sách trending chung.

Cách dùng:
    python github_trending.py weekly
    python github_trending.py monthly
    python github_trending.py daily      (mặc định nếu không truyền gì)
"""

import sys
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://github.com/trending"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/124.0 Safari/537.36"
}

def fetch_readme_description(url: str):
    """
    Truy cập vào trang chủ của Repo để lấy đoạn văn đầu tiên trong README làm mô tả dự phòng.
    """
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code == 200:
            soup = BeautifulSoup(resp.text, "html.parser")
            # Nội dung README trên GitHub thường nằm trong article.markdown-body
            article = soup.select_one("article.markdown-body")
            if article:
                for p in article.select("p"):
                    text = p.get_text(strip=True)
                    if text:
                        return text
    except Exception:
        pass
    return None



def fetch_trending(since: str = "daily"):
    """
    since: 'daily' | 'weekly' | 'monthly'
    Trả về list[dict] gồm: name, url, description, language, stars_total, stars_period
    """
    if since not in {"daily", "weekly", "monthly"}:
        raise ValueError("since phải là 'daily', 'weekly' hoặc 'monthly'")

    resp = requests.get(BASE_URL, params={"since": since}, headers=HEADERS, timeout=15)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    repos = []

    for article in soup.select("article.Box-row"):
        # Tên repo dạng "owner / repo"
        h2 = article.select_one("h2 a")
        if not h2:
            continue
        full_name = h2.get("href", "").strip("/")
        name = full_name.replace("/", " / ")
        url = f"https://github.com/{full_name}"

        desc_tag = article.select_one("p")
        description = desc_tag.get_text(strip=True) if desc_tag else None
        if description == "":
            description = None
            
        # Nếu vẫn không có description, thử lấy từ README
        if description is None:
            description = fetch_readme_description(url)

        lang_tag = article.select_one('[itemprop="programmingLanguage"]')
        language = lang_tag.get_text(strip=True) if lang_tag else "N/A"

        # Tổng số sao (link "stargazers")
        star_tag = article.select_one('a[href$="/stargazers"]')
        stars_total_str = star_tag.get_text(strip=True) if star_tag else "0"
        try:
            stars_total = int(stars_total_str.replace(",", ""))
        except ValueError:
            stars_total = 0

        # Số sao tăng thêm trong khoảng thời gian (ví dụ "123 stars this week")
        period_tag = article.select_one("span.d-inline-block.float-sm-right")
        stars_period = period_tag.get_text(strip=True) if period_tag else ""

        repos.append({
            "name": name,
            "url": url,
            "description": description,
            "language": language,
            "stars_total": stars_total,
            "stars_period": stars_period,
        })

    return repos


def print_table(repos, since):
    label = {"daily": "hôm nay", "weekly": "tuần này", "monthly": "tháng này"}[since]
    print(f"\n=== Top {len(repos)} repo trending {label} ===\n")
    for i, r in enumerate(repos, 1):
        print(f"{i}. {r['name']}  ({r['language']})")
        print(f"   {r['url']}")
        if r["description"]:
            print(f"   {r['description']}")
        print(f"   ⭐ {r['stars_total']} tổng | {r['stars_period']}")
        print()


if __name__ == "__main__":
    period = sys.argv[1] if len(sys.argv) > 1 else "daily"
    data = fetch_trending(since=period)
    print_table(data, period)