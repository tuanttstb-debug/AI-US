# Learning Program — Design Thinking · Agile · Growth
### Team Số hóa Tín dụng

> **Design Thinking chọn đúng việc → Agile giao đúng cách → Growth khiến mỗi vòng lặp giỏi hơn vòng trước.**
> Ba trụ không rời rạc — chúng là một vòng: *khám phá → giao → học → khám phá lại.*

---

## Ba trụ trả lời ba câu hỏi

| Trụ | Câu hỏi | Giai đoạn | Thư mục |
|---|---|---|---|
| **Design Thinking** | Làm **đúng vấn đề / đúng giải pháp** không? | Khám phá (trước build) | [`01_design-thinking/`](01_design-thinking/) |
| **Agile** | Giao **đúng cách**, thích ứng liên tục không? | Triển khai (trong build) | [`02_agile/`](02_agile/) |
| **Growth** | Chúng ta **học & trưởng thành** qua mỗi vòng không? | Xuyên suốt (mindset nền) | [`03_growth/`](03_growth/) |

```
        ┌─ DESIGN THINKING ─┐     ┌──── AGILE ────┐
        │  Đúng vấn đề       │ ─▶ │  Đúng cách giao │ ─▶ (khách hàng)
        │  Đúng giải pháp    │     │  Thích ứng      │
        └────────────────────┘     └─────────────────┘
        ╚═══════════════ GROWTH (mindset nền) ═══════════════╝
          Học từ mỗi test, mỗi sprint, mỗi lỗi → vòng sau tốt hơn
```

Growth vừa là **module riêng** (`03_growth`), vừa là **chất kết dính**: retro của Agile = bước **Harvest** của Growth; "requirement chưa rõ" được giải bằng **Design Thinking**; "options/scope" khớp **prioritization** của Agile.

---

## Learning journey

| Module | Tên | Thời lượng | Trạng thái |
|---|---|---|---|
| **M0** | Khởi động: 3 trụ & bài toán thật của team | 30' | khung |
| **M1** | Design Thinking — khám phá đúng vấn đề | 2.5h | ✅ đầy đủ (framework·cases·workshop·tools·slide) |
| **M2** | Agile — giao đúng cách trong ràng buộc ngân hàng | 2.5h | ✅ đầy đủ (framework·cases·workshop·tools·slide) |
| **M3** | Growth — Operating Mindset | 2–2.5h | ✅ **đã có** (`03_growth`) |
| **M4** | Capstone tích hợp — 1 sáng kiến xuyên 3 trụ | 2h | ✅ đầy đủ (capstone·playbook·sơ đồ·slide) |

Chi tiết khung: [`00_program/CURRICULUM.md`](00_program/CURRICULUM.md)

---

## Cấu trúc thư mục

```text
training-program/
├── README.md                 ← bản đồ chương trình (bạn đang ở đây)
├── 00_program/               kiến trúc · learning journey · master facilitator guide
│   └── CURRICULUM.md          ← KHUNG CHI TIẾT để duyệt
├── 01_design-thinking/       M1 — framework · cases · workshop · tools
├── 02_agile/                 M2 — framework · cases · workshop · tools
├── 03_growth/                M3 — bộ growth-training (đã có)
├── 04_integration/           M4 — capstone · playbook · sơ đồ hợp nhất
├── 05_slides/                PPTX chuẩn TPBank (skill tpbank-deck) cho từng module
└── 06_followup/              30/60/90-day · coaching xuyên 3 trụ
```

---

## Nguyên tắc thiết kế (kế thừa từ bộ Growth)
- Tiếng Việt, ngắn, trực diện — giọng Leader nói với team.
- **80% nội dung neo trực tiếp** vào công việc PO/BA (GNOL, BLOL, SCF, Digital Lending, BPM/Core, AI).
- 30% lý thuyết – 70% thực hành.
- Slide dựng bằng skill **`tpbank-deck`** (chuẩn nhận diện TPBank).
- Mỗi concept trả lời được: *"Ngày mai member áp dụng vào việc thế nào?"*

> **Trạng thái hiện tại:** khung để duyệt. Sau khi duyệt → triển khai chi tiết M1, M2, M4 + slide TPBank + cases + tools.
