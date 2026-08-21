# Case D — Dev nói không thể đáp ứng deadline (dependency)

> Neo nguyên tắc: **02 (không đổ lỗi trước root cause)** · **03 (đưa phương án)**
> Dòng công việc: bất kỳ có phụ thuộc Dev/Vendor

---

## Tình huống

Tính năng cam kết go-live cuối tháng. Giữa chặng, Dev báo: "khối lượng lớn hơn dự kiến, không kịp cuối tháng." PO đứng giữa: Business đã được hứa, Dev nói không kịp.

---

## Fixed Thinking
> "Dev chậm / Dev estimate sai. Mình báo Business là do Dev thôi."

Đổ lỗi là đường cụt. Nó không cứu được deadline, không giúp lần sau tốt hơn, và làm hỏng quan hệ với Dev — người PO cần nhất.

---

## Tư duy nền: Dependency là một phần công việc của PO, không phải "việc của người khác"

Khi có dependency, member phải trả lời 6 câu:
1. **Dependency là gì?** (chính xác cái gì đang chờ cái gì)
2. **Ai là owner?** (ai thực sự có thể gỡ)
3. **Block ở đâu?** (điểm nghẽn cụ thể, không phải "Dev bận chung chung")
4. **Tôi tác động được gì?** (cắt scope? đổi thứ tự? gỡ block khác cho Dev?)
5. **Có alternative không?** (giải pháp thay thế, phân kỳ, MVP trước)
6. **Khi nào cần escalation?** (ngưỡng nào thì đẩy lên Leader)

---

## Chạy GROWTH

**G — Goal**
Không phải: "ép Dev làm kịp cuối tháng."
Mà: "đưa ra được giá trị cho khách/Business ở mức tối ưu trong ràng buộc thực tế, và mọi bên đồng thuận về kế hoạch."

**R — Reality**
- Fact: scope thực > estimate ban đầu. Root cause: estimate ban đầu thiếu phần nào? (cần đào cùng Dev, không phán xét)
- Phân biệt: "Dev không kịp full scope" ≠ "Dev không làm được gì". Phần nào kịp?

**O — Options**
- A: Cắt scope → go-live MVP đúng hạn, phần còn lại phase 2.
- B: Giữ full scope, lùi go-live có kiểm soát (báo Business sớm).
- C: Thêm nguồn lực Dev (nếu khả thi) để giữ hạn.
- D: Phân kỳ theo phân khúc khách hàng.
So sánh trên Impact / Effort / Risk / Dependency / Time.

**W — Will**
- PO làm rõ cùng Dev "phần nào kịp, phần nào không, vì sao" — có số liệu.
- PO chuẩn bị đề xuất (vd option A) + trade-off, đưa Leader/Business.
- *Decision Rights:* đổi scope hoặc lùi go-live = ảnh hưởng commitment → Level 3, xin ý kiến với thông tin đầy đủ.

**T — Track**
- Kế hoạch mới có được các bên commit không? Phase 2 có ngày rõ ràng không?

**H — Harvest**
- Learning: estimate cần buffer cho phần chưa rõ; PO nên review scope-vs-estimate ở đầu chặng, không đợi giữa chặng mới lộ.
- Standard: với feature có commitment go-live, đặt checkpoint estimate sớm.

---

## Câu hỏi thảo luận
1. PO nên hỏi Dev câu gì để đào root cause mà không biến thành buổi phán xét?
2. Trong 4 options, cái nào PO tự quyết được, cái nào phải lên Level 3?
3. "Tôi tác động được gì" — liệt kê 3 việc PO có thể làm để giúp Dev đi nhanh hơn (thay vì chỉ chờ).
