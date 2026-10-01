# Knowledge Graph Project - Core Agent Guidelines

File này chứa các quy tắc CỐT LÕI (Core Guidelines) bắt buộc áp dụng cho toàn bộ dự án `knowledge-graph`.

## 1. Quy định về Kiểm thử (Testing) - QUAN TRỌNG NHẤT
- **BẮT BUỘC VIẾT TEST**: Mỗi khi thực hiện xong 1 công việc, 1 hàm hay 1 tính năng mới (đặc biệt là Backend/Data), AI BẮT BUỘC phải viết mã kiểm thử (Test) ngay lập tức để xác nhận tính năng đó hoạt động đúng.
- Đối với Python: Sử dụng framework `unittest` có sẵn. File test phải bắt đầu bằng chữ `test_` (ví dụ: `test_github_trending.py`). 

## 2. Công nghệ & Kiến trúc (Tech Stack)
- **Data Pipeline (Backend)**: Nằm trong thư mục `get-data/`. Viết bằng Python.
  - Quản lý thư viện qua `requirements.txt`.
  - Kết nối Database sử dụng thư viện `neo4j` chính thức (Bolt protocol).
- **Database**: Neo4j Graph Database. Chạy qua Docker (`docker-compose.yml`).
- **Frontend**: Nằm trong thư mục `dashboard/`. Xây dựng bằng React + Vite.
  - *Lưu ý: Các quy tắc thiết kế giao diện chi tiết đã được đóng gói thành một Skill riêng (`frontend_design`).*

## 3. Quy tắc Bảo mật & Cấu hình
- Quản lý biến môi trường (Database URI, mật khẩu, API keys) thông qua file `.env`.
- **Tuyệt đối KHÔNG hard-code** mật khẩu thật vào code.
- Luôn cập nhật file `.env.example` khi có biến môi trường mới, và TUYỆT ĐỐI KHÔNG commit file `.env` thật lên Git.

## 4. Quy ước Đặt tên và Ngôn ngữ
- **Tên biến / Hàm / Class**: Viết bằng tiếng Anh chuẩn (vd: `fetch_trending`, `neo4j_sync`).
- **Log / Print / Thông báo lỗi / Giao diện**: In ra bằng tiếng Việt để dễ dàng theo dõi hệ thống.
