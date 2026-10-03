---
name: Repo Knowledge Graph Analyzer
description: Phân tích một GitHub Repository từ Repository Metadata và README, trích xuất kiến thức có cấu trúc phục vụ Knowledge Graph / Neo4j, bao gồm repository understanding, concepts, technologies, features, use cases, architecture, dependencies, limitations và phần giải thích dành cho con người.
---

# Repo Knowledge Graph Analyzer Skill 🧠

Skill này hướng dẫn cách phân tích chuyên sâu một **GitHub Repository** từ hai nguồn dữ liệu đầu vào:
1. **Repository Metadata** — dữ liệu gốc lấy từ GitHub.
2. **README** — nội dung mô tả và tài liệu chính của repository.

Mục tiêu là xây dựng một **mô hình hiểu biết có cấu trúc** về repository để dữ liệu có thể được đưa trực tiếp vào **Knowledge Graph / Neo4j**.

---

# 🎯 1. Mục tiêu

Phân tích repository để xác định:
* Repository này là gì? Giải quyết vấn đề gì? Hoạt động như thế nào?
* Có những thành phần và workflow nào?
* Sử dụng công nghệ, framework, thư viện, database, API hoặc protocol nào?
* Có những concepts kỹ thuật nào có giá trị đối với Knowledge Graph?
* Có những features nào? Được sử dụng trong những trường hợp (use cases) nào?
* Hướng tới đối tượng người dùng nào?
* Phụ thuộc vào những thành phần bên ngoài nào (dependencies / integrations)?
* Có những limitations hoặc uncertainties nào?

Kết quả cuối cùng cung cấp **dữ liệu có cấu trúc (JSON)** để sẵn sàng tạo các nút (Nodes) và quan hệ (Relationships) trên Neo4j:
```text
Repository
    ├── HAS_CONCEPT ────────> Concept
    ├── USES_TECHNOLOGY ────> Technology
    ├── HAS_FEATURE ────────> Feature
    ├── USED_FOR ───────────> Use Case
    ├── TARGETS ────────────> User
    ├── DEPENDS_ON ─────────> Dependency
    └── INTEGRATES_WITH ───> Integration
```

---

# 🧩 2. Kiến trúc dữ liệu Pipeline

Skill này phân biệt rõ giữa **Repository Metadata** (Fact gốc từ GitHub) và **AI Knowledge** (Tri thức do AI bóc tách từ README).

```text
GitHub ──> Repository Metadata ──> AI Input & Neo4j Repo Node
README ──────────────────────────> AI Analysis ──> AI Knowledge JSON ──> Neo4j Graph
```

### Vai trò của Metadata:
- Metadata (`name`, `url`, `stars_total`, `license`, `language`, `topics`,...) là dữ liệu nguồn gốc từ GitHub.
- **AI không được tự ý chỉnh sửa, thay đổi hoặc tự bịa thêm giá trị metadata.**

---

# 📜 3. Các quy tắc phân tích bắt buộc

- **Rule 1 — Không bịa đặt thông tin:** Chỉ khẳng định những thông tin có căn cứ từ dữ liệu được cung cấp. Nếu không xác định được, trả về `null` hoặc `[]`.
- **Rule 2 — Metadata là dữ liệu nguồn:** Không biến suy luận thành metadata và không tự ý sửa đổi/bổ sung giá trị gốc từ GitHub.
- **Rule 3 — Phân biệt Fact và Inference:** Thông tin README ghi rõ là Fact. Nếu cần suy luận từ dữ liệu, phải thể hiện rõ đó là suy luận và không được trình bày như Fact. Nếu suy luận không đủ chắc chắn, đưa vào `uncertainties`.
- **Rule 4 — Bảo toàn chi tiết quan trọng:** Không ép toàn bộ repository thành câu tóm tắt quá ngắn làm mất chi tiết kỹ thuật. `summary` có thể ngắn gọn, nhưng `detailed_explanation`, `architecture`, `features`, `concepts` phải đầy đủ.
- **Rule 5 — Không giới hạn số lượng phần tử trong Array:** 
  - Các mảng `concepts`, `features`, `technologies`, `use_cases`,... KHÔNG BỊ GIỚI HẠN số lượng phần tử. 
  - README có bao nhiêu item đáng giá thì lấy bấy nhiêu (1, 5, 10 hay 20+), không tự cắt giảm vô lý và không tự bịa thêm.
  - *(Lưu ý: Các phần tử trong ví dụ JSON ở dưới chỉ nhằm minh họa cấu trúc và không đại diện cho số lượng phần tử thực tế cần trả về).*
