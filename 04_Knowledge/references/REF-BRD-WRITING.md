---
id: REF-BRD-WRITING
type: reference
title: Nguyên tắc & phương pháp viết BRD (chuẩn TPBank tín dụng)
status: active
owner: PER-TTT
tags: [brd, business-analysis, requirements, user-story, template, writing, reference]
related: [SYS-TPBANK, REF-TPBANK-DELIVERY, PER-TTT]
created: 2026-08-21
updated: 2026-08-21
version: 1
source: Rút PHƯƠNG PHÁP (không lấy nghiệp vụ) từ dự án tham chiếu SCF — "ver 5 BRD SCF 1.2". Chỉ tri thức cách viết/cấu trúc/văn phong; đã lọc bỏ nội dung nghiệp vụ SCF theo data-boundary.
---

## Mục đích
Tài liệu **canonical** về *cách viết một BRD* cho sản phẩm/tính năng tín dụng mới trong hệ TPBank: concept, cấu trúc file, nguyên tắc, văn phong, bộ bảng biểu chuẩn, anti-pattern. Skill [[brd-writer]] vận hành theo tài liệu này; đọc kèm [[SYS-TPBANK]] (bản đồ hệ thống) và [[REF-TPBANK-DELIVERY]] (governance/actor/cửa phê duyệt).

> **Ranh giới dữ liệu:** đây là *phương pháp*, không phải nghiệp vụ. Không sao chép logic sản phẩm của dự án tham chiếu. Ví dụ minh hoạ dùng placeholder trung tính.

---

## 1. BRD là gì — và không là gì
**BRD (Business Requirements Document)** = bản mô tả **cái gì** nghiệp vụ cần và **tại sao**, đủ để: (a) lãnh đạo duyệt chủ trương/ngân sách, (b) IT/BA bóc tách thành spec kỹ thuật, (c) QA soạn kịch bản nghiệm thu.

| BRD LÀ | BRD KHÔNG phải |
|---|---|
| Cái gì + tại sao (business intent) | Cách làm chi tiết kỹ thuật (→ SRS/TDD) |
| Ngôn ngữ nghiệp vụ, actor-centric | Sơ đồ CSDL/API contract chi tiết |
| Yêu cầu **kiểm thử được** (có AC) | Mô tả mơ hồ "hệ thống nên nhanh" |
| Neo pháp lý/chính sách + lợi ích | Kế hoạch dự án/timeline chi tiết (→ Plan) |

---

## 2. Cấu trúc chuẩn (cây mục) — 3 trụ + phụ lục
Thứ tự phản ánh dòng lập luận **Bối cảnh → Vấn đề → Giải pháp → Ràng buộc**:

```
0. Lịch sử tài liệu (revision table) + Mục lục
1. TỔNG QUAN
   1.1 Thông tin người yêu cầu (đơn vị, người, ngày)
   1.2 Nội dung yêu cầu (tóm tắt 1 đoạn: làm gì, cho ai)
   1.3 Hiện trạng & lý do thực hiện  ← NEO PHÁP LÝ/CHÍNH SÁCH ở đây
   1.4 Đánh giá lợi ích triển khai (bảng Tiêu chí | Chi tiết hiệu quả)
2. QUY TRÌNH NGHIỆP VỤ
   2.1 Quy trình hiện tại (AS-IS)
        - Lưu đồ quy trình (sơ đồ)
        - Mô tả quy trình (bảng STT|Bước|Người|Hệ thống|Mô tả)
        - Các Pain Point hiện tại          ← BẮT BUỘC, làm bản lề sang To-be
   2.2 Quy trình mong muốn (TO-BE)
        - Từng luồng nghiệp vụ = 1 sơ đồ + mô tả
3. CHI TIẾT YÊU CẦU  (nhóm theo tính năng/module)
   3.x <Tên tính năng>
        US-01 – <Actor> <hành động>
          - Mô tả (Là… tôi muốn… để…)
          - Acceptance Criteria (AC1, AC2, … gồm ca ngoại lệ)
          - Bảng đặc tả trường / phân quyền (nếu có màn hình)
   3.n Yêu cầu phi chức năng (NFR)
PHỤ LỤC
   - Roadmap phát triển theo giai đoạn (Mục tiêu · Roadmap · Lưu ý)
   - Thuật ngữ (glossary), tài liệu tham chiếu
```

**Nguyên tắc đánh số:** module = mục cấp 2 (`3.1, 3.2…`); User Story đánh **liên tục trong module** (`US-01…US-nn`), *không* reset giữa chừng và *không* trùng số (lỗi thường gặp — xem §6).

---

## 3. Concept cốt lõi (khung tư duy khi viết)

### 3.1 As-is → Pain Point → To-be
Luôn mô tả **hiện trạng** và **điểm đau cụ thể** *trước* khi đề xuất luồng mới. Pain Point là bản lề: mỗi luồng To-be nên truy vết được về một Pain Point nó giải quyết.

### 3.2 User Story chuẩn
- **Tiêu đề:** `US-xx – <Actor> <hành động ngắn>` (Actor = vai trò *hoặc* hệ thống, vd "Engine gọi API…").
- **Thân:** *"Là **[vai trò]**, tôi muốn **[chức năng]**, để **[mục đích/giá trị]**."*
- Một US = **một mục tiêu người dùng**, đủ nhỏ để nghiệm thu độc lập.

