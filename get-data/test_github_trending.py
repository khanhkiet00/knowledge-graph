import unittest
from unittest.mock import patch, MagicMock
from github_trending import fetch_trending

# Giả lập một đoạn mã HTML tương tự như những gì GitHub trả về
MOCK_HTML = """
<html>
<body>
    <article class="Box-row">
        <h2>
            <a href="/facebook/react">facebook / react</a>
        </h2>
        <p class="col-9 color-fg-muted my-1 pr-4">
            A declarative, efficient, and flexible JavaScript library for building user interfaces.
        </p>
        <div class="f6 color-fg-muted mt-2">
            <span itemprop="programmingLanguage">JavaScript</span>
            <a href="/facebook/react/stargazers">
                210,000
            </a>
            <span class="d-inline-block float-sm-right">
                1,000 stars this week
            </span>
        </div>
    </article>

    <article class="Box-row">
        <h2>
            <a href="/empty/desc-repo">empty / desc-repo</a>
        </h2>
        <!-- Repo này không có mô tả và ngôn ngữ lập trình -->
        <p></p>
        <div class="f6 color-fg-muted mt-2">
            <a href="/empty/desc-repo/stargazers">
                1,500
            </a>
            <span class="d-inline-block float-sm-right">
                50 stars today
            </span>
        </div>
    </article>
</body>
</html>
"""

class TestGitHubTrending(unittest.TestCase):

    @patch('github_trending.fetch_readme_description')
    @patch('github_trending.requests.get')
    def test_fetch_trending_parsing(self, mock_get, mock_fetch_readme):
        # Mock fallback README
        mock_fetch_readme.return_value = "This is a fallback description from README."
        
        # Thiết lập Mock Response
        mock_response = MagicMock()
        mock_response.text = MOCK_HTML
        mock_response.raise_for_status.return_value = None
        mock_get.return_value = mock_response

        # Gọi hàm cần test
        repos = fetch_trending('weekly')

        # Kiểm tra xem hàm có gọi đúng URL và params không
        mock_get.assert_called_once_with(
            "https://github.com/trending",
            params={"since": "weekly"},
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
            },
            timeout=15
        )

        # Kiểm tra tổng số repo lấy được
        self.assertEqual(len(repos), 2)

        # Kiểm tra dữ liệu của Repo đầu tiên (có đầy đủ thông tin)
        repo1 = repos[0]
        self.assertEqual(repo1['name'], "facebook / react")
        self.assertEqual(repo1['url'], "https://github.com/facebook/react")
        self.assertEqual(repo1['description'], "A declarative, efficient, and flexible JavaScript library for building user interfaces.")
        self.assertEqual(repo1['language'], "JavaScript")
        self.assertEqual(repo1['stars_total'], 210000) # Đã được ép kiểu Integer
        self.assertEqual(repo1['stars_period'], "1,000 stars this week")

        # Kiểm tra dữ liệu của Repo thứ hai (xem có xử lý rỗng tốt không)
        repo2 = repos[1]
        self.assertEqual(repo2['name'], "empty / desc-repo")
        self.assertEqual(repo2['description'], "This is a fallback description from README.") # Đã được fallback từ README
        self.assertEqual(repo2['language'], "N/A") # Không có ngôn ngữ thì là N/A
        self.assertEqual(repo2['stars_total'], 1500) # Ép kiểu Integer thành công

    def test_fetch_trending_invalid_period(self):
        # Nếu truyền một chuỗi không hợp lệ, nó phải bắn ra ValueError
        with self.assertRaises(ValueError):
            fetch_trending('yearly')


if __name__ == '__main__':
    unittest.main()