- **Rule 6 — Không ép README vào Schema:** Không phải repository nào cũng có đầy đủ Architecture, Dependencies, Integrations, Use Cases hoặc Limitations. Nếu dữ liệu không đủ căn cứ, trả về `[]` hoặc `null`; tuyệt đối không tự tạo dữ liệu giả để lấp đầy schema.
- **Rule 7 — Phân biệt rõ rệt các nhóm dữ liệu:**
  - **Concepts:** Ý tưởng, mô hình, kiến trúc, kỹ thuật, lĩnh vực (`AI Agent`, `RAG`, `Vector Database`, `Tool Calling`, `Authentication`, `Knowledge Graph`). **Chỉ tạo một concept nếu nó có giá trị độc lập đối với việc hiểu repository hoặc xây dựng Knowledge Graph.** (Ví dụ: câu *"This Python project runs on Linux"* thì không nhất thiết tạo `Linux` thành concept, trừ khi repo thực sự là *"Linux Kernel Monitoring Tool"*).
  - **Technologies:** Ngôn ngữ, framework, thư viện, database, API hoặc công cụ cụ thể (`Python`, `FastAPI`, `Neo4j`, `Docker`, `React`, `Redis`).
  - **Features:** Các khả năng chức năng mà repository cung cấp (`Web scraping`, `Vector search`, `Document ingestion`). *(Ví dụ: `Python` là technology, không phải feature!)*.
  - **Dependencies:** Các thành phần bên ngoài mà repository cần hoặc phụ thuộc để hoạt động, nếu README cung cấp căn cứ.
  - **Integrations:** Các hệ thống, dịch vụ, API hoặc nền tảng mà repository được thiết kế để kết nối/giao tiếp. *(Một thành phần có thể thuộc một hoặc cả hai nhóm Dependencies/Integrations tùy theo vai trò thực tế được mô tả trong README).*
- **Rule 8 — Bỏ qua trang trí & Popularity:** Badges, icons, số `stars`/`forks` là metadata đo độ phổ biến, KHÔNG được dùng làm khái niệm kỹ thuật hay feature.
- **Rule 9 — Không tự tạo quan hệ giữa các Repo:** Chỉ phân tích độc lập repo hiện tại. Việc liên kết giữa các Repo khác nhau sẽ được thực hiện ở một bước xử lý riêng sau này.

---

# 📤 4. Output Format

Kết quả trả về **duy nhất 1 JSON Object hợp lệ** (không kèm Markdown hay text giải thích bên ngoài JSON).

```json
{
  "repository_understanding": {
    "project_type": "CLI tool / Framework / Web application / AI Agent / ...",
    "summary": "Tóm tắt ngắn gọn repository",
    "purpose": "Bài toán giải quyết và mục đích chính",
    "detailed_explanation": "Giải thích chi tiết repository, mục đích, cách hoạt động, các thành phần và những thông tin quan trọng khác"
  },
  "concepts": ["Concept 1", "Concept 2"],
  "features": ["Feature 1", "Feature 2"],
  "technologies": ["Tech 1", "Tech 2"],
  "use_cases": ["Use Case 1", "Use Case 2"],
  "target_users": ["Target User 1"],
  "dependencies": ["Dependency 1"],
  "integrations": ["Integration 1"],
  "architecture": {
    "components": ["Component 1", "Component 2"],
    "workflow": "Mô tả chi tiết luồng dữ liệu/vận hành"
  },
  "limitations": ["Limitation 1"],
  "uncertainties": ["Uncertainty 1"],
  "human_explanation": "Giải thích tự nhiên, đầy đủ cho lập trình viên đọc hiểu nhanh mà không cần đọc README"
}
```

---

# 🎯 5. Nguyên tắc Ưu tiên

1. Ưu tiên **Đầy đủ nhưng có căn cứ** hơn là **Ngắn gọn quá mức**.
2. Ưu tiên **`[]` hoặc `null`** hơn là **Suy đoán để lấp đầy Schema**.
3. Ưu tiên **Giữ lại thông tin quan trọng** hơn là **Loại bỏ vì danh sách đã dài**.
