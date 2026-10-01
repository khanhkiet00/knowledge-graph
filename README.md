# Knowledge Graph Project 🧠

Một hệ thống tự động thu thập, lưu trữ và trực quan hóa dữ liệu (từ GitHub Trending) dưới dạng Đồ thị Tri thức (Knowledge Graph). Dự án giúp khám phá các mối quan hệ giữa các Repository, Ngôn ngữ lập trình và các Xu hướng công nghệ.

## 🛠 Công nghệ sử dụng
- **Cơ sở dữ liệu:** Neo4j (Graph Database)
- **Data Pipeline (Backend):** Python (Requests, BeautifulSoup4)
- **Giao diện (Frontend):** React + Vite + CSS 

## 📂 Cấu trúc thư mục

```text
knowledge-graph/
├── get-data/        # Pipeline thu thập dữ liệu bằng Python và lưu vào Neo4j
└── dashboard/       # Giao diện Web hiển thị Knowledge Graph (React)
```

---

## 🚀 Hướng dẫn cài đặt và chạy dự án

### 1. Chuẩn bị Cơ sở dữ liệu (Neo4j)
Đảm bảo bạn đã cài đặt và đang chạy Neo4j Database (thông qua Docker hoặc Neo4j Desktop).
Cổng mặc định thường là `bolt://localhost:7687`.

### 2. Thiết lập Data Pipeline (Thư mục `get-data`)
Phần này chịu trách nhiệm cào dữ liệu từ GitHub Trending và nạp vào Neo4j.

**Bước 2.1: Cài đặt thư viện**
Mở terminal và di chuyển vào thư mục `get-data`:
```bash
cd get-data
pip install -r requirements.txt
```

**Bước 2.2: Cấu hình biến môi trường**
Copy file `.env.example` thành file `.env` và điền mật khẩu Neo4j của bạn:
```bash
cp .env.example .env
```
*(Lưu ý: Mở file `.env` để sửa lại thông tin `NEO4J_PASSWORD`)*

**Bước 2.3: Chạy luồng lấy dữ liệu**
Để lấy dữ liệu trending theo tuần (hoặc đổi thành `daily`, `monthly`):
```bash
python neo4j_sync.py weekly
```
Để chạy Unit Test nhằm đảm bảo code cào dữ liệu hoạt động đúng:
```bash
python test_github_trending.py -v
```

### 3. Thiết lập Web Dashboard (Thư mục `dashboard`)
Phần này hiển thị giao diện đồ thị tri thức.

Mở một tab terminal mới và di chuyển vào thư mục `dashboard`:
```bash
cd dashboard
npm install
npm run dev
```
Trang web sẽ tự động mở lên tại địa chỉ hiển thị trong terminal (thường là `http://localhost:5173`).

---

*Tài liệu này sẽ liên tục được cập nhật song song với quá trình phát triển dự án.*
