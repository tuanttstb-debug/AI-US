# Case DT-B — Khách bỏ giữa chừng luồng đăng ký khoản vay số

> Neo nguyên tắc: **02 (đi hỏi/quan sát)** · **08 (discovery chống rework)**
> Dòng công việc: Digital Lending

## Tình huống
Luồng đăng ký khoản vay số có tỉ lệ bỏ dở cao ở một bước giữa. Business đề xuất: *"Chắc do nhiều trường quá, bỏ bớt trường đi."* PO chuẩn bị cắt trường.

## Bẫy solution-first
> "Bỏ bớt trường cho nhanh."

Giả định nguyên nhân ("nhiều trường") mà chưa kiểm chứng. Cắt nhầm trường bắt buộc (Risk/KYC) → vỡ compliance; mà tỉ lệ rơi vẫn cao.

## Chạy Design Thinking

**Empathize** — quan sát/replay session người dùng thật tại đúng bước rơi. Nghe cái họ không nói: họ dừng ở đâu, lưỡng lự chỗ nào.
→ Phát hiện: không phải "nhiều trường", mà một trường yêu cầu **giấy tờ khách không có sẵn lúc đó** → họ thoát ra "để lấy giấy" rồi không quay lại.

**Define** — *"Khách rời luồng khi gặp yêu cầu giấy tờ không chuẩn bị trước, và không có đường quay lại tiếp tục."*

**Ideate:** (A) cho lưu nháp + nhắc quay lại; (B) báo trước danh sách giấy tờ ở đầu luồng; (C) cho bổ sung giấy tờ sau, duyệt điều kiện.

**Prototype** — mockup màn hình "chuẩn bị trước" + nút "lưu & tiếp tục sau".

**Test** — thử với vài khách/RM → xác nhận (B)+(A) giảm rơi, không đụng compliance.

## Kết quả
Nguyên nhân thật khác giả định ban đầu. Empathize/quan sát cứu team khỏi cắt nhầm trường và vẫn không giải quyết vấn đề.

## Câu hỏi thảo luận
1. Vì sao "bỏ bớt trường" vừa rủi ro compliance vừa có thể không giải quyết gì?
2. Dữ liệu/quan sát nào cho biết điểm rơi thật (không phải đoán)?
3. Ranh giới giữa "cắt trường để UX tốt" và "cắt trường vi phạm KYC" — ai xác nhận? (nối Decision Rights)
