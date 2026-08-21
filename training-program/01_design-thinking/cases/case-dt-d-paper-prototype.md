# Case DT-D — Prototype giấy màn hình phê duyệt trước khi build

> Neo nguyên tắc: **05 (sai sớm, sai rẻ)** · **06 (đủ để phản ứng, không cần đẹp)**
> Dòng công việc: BPM / luồng phê duyệt

## Tình huống
Sắp xây lại màn hình phê duyệt một luồng tín dụng. PO định viết BRD chi tiết + Dev build thẳng lên UAT rồi cho cán bộ dùng thử.

## Bẫy
> "Cứ build lên UAT cho họ xem thật, prototype giấy làm gì cho mất công."

Build lên UAT = đã tốn công Dev. Nếu bố cục sai, sửa = một vòng dev nữa. Đắt.

## Chạy Design Thinking

**Prototype (rẻ):** vẽ tay / dán giấy 1 màn hình phê duyệt — các khối thông tin, nút hành động, thứ tự đọc. 20 phút.

**Test (rẻ):** ngồi cạnh 2–3 cán bộ phê duyệt, đưa tờ giấy: *"Anh/chị thử 'duyệt' một hồ sơ trên này xem."* Quan sát:
- Họ tìm thông tin gì đầu tiên? (có nằm đúng chỗ không)
- Họ lưỡng lự ở đâu?
- Thiếu thông tin nào để dám bấm duyệt?

→ Phát hiện trên giấy: thiếu block "lịch sử quan hệ tín dụng" mà cán bộ luôn cần trước khi duyệt; nút "trả lại bổ sung" bị giấu.

**Sửa ngay trên giấy** → BRD phản ánh bố cục đã validate → Dev build 1 lần trúng.

## Kết quả
Phát hiện 2 lỗi bố cục **trước khi Dev viết dòng code nào**. Tiết kiệm 1 vòng rework, cán bộ dùng mượt ngay.

## Câu hỏi thảo luận
1. Vì sao "cho xem thật trên UAT" nghe hợp lý nhưng lại đắt hơn giấy?
2. Prototype giấy cần "đủ" đến mức nào để test được?
3. Bài học này nối bước Track/Harvest của Growth ra sao? (test sớm = học sớm)