### 3.3 Acceptance Criteria (AC) — trái tim của BRD
- Đánh số `AC1, AC2, …`; mỗi AC là **một điều kiện kiểm thử được** (đúng/sai rõ ràng).
- **Bắt buộc phủ ca ngoại lệ:** timeout, validate lỗi, vượt hạn mức/ngưỡng, retry, dữ liệu trùng, phân quyền từ chối, trạng thái không xác định.
- Nêu rõ **chuyển trạng thái**: từ trạng thái gì → trạng thái gì, ai/hệ thống nào kích hoạt.
- Viết theo Given/When/Then hoặc "Trường hợp… thì…" — miễn là **quan sát được kết quả**.

### 3.4 Maker-checker (kiểm soát 2 tay)
Nghiệp vụ tín dụng TPBank chạy qua BPM với **Tay 1 (Maker/kiểm soát 1)** và **Tay 2 (KSV/phê duyệt)**. Mọi luồng tạo/sửa/duyệt hồ sơ phải thể hiện đủ 2 cửa + trạng thái *Nháp / Chờ duyệt / Duyệt / Từ chối*. (Chi tiết actor & thẩm quyền: [[REF-TPBANK-DELIVERY]].)

### 3.5 Nêu đích danh actor hệ thống
Không viết "hệ thống xử lý" chung chung — nêu rõ hệ thống chịu trách nhiệm (vd *Engine sản phẩm*, *FCC* hạch toán, *ESignHub/CTS* ký số, *BPM* luồng duyệt, kênh *BIZ/Digital*). Bản đồ hệ thống: [[SYS-TPBANK]].

---

## 4. Bộ bảng biểu chuẩn (tái dùng)
| Bảng | Cột chuẩn | Khi dùng |
|---|---|---|
| **Lịch sử tài liệu** | Phiên bản · Ngày · Người · Nội dung thay đổi | đầu file, mọi bản |
| **Mô tả quy trình** | STT · Bước · Người thực hiện · Hệ thống thực hiện · Mô tả nghiệp vụ | mỗi luồng As-is/To-be |
| **Đặc tả trường (field)** | STT · Tên trường · Bắt buộc · Cho sửa · Mô tả nghiệp vụ | US có màn hình nhập liệu |
| **Ma trận phân quyền** | Vai trò · Quyền xem · Quyền sửa/xóa · Phạm vi dữ liệu | tính năng có RBAC |
| **Đánh giá lợi ích** | Tiêu chí · Chi tiết hiệu quả | mục 1.4 |
| **Nhóm yêu cầu / NFR** | Nhóm yêu cầu · Chi tiết · Diễn giải ý nghĩa | yêu cầu phi chức năng |

**Sơ đồ:** BRD nghiệp vụ dùng **nhiều lưu đồ** (as-is + mỗi luồng to-be). Mỗi sơ đồ cần: tiêu đề, chú thích actor/lane, và **một đoạn mô tả đi kèm** (không để sơ đồ đứng một mình).

---

## 5. Văn phong & quy ước ngôn ngữ
- **Actor-centric, câu mệnh lệnh, đánh số bước.** Chủ ngữ là actor ("ĐVKD nhập…", "Engine validate…"), không dùng bị động mơ hồ.
- **Song ngữ có kỷ luật:** giữ nguyên thuật ngữ tiếng Anh đã chuẩn hoá trong ngành (vd *Anchor, Supplier, Engine, Bulk/Single Upload, Auto-debit, Dashboard*), phần diễn giải bằng tiếng Việt. **Nhất quán một cách gọi** cho mỗi khái niệm trong toàn tài liệu.
- **Trạng thái luôn có tên riêng** và viết hoa/nháy nhất quán (vd trạng thái *"Sẵn sàng"*, *"Chờ duyệt"*).
- **Số & ngưỡng cụ thể**, không "một số / nhiều": nêu con số, đơn vị, ngưỡng, thời hạn.
- **Ngắn, một ý một câu.** AC và bước quy trình ưu tiên gạch đầu dòng/bảng hơn đoạn văn dài.
- **Viết tắt phải mở ngoặc lần đầu** rồi mới dùng tắt (vd "Virtual Account (VA)").

---

## 6. Anti-pattern (rút từ rà soát thực tế — đưa vào checklist)
| Lỗi | Hệ quả | Cách chặn |
|---|---|---|
| **US trùng số** trong 1 module (nhiều US-04/US-05) | mất truy vết, khó nghiệm thu | đánh số lại liên tục trước phát hành |
| **Lỗi gõ lặp từ** ("hóahóa", "theotheo") | thiếu chuyên nghiệp, hiểu nhầm | soát chính tả cuối |
| AC **thiếu ca ngoại lệ** | dev bỏ sót, bug production | mỗi US ≥1 AC ngoại lệ |
| Sơ đồ **không có mô tả** | mỗi người hiểu một kiểu | cặp sơ đồ + đoạn mô tả |
| Thiếu **Pain Point** | To-be không có lý do tồn tại | bắt buộc mục 2.1 Pain Point |
| Quên **maker-checker** | không khớp BPM, phải làm lại | rà mọi luồng tạo/sửa có 2 tay |
| Thuật ngữ **không nhất quán** | tranh cãi phạm vi | glossary + soát đồng nghĩa |
| Thiếu **neo pháp lý/chính sách** | khó qua cửa phê duyệt | mục 1.3 dẫn văn bản |

---

## 7. Liên kết
- Template rỗng: `03_Skills/brd-writer/BRD_TEMPLATE.md`
- Checklist rà soát: `03_Skills/brd-writer/CHECKLIST.md`
- Quy trình vận hành skill: `03_Skills/brd-writer/SKILL.md`
- Governance & actor TPBank: [[REF-TPBANK-DELIVERY]] · Hệ thống: [[SYS-TPBANK]]
