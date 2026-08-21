# Case (Scope Change) — Business yêu cầu thêm scope giữa lúc triển khai

> Neo nguyên tắc: **04 (chủ động ≠ tự ý)** · **03 (đưa phương án)** · **08 (ownership)**
> Dòng công việc: SME/Business Lending, TPBank Biz

---

## Tình huống

Đang giữa sprint triển khai một tính năng cho TPBank Biz. Business đề nghị thêm một nhánh nghiệp vụ "tiện thể làm luôn". Nghe hợp lý và Business khá sốt sắng. PO muốn chiều Business nên gật đầu, nói Dev làm thêm.

Kết quả: timeline vỡ, phần thêm chưa được Risk/QA review, và Leader không biết scope đã phình.

---

## Vấn đề cốt lõi
Chiều Business là tốt về quan hệ, nhưng **nhận thêm scope giữa chặng mà không đánh giá và không báo = tự ý.** Scope change là một trong những thứ *chắc chắn* nằm ngoài quyền tự quyết của PO (Decision Rights Level 3).

Growth ở đây KHÔNG phải "nói không với Business". Growth là **xử lý yêu cầu một cách có cấu trúc.**

---

## Chạy GROWTH

**G — Goal**
Không phải: "làm hài lòng Business ngay bây giờ."
Mà: "đáp ứng nhu cầu thật của Business theo cách không phá timeline, chất lượng và governance."

**R — Reality**
- Fact: đang giữa sprint có commitment. Thêm scope = tác động timeline + cần Risk/QA review.
- Cần làm rõ: nhu cầu Business đằng sau yêu cầu là gì? Có gấp thật không, hay "tiện thể"?

**O — Options** (đưa lại cho Business + Leader)
- A: Đưa nhánh mới vào phase 2, giữ nguyên cam kết hiện tại.
- B: Đưa vào ngay nhưng lùi timeline có kiểm soát (Business chấp nhận đánh đổi).
- C: Đánh đổi trong scope hiện tại — bỏ/hoãn một phần ít ưu tiên để nhận phần mới.
Kèm trade-off Impact/Effort/Risk/Time cho mỗi cái.

**W — Will**
- PO KHÔNG tự gật. PO ghi nhận yêu cầu, phân tích tác động, đưa options.
- Trình Leader + Business để quyết (Level 3 — scope + commitment).
- Ai quyết đổi scope → người đó (Leader/Business) own hệ quả timeline; PO own việc trình bày đủ và đúng.

**T — Track**
- Quyết định scope có được ghi lại (Decision Log) không? Timeline mới có được các bên commit không?

**H — Harvest**
- Learning: "tiện thể làm luôn" là cái bẫy scope creep phổ biến nhất. Mọi yêu cầu thêm giữa chặng → đi qua đánh giá + Decision Rights.
- Standard: quy trình xử lý change request giữa sprint (ghi nhận → đánh giá tác động → options → quyết ở đúng cấp → log).

---

## Câu hỏi thảo luận
1. PO gật đầu vì "muốn chiều Business" — điều này sai ở tư duy hay ở kỹ năng? Cả hai?
2. Viết thử câu PO nên nói với Business tại chỗ (không từ chối, cũng không tự gật).
3. Vì sao scope change gần như *luôn* là Level 3, kể cả khi phần thêm "nhỏ"?

→ Cây quyết định: [`../05_tools/decision-tree.md`](../05_tools/decision-tree.md)
