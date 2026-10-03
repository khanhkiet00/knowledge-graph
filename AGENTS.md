# Knowledge Graph Project - Core Agent Guidelines

> [!NOTE]
> File này đồng bộ với [`.agents/AGENTS.md`](file:///d:/DuLieu/Project/knowledge-graph/.agents/AGENTS.md). 
> Mọi quy tắc cốt lõi dưới đây áp dụng cho toàn bộ dự án `knowledge-graph`.

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

## 5. Quy tắc Quản lý Technical Debt (Technical Debt Rules)

Trước khi thực hiện một tính năng mới hoặc thay đổi kiến trúc, Agent bắt buộc phải kiểm tra thư mục:
`docs/technical-debt/`

Các quy tắc bắt buộc áp dụng:
1. **Kiểm tra trạng thái**: Đọc tài liệu Technical Debt liên quan và kiểm tra `Status` cùng các `Activation Conditions`.
2. **Bảo toàn trạng thái Trì hoãn**: Không tự ý thực hiện hay kích hoạt các item Technical Debt đang ở trạng thái `deferred`.
3. **Không tự kích hoạt dịch vụ trả phí**: Không tự ý giới thiệu dịch vụ trả phí, thay đổi AI Provider, hoặc phát sinh bất kỳ chi phí nào.
4. **Hỏi ý kiến người dùng**: Phải xin xác nhận của người dùng trước khi tiến hành bất kỳ thay đổi nào có khả năng phát sinh chi phí.
5. **Quy trình triển khai**: Khi một item Technical Debt được người dùng kích hoạt triển khai, Agent phải tuân thủ đúng phần `Required Work` được định nghĩa chi tiết trong tài liệu của item đó.
6. **Tiêu chí hoàn thành**: Không đánh dấu trạng thái của Technical Debt là `resolved` cho đến khi tất cả các tiêu chí `Success Criteria` được kiểm chứng hoàn tất.
