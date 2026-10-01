# UI Design Guidelines (Dựa trên fe-example)

Khi tạo mới hoặc chỉnh sửa giao diện web (Frontend) trong workspace này, BẮT BUỘC phải tuân thủ nghiêm ngặt hệ thống thiết kế (Design System) dưới đây để đảm bảo sự đồng bộ toàn hệ thống:

## 1. Bố cục chung (App Layout)
- **App Shell**: 
  - `display: flex`, `min-height: 100vh`, `overflow: hidden`.
  - Nền toàn trang (Background): `#f8fafc`.
  - Màu chữ mặc định: `#172033`.
  - Cỡ chữ cơ bản: `13px` (phong cách web app).
  - Font chữ: Ưu tiên `Be Vietnam Pro` (dành cho tiếng Việt).

- **Sidebar (Trái)**:
  - Rộng cố định: `width: 224px` (`flex: 0 0 224px`).
  - Nền: Trắng `#fff`.
  - Viền phải: `1px solid #e9edf3`.
  - Padding chuẩn: `19px 12px 14px`.

- **Workspace (Khu vực chính giữa)**:
  - `flex: 1`, `display: flex`, `flex-direction: column`.
  - **Topbar (Header)**: Cao cố định `60px` (`flex: 0 0 60px`), nền `#fff`, viền dưới `1px solid #e9edf3`, padding ngang `24px`.
  - **Toolbar (Thanh công cụ phụ nếu có)**: Cao `83px`, viền dưới `#edf0f4`, nền `#fff`.
  - **Canvas/Main Content**: Phần còn lại (`flex: 1`), nền `#fafbfc`.

- **Inspector (Panel cấu hình bên phải - nếu có)**:
  - Rộng cố định: `width: 300px` (`flex: 0 0 300px`).
  - Nền: `#fff`.
  - Viền trái: `1px solid #e8ecf2`.

## 2. Màu sắc chủ đạo (Color Palette)
- **Background chính**: `#f8fafc`
- **Màu nền thành phần (Card/Panel)**: `#fff`
- **Màu nhấn chính (Primary)**: Tím `#6e56cf` (hover: `#6048c0`). Nền nhạt: `#f1efff`.
- **Viền (Borders)**: Xám nhạt `#e7ebf2` hoặc `#e9edf3`.
- **Text**: 
  - Tiêu đề/Chữ nhấn mạnh: `#172033` hoặc `#182235`.
  - Chữ phụ/Label: `#8b95a5`, `#9aa4b2` hoặc `#677388`.
- **Trạng thái (Status)**:
  - Thành công: `#50b98b` (Xanh ngọc).
  - Cảnh báo: `#c68425` (Vàng cam).
  - Lỗi: `#e38c8c` hoặc `#bd7171` (Đỏ).

## 3. Thành phần UI (UI Components)
- **Buttons (Nút bấm)**:
  - Border-radius: `6px` đến `7px`.
  - Nút primary: Chữ trắng `#fff`, nền tím `#6e56cf`, viền `#6048c0`, shadow siêu nhẹ `0 1px 2px #6e56cf33`.
  - Nút phụ/Icon button: Nền trong suốt, chữ/icon `#8490a2`. Hover: nền `#f4f5f8` hoặc `#f6f7fb`.
- **Icons**:
  - Dùng thư viện `lucide-react`.
  - Kích thước phổ biến: `14px` đến `18px`.
- **Nav items (Menu bên trái)**:
  - Gap: `11px`, Padding: `9px 11px`, Border-radius: `7px`.
  - Trạng thái Active: Chữ `#5d48bd`, nền `#f1efff`, `font-weight: 600`.
- **Form Inputs / Selects**:
  - Border: `1px solid #dfe4eb` hoặc `#e5e9ef`.
  - Border-radius: `5px`.
  - Text size: `10px` - `11px`.

## 4. Tương tác (Interactions)
- Hover vào các thành phần tương tác (Card, Node) phải có viền đổi màu nhẹ (VD: màu tím `#a996ee`) và thêm `box-shadow` mềm (`0 4px 12px rgba(44,61,90,0.05)`).
- Tránh dùng các màu sắc sặc sỡ, luôn giữ giao diện "tĩnh", gọn gàng và "Premium".
