# Case B — Task trễ 3 ngày nhưng chỉ báo khi sát deadline

> Neo nguyên tắc: **05 (escalate sớm)** · **03 (luôn đưa phương án)**
> Dòng công việc: SCF / bất kỳ

---

## Tình huống

Member được giao chuẩn bị tài liệu phân tích cho một tính năng SCF, deadline thứ Sáu. Từ thứ Ba member đã thấy vướng: cần dữ liệu từ Business mà chưa ai phản hồi, và một phần logic cần Risk xác nhận. Member nghĩ "chắc mai có", tiếp tục chờ. Đến chiều thứ Năm vẫn chưa có gì, member mới báo Leader "em e là không kịp thứ Sáu".

Giờ Leader chỉ còn 1 ngày để xoay — quá muộn để tác động Business/Risk kịp.

---

## Fixed Thinking
> "Tại Business không gửi dữ liệu, Risk chưa xác nhận. Em bị block, không phải lỗi em."

Đúng về fact (member bị block thật). Nhưng bỏ qua phần member kiểm soát được: **thời điểm báo.**

---

## Chạy GROWTH

**G — Goal**
Không phải: "nộp tài liệu thứ Sáu."
Mà: "tài liệu đủ chất lượng đúng hạn, HOẶC nếu không kịp thì mọi bên biết đủ sớm để cùng xử lý."

**R — Reality**
- Fact: từ thứ Ba đã xác định 2 điểm block (dữ liệu Business, xác nhận Risk).
- Fact: member chờ thụ động 3 ngày, không escalate, không có kế hoạch B.
- Root cause thật: không phải "Business chậm" — mà **không có cơ chế báo sớm khi thấy tín hiệu block.**

**O — Options (đáng lẽ nghĩ từ thứ Ba)**
- A: Báo Leader ngay thứ Ba: "em thấy 2 điểm block, có nguy cơ trễ, cần hỗ trợ đẩy Business/Risk."
- B: Chủ động ping Business/Risk trực tiếp + đặt deadline phản hồi.
- C: Làm trước phần không phụ thuộc dữ liệu, để phần chờ nhỏ lại.
- Tốt nhất: A + B + C song song.

**W — Will**
- Escalate ngay khi xác định risk, kèm đề xuất (không chỉ báo "em lo không kịp").
- Nêu rõ: cần gì, từ ai, trước khi nào.

**T — Track**
- Sau escalate: block được gỡ chưa? Deadline giữ được không hay cần lùi có kiểm soát?

**H — Harvest**
- Learning: "block không tự biến mất khi mình chờ. Tín hiệu risk xuất hiện → báo trong 24h."
- Standard: mọi task có dependency, member set 1 checkpoint giữa chặng, không đợi đến sát deadline.

---

## Điểm mấu chốt để nhấn trong workshop
Báo sớm **không phải** thú nhận yếu kém. Báo sớm = cho team thời gian để còn xoay. Người báo muộn mới là người tạo rủi ro, dù lý do "bị block" nghe rất chính đáng.

---

## Câu hỏi thảo luận
1. Thứ Ba member nên nói chính xác câu gì với Leader? (tập viết câu escalate có kèm đề xuất)
2. Ranh giới giữa "báo sớm hợp lý" và "cái gì cũng báo, làm phiền Leader" ở đâu?
3. Cơ chế nào giúp member không quên set checkpoint? (gợi ý: đưa vào định nghĩa "task có dependency")
