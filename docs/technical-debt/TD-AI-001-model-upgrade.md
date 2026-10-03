# Technical Debt Record: TD-AI-001

## Metadata

* **ID**: `TD-AI-001`
* **Title**: Upgrade AI Analysis Model
* **Status**: `deferred`
* **Priority**: `medium`
* **Area**: `AI Analysis`
* **Reason**: Hiện tại chưa có ngân sách cho paid AI API.
* **Current Approach**: Sử dụng free model / local model để phát triển và kiểm thử pipeline.
* **Future Goal**: Benchmark và tích hợp model phù hợp hơn khi dự án đủ điều kiện.

---

## Context

Hệ thống phân tích GitHub Repository hiện tại có luồng hoạt động như sau:

```text
GitHub Trending
      ↓
Repository Metadata + README
      ↓
AI Analysis
      ↓
Structured Knowledge JSON
      ↓
Schema Validation
      ↓
Neo4j
```

AI hiện tại phân tích **Repository Metadata** và **README** để tạo ra các trường thông tin có cấu trúc:
* `repository understanding`
* `concepts`
* `technologies`
* `features`
* `use cases`
* `target users`
* `dependencies`
* `integrations`
* `architecture`
* `limitations`
* `uncertainties`
* `human explanation`

Kết quả cuối cùng được đưa vào Knowledge Graph (Neo4j).

---

## Current Decision

Hiện tại **KHÔNG** bắt buộc sử dụng paid AI API.

Quy trình ưu tiên hiện tại:
```text
Free Model / Local Model
        ↓
AI Analysis
        ↓
Knowledge JSON
        ↓
Validation
        ↓
Neo4j
```

Việc nâng cấp AI Model được trì hoãn có chủ đích (`deferred`) để tối ưu chi phí trong giai đoạn phát triển ban đầu.

---

## Activation Conditions

Technical Debt này CHỈ được xem xét kích hoạt (`deferred` → `ready` → `in_progress`) khi đáp ứng đầy đủ các điều kiện sau:

1. Dự án có ngân sách dành riêng cho AI API hoặc máy chủ có local model phù hợp.
2. AI Analysis pipeline hiện tại đã vận hành ổn định trên hệ thống free/local model.
3. Đã xây dựng được bộ dữ liệu benchmark (`benchmark dataset`).
4. Skill `Repo Knowledge Graph Analyzer` đã đạt trạng thái tương đối ổn định.
5. Có bộ tiêu chí đánh giá chất lượng output rõ ràng.
6. Có khả năng thay đổi model mà không phá vỡ Knowledge JSON schema và Neo4j schema hiện tại.

> [!CAUTION]
> **Không được tự động chuyển sang paid model** chỉ vì một model mới xuất hiện hoặc vì model hiện tại có vẻ chưa tạo ra kết quả hoàn hảo.

---

## Required Work khi Technical Debt được kích hoạt

Khi `TD-AI-001` được người dùng kích hoạt triển khai, AI Agent phải thực hiện đầy đủ theo đúng thứ tự 16 bước sau:

```text
1. Xác định model candidates
        ↓
2. Benchmark model hiện tại và candidates
        ↓
3. Đánh giá factual accuracy
        ↓
4. Đánh giá hallucination
        ↓
5. Đánh giá missing information
        ↓
6. Đánh giá concepts / technologies / features
        ↓
7. Đánh giá architecture
        ↓
8. Đánh giá dependencies / integrations
        ↓
9. Đánh giá JSON validity
        ↓
10. Chọn model dựa trên benchmark
        ↓
11. Tích hợp thông qua AI abstraction layer
        ↓
12. Re-run benchmark
        ↓
13. Kiểm tra regression
        ↓
14. Kiểm tra Neo4j ingestion
        ↓
15. Cập nhật documentation
        ↓
16. Chuyển status thành resolved
```

> [!IMPORTANT]
> Tuyệt đối **không được chỉ thay tên model trong configuration** và coi là đã hoàn thành Technical Debt này.

---

## AI Provider Abstraction (Future Architecture Only)

> [!NOTE]
> **Lưu ý quan trọng**: Sơ đồ dưới đây mô tả kiến trúc mục tiêu trong tương lai (Future Architecture). Kiến trúc này **chưa được triển khai trong mã nguồn hiện tại** và chỉ cần thực hiện khi `TD-AI-001` được kích hoạt.

AI Provider không nên bị hard-code trực tiếp vào business logic của dự án. Kiến trúc mục tiêu sẽ là:

```text
AIAnalyzer
    │
    ├── LocalModelAnalyzer
    ├── GeminiAnalyzer
    ├── OpenAIAnalyzer
    ├── AnthropicAnalyzer
    └── OtherAnalyzer
          │
          ▼
    Knowledge JSON
          │
          ▼
    Schema Validator
          │
          ▼
        Neo4j
```

*(Tên class/module thực tế có thể linh hoạt tùy theo thiết kế codebase tại thời điểm triển khai).*

---

## Constraints (Bắt buộc tuân thủ)

* Agent **không được tự ý tạo API key**.
* Agent **không được tự ý làm phát sinh chi phí**.
* Agent **không được tự động chuyển** từ free/local model sang paid model.
* **Không commit API key hoặc secret** vào repository.
* **Không thay đổi provider** chỉ vì một model mới xuất hiện trên thị trường.
* **Không thay đổi Knowledge Graph schema** chỉ vì model mới trả ra định dạng output khác.
* **Mọi thay đổi** có khả năng phát sinh chi phí bắt buộc phải hỏi và nhận được sự xác nhận đồng ý của người dùng trước khi thực hiện.

---

## Technical Debt Status Definitions

Hệ thống quản lý Technical Debt sử dụng các trạng thái sau:

* `proposed`: Mới được đề xuất.
* `deferred`: Cố ý trì hoãn (Trạng thái hiện tại của TD-AI-001).
* `ready`: Đã đủ điều kiện để xem xét triển khai.
* `in_progress`: Đang trong quá trình triển khai.
* `resolved`: Đã hoàn thành triển khai và được kiểm chứng thành công.
* `wont_do`: Đã quyết định hủy bỏ không thực hiện.

> [!IMPORTANT]
> `TD-AI-001` phải luôn giữ nguyên `Status: deferred` cho đến khi người dùng chủ động kích hoạt.

---

## Success Criteria

Technical Debt `TD-AI-001` chỉ được chuyển trạng thái thành `resolved` khi:

1. Có model/provider được lựa chọn dựa trên kết quả benchmark thực tế.
2. Model đáp ứng chính xác Knowledge Graph schema.
3. Output phân tích vượt qua tất cả các bước Schema Validation.
4. AI Provider có lớp Abstraction phù hợp.
5. Có thể thay đổi/nâng cấp model mà không phải sửa đổi business logic của Knowledge Graph.
6. Luồng Neo4j ingestion vận hành bình thường không phát sinh lỗi.
7. Đã hoàn thành regression test.
8. Không có secret/API key nào bị lọt vào repository.
9. Chi phí sử dụng có thể kiểm soát và cấu hình dễ dàng.
10. Tài liệu dự án liên quan đã được cập nhật hoàn chỉnh.
