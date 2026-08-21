# GROWTH Framework — 6 bước xử lý mọi vấn đề

> Đây là công cụ trung tâm. Học thuộc 6 chữ. Áp dụng cho mọi task, mọi issue, mọi cuộc họp khó.

```
G — Goal      → Outcome thật sự cần đạt là gì?
R — Reality   → Fact đang xảy ra là gì?
O — Options   → Có những phương án nào?
W — Will      → Tôi sẽ làm gì tiếp theo?
T — Track     → Kết quả thế nào?
H — Harvest   → Tôi học được gì?
```

---

## G — GOAL: Outcome, không phải task

**Câu hỏi:** "Outcome thực sự cần đạt là gì?" — không phải "Task nào cần xong?"

Sự khác biệt quyết định chất lượng công việc:

| Task-level (yếu) | Outcome-level (Growth) |
|---|---|
| "Fix lỗi X trên BLOL" | "Đảm bảo quy trình phê duyệt BLOL vận hành ổn định, lỗi X không lặp lại" |
| "Viết BRD cho SCF" | "Giúp Dev hiểu đúng để build đúng ngay lần đầu, giảm rework" |
| "Họp với Business" | "Chốt được scope MVP rõ ràng, có người owner từng hạng mục" |

**Vì sao quan trọng:** nếu Goal là "fix lỗi X", bạn sẽ hài lòng với workaround. Nếu Goal là "lỗi không lặp lại", bạn sẽ đi tìm root cause.

**Ngày mai áp dụng:** mỗi task, viết 1 câu Goal bắt đầu bằng "Đảm bảo…/Giúp…/Chốt được…", không bắt đầu bằng "Làm…/Fix…".

---

## R — REALITY: Nhìn thẳng fact

**Câu hỏi:** "Điều gì thực sự đang cản trở outcome?"

Phân biệt 5 loại thông tin — trộn lẫn chúng là nguồn gốc của mọi quyết định sai:

| Loại | Ví dụ (task Digital Lending) |
|---|---|
| **Fact** | "API scoring trả timeout > 5s trong 30% request từ 10/8" |
| **Assumption** | "Chắc do bên Core quá tải" (chưa kiểm chứng) |
| **Emotion** | "Bực vì bên Core lúc nào cũng chậm" |
| **Root cause** | Nguyên nhân gốc — phải đào ra, không đoán |
| **Constraint** | "Không được đổi contract API trước go-live" |

**Kỹ thuật:** với mỗi câu bạn định nói trong cuộc họp, tự hỏi "đây là fact hay assumption?". Nếu là assumption → nói rõ "mình đang giả định…, cần verify".

**Ngày mai áp dụng:** khi báo issue, tách rõ 2 dòng: "Fact:" và "Mình đang giả định:".

---

## O — OPTIONS: Không dừng ở "không làm được"

**Câu hỏi:** "Có những lựa chọn nào?" — tối thiểu 3.

Chuyển hoá bắt buộc:

> "Không làm được kịp deadline" ❌
> → "Có 3 hướng: (A) cắt scope phần Y, giữ deadline; (B) giữ full scope, lùi 2 ngày; (C) giao phần Z cho member khác. Đây là trade-off của mỗi cái…" ✅

So sánh mỗi option trên 5 trục:

| Option | Impact | Effort | Risk | Dependency | Time |
|---|---|---|---|---|---|
| A | | | | | |
| B | | | | | |
| C | | | | | |

**Quan trọng:** đưa options KHÔNG có nghĩa đẩy quyết định cho Leader. Bạn vẫn **đề xuất** phương án nào và **vì sao**. Options + đề xuất = tư duy PO trưởng thành.

**Ngày mai áp dụng:** cấm bản thân kết thúc 1 vấn đề bằng câu "không được". Luôn thêm "…nhưng có các hướng sau".

---

## W — WILL: Cam kết hành động

**Câu hỏi:** "Tôi chủ động làm gì ngay bây giờ?"

Growth không dừng ở phân tích đẹp. Mỗi option được chọn phải thành:

- **Action** — việc cụ thể
- **Owner** — ai làm (kể cả khi owner là người khác, bạn là người theo)
- **Deadline** — khi nào
- **Expected outcome** — làm xong thì đạt cái gì

**Lưu ý governance:** "Will" phải nằm trong Decision Rights của bạn. Nếu action chạm tới đổi scope / đổi logic quan trọng / production impact / customer impact / risk / commitment → bước Will là "chuẩn bị đủ thông tin và xin ý kiến", không phải "tự triển khai". Xem [`../05_tools/decision-tree.md`](../05_tools/decision-tree.md).

**Ngày mai áp dụng:** mọi cuộc họp kết thúc bằng ít nhất 1 dòng "Ai — làm gì — trước khi nào".

---

## T — TRACK: Đo kết quả thật

**Câu hỏi:** "Outcome đạt chưa?" — không phải "Đã làm xong chưa?"

"Làm xong" và "đạt outcome" là hai chuyện khác nhau. Sau khi làm, kiểm tra:
- Outcome ban đầu (bước G) đạt chưa?
- Có phát sinh issue mới không?
- Có rework không?
- Có dependency mới xuất hiện không?
- Số liệu có xác nhận không? (vd: lỗi X còn xuất hiện trong log không?)

**Ngày mai áp dụng:** với issue production, đừng đóng ngay sau khi deploy fix. Theo dõi log/metric 1 khoảng rồi mới xác nhận "outcome đạt".

---

## H — HARVEST: Rút learning (bước bắt buộc)

**Câu hỏi:** "Tôi học được gì? Cần chuẩn hóa gì cho team?"

Đây là bước phân biệt người làm 5 năm *có 5 năm kinh nghiệm* với người làm 5 năm *lặp lại 1 năm 5 lần*.

Sau mỗi task quan trọng, trả lời:
- What worked?
- What didn't?
- Why? (root cause của cả cái tốt lẫn cái dở)
- What will I do differently next time?
- Có gì cần standardize cho team? (checklist, template, rule)

**Ngày mai áp dụng:** ghi vào GROWTH LOG. Nếu learning có thể thành 1 dòng checklist cho cả team → đề xuất ngay. Xem [`../05_tools/growth-log.md`](../05_tools/growth-log.md).

---

## Tóm tắt 1 màn hình

```
Gặp vấn đề
   │
   ▼
G  Outcome thật là gì?            (không phải "task nào xong")
R  Fact là gì? (tách khỏi assumption/cảm xúc)
O  3 options + đề xuất của tôi
W  Action / Owner / Deadline      (trong Decision Rights)
T  Outcome đạt chưa? (đo, không cảm tính)
H  Learning + standard cho team
```

Card bỏ túi: [`../05_tools/growth-card.md`](../05_tools/growth-card.md)
