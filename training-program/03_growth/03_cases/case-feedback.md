# Case (Feedback) — QA/Business feedback tiêu cực, PO phản ứng phòng thủ

> Neo nguyên tắc: **07 (feedback là dữ liệu)** · **02 (không đổ lỗi)**
> Dòng công việc: mọi sản phẩm

---

## Tình huống

QA gửi lại một loạt lỗi ở feature PO vừa bàn giao, kèm nhận xét "requirement mô tả không rõ, nhiều chỗ Dev phải đoán". Business trong buổi demo cũng nói "cái này không giống thứ tôi mong đợi".

PO thấy bị chạm: "QA lúc nào cũng bắt bẻ", "Business lúc trước duyệt rồi giờ lại đổi ý".

---

## Fixed Thinking
> "Họ khó tính / họ không hiểu công việc của mình / họ đổi ý."

Có thể có phần đúng. Nhưng phản ứng này khoá lại toàn bộ thông tin giá trị mà feedback đang mang tới.

---

## Tư duy nền: Feedback → Signal → Learning → Action

Feedback tiêu cực, dù nói theo cách khó nghe, luôn chứa một **signal**. Việc của PO không phải đánh giá *thái độ* người feedback, mà **giải mã signal**:

- "Requirement không rõ" → signal: cách mình viết/truyền đạt requirement có gap.
- "Không giống thứ tôi mong đợi" → signal: khâu chốt kỳ vọng với Business ở đầu chưa đủ chặt.

Câu hỏi vàng thay cho phòng thủ:
> **"Feedback này đang cho mình biết điều gì về cách mình đang làm?"**

---

## Chạy GROWTH

**G — Goal**
Không phải: "chứng minh mình đúng, QA/Business sai."
Mà: "hiểu gap thật, thu hẹp nó, để lần bàn giao sau ít lỗi và đúng kỳ vọng hơn."

**R — Reality**
- Tách fact khỏi cảm xúc: bao nhiêu lỗi QA nêu là thật do requirement mơ hồ? Bao nhiêu là hiểu nhầm 2 chiều?
- "Business đổi ý" là fact hay là "kỳ vọng ban đầu chưa được chốt rõ"? Thường là vế sau.

**O — Options**
- A: Phản hồi phòng thủ, bảo vệ bản thân (đường cụt).
- B: Cảm ơn feedback, tách ra các điểm hợp lệ, sửa; phần chưa đồng ý thì trao đổi bằng evidence.
- C: B + cải tiến cách làm requirement (template, mockup, ví dụ) để chặn gap từ gốc.

**W — Will**
- Ghi nhận feedback không phòng thủ.
- Với điểm hợp lệ: đưa vào fix, làm rõ requirement.
- Với điểm chưa đồng ý: trao đổi dựa trên evidence, không dựa trên cảm xúc.

**T — Track**
- Lần bàn giao sau: số lỗi "do requirement không rõ" có giảm không? Business có bớt "không như mong đợi" không?

**H — Harvest**
- Learning: feedback khó nghe ≠ feedback sai. Tách thái độ khỏi thông tin.
- Standard: thêm bước "xác nhận kỳ vọng bằng mockup/ví dụ với Business trước khi build"; checklist "requirement đủ rõ để Dev không phải đoán".

---

## Câu hỏi thảo luận
1. Phân biệt: khi nào feedback chỉ ra gap thật của mình, khi nào là hiểu nhầm 2 chiều? Làm sao biết?
2. PO có được quyền không đồng ý với feedback không? Không đồng ý *đúng cách* trông như thế nào?
3. Một feedback tiêu cực bạn nhận gần đây — signal thật đằng sau nó là gì?
