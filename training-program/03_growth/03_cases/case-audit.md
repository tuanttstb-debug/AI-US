# Case F — Audit yêu cầu giải trình

> Neo nguyên tắc: **08 (ai quyết định → ownership)** · **07 (feedback là dữ liệu)**
> Dòng công việc: mọi sản phẩm tín dụng (Audit/Compliance)

---

## Tình huống

Audit rà một luồng xử lý và yêu cầu PO giải trình: vì sao một quyết định cấu hình/logic được thực hiện, ai phê duyệt, dựa trên cơ sở nào. PO nhớ mang máng đã trao đổi qua chat với Dev và "thấy hợp lý thì làm", nhưng không có record rõ ràng về lý do, người quyết, thời điểm.

---

## Fixed Thinking
> "Audit làm khó, việc nhỏ vậy cũng bắt giải trình." / "Lúc đó gấp quá, ai mà ghi lại."

Phòng thủ với Audit là phản xạ tệ nhất. Audit không phải kẻ thù — yêu cầu giải trình là **signal** cho thấy một lỗ hổng trong cách team lưu vết quyết định.

---

## Tư duy nền: Ownership để lại dấu vết

Nguyên tắc 08: ai quyết định thì người đó ownership. Ownership không chỉ là "chịu trách nhiệm khi có chuyện" — mà là **có khả năng giải trình quyết định của mình** bất cứ lúc nào:
- Quyết định là gì?
- Ai quyết? (trong Decision Rights nào)
- Cơ sở nào? (requirement, quy định, phân tích)
- Khi nào?

Nếu không trả lời được 4 câu này = quyết định đó chưa thực sự được own, dù kết quả có đúng đi nữa.

---

## Chạy GROWTH

**G — Goal**
Không phải: "qua được đợt audit này."
Mà: "giải trình được minh bạch, VÀ team có cơ chế lưu vết để lần sau không rơi vào thế bị động."

**R — Reality**
- Fact: quyết định đã thực hiện nhưng thiếu record về lý do/người quyết/cơ sở.
- Root cause: không có thói quen/cơ chế ghi lại decision với các thay đổi có tính rủi ro.

**O — Options**
- A: Cố gắng tái dựng bằng chứng từ chat/lịch sử (cho đợt audit hiện tại).
- B: A + thiết lập cơ chế ghi Decision Log cho các thay đổi có rủi ro (đi tiếp).
- C: B + rà soát các quyết định tương tự gần đây xem còn chỗ nào thiếu vết.

**W — Will**
- Ngay: tập hợp mọi bằng chứng hiện có, trình bày trung thực (kể cả phần thiếu — không ngụy tạo).
- Tiếp: đề xuất Decision Log chuẩn cho team.
- *Decision Rights:* nội dung giải trình chạm compliance → phối hợp Leader/Compliance, Level 3.

**T — Track**
- Audit chấp nhận giải trình chưa? Có action item nào cần đóng?
- Decision Log mới có được áp dụng không?

**H — Harvest**
- Learning: "gấp" không phải lý do bỏ lưu vết — càng gấp + càng rủi ro càng phải ghi.
- Standard: Decision Log (ai/quyết gì/cơ sở/khi nào) cho mọi thay đổi có yếu tố risk/compliance. Đây là output đưa vào GROWTH LOG và quy trình team.

---

## Câu hỏi thảo luận
1. Vì sao "phần thiếu phải nói thật với Audit, không ngụy tạo" là điều không thương lượng?
2. Ghi vết ở mức nào là đủ, ở mức nào là quá tải giấy tờ? Ranh giới với các thay đổi rủi ro cao?
3. Feedback từ Audit chỉ ra gap gì trong hành vi hàng ngày của team? (nguyên tắc 07)
