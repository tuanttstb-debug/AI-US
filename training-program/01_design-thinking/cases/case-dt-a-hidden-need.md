# Case DT-A — "Thêm nút xuất Excel" (nhu cầu ẩn)

> Neo nguyên tắc: **01 (yêu cầu ≠ vấn đề)** · **02 (không đoán, đi hỏi)**
> Dòng công việc: BLOL

## Tình huống
Business yêu cầu: *"Thêm nút xuất báo cáo Excel ở màn hình danh sách hồ sơ phê duyệt BLOL."* Nghe rõ ràng, PO chuẩn bị viết BRD.

## Bẫy solution-first
> "Yêu cầu rõ rồi, làm luôn cho nhanh."

Nhận một *giải pháp* (nút export) và tưởng đó là *vấn đề*. Nếu build ngay: 3 tuần sau giao xong, Business dùng vài lần rồi bỏ.

## Chạy Design Thinking

**Empathize** — hỏi "chị export ra Excel để làm gì?" → hoá ra: mỗi sáng chị tải về, lọc thủ công các hồ sơ **sắp quá hạn** để đốc thúc. Việc export chỉ là *phương tiện*.

**Define** — Problem statement: *"Cán bộ phê duyệt cần biết ngay hồ sơ nào sắp trễ để xử lý trước, nhưng hiện phải export + lọc tay mỗi sáng."*
→ HMW: *"Làm thế nào để cán bộ thấy hồ sơ sắp trễ mà không phải thao tác thủ công?"*

**Ideate (3 hướng):**
- A: Nút export Excel (như yêu cầu gốc).
- B: Bộ lọc + cột đếm ngược ngay trên màn hình.
- C: Cảnh báo tự động đẩy hồ sơ sắp trễ lên đầu / gửi thông báo.

**Prototype** — vẽ tay màn hình có cột "còn X ngày" tô đỏ + bộ lọc "sắp trễ".

**Test** — cho cán bộ xem: "cái này có thay được việc export sáng của chị không?" → xác nhận C+B trúng hơn A.

## Kết quả
Giải pháp đúng (cảnh báo + lọc trên màn hình) **rẻ hơn và trúng hơn** nút export, giải quyết nhu cầu thật.

## Câu hỏi thảo luận
1. Nếu build luôn nút export, tại sao vẫn "đúng yêu cầu" mà "sai vấn đề"?
2. Một câu hỏi Empathize nào lẽ ra mở ra được nhu cầu thật sớm nhất?
3. Yêu cầu nào gần đây của team thực chất là "giải pháp giả định"?
