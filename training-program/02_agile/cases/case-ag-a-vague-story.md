# Case AG-A — Story mơ hồ → Dev đoán → lỗi

> Neo: **User Story & AC** · nối Growth (Reality), DT (Define)
> Dòng công việc: Digital Lending

## Tình huống
PO đưa Dev một dòng backlog: *"PO muốn khách xem được hạn mức."* Dev tự hiểu, build. Nghiệm thu: khách thấy hạn mức nhưng cả trong trường hợp Risk quy định **không được hiển thị**; thời gian tải 12 giây; hồ sơ thiếu thì màn hình trắng. QA trả về, PO và Dev cãi nhau "đúng ý hay chưa".

## Vấn đề cốt lõi
Story thiếu **vai thật, giá trị ("để…"), và Acceptance Criteria**. Dev không sai — Dev *đoán*, vì không có gì để bám.

## Viết lại đúng chuẩn

**User Story:**
> Là **khách hàng vay số**, tôi muốn **xem hạn mức được duyệt ngay sau khi nộp hồ sơ**, để **biết vay được bao nhiêu mà không phải chờ gọi điện**.

**Acceptance Criteria (Given/When/Then, đo được + case lỗi + ràng buộc Risk):**
- Given hồ sơ hợp lệ & đủ điều kiện hiển thị / When scoring xong / Then hiện hạn mức trong ≤5 giây.
- Given hồ sơ thuộc nhóm **Risk không cho hiển thị hạn mức** / Then hiện thông báo thay thế (không lộ số).
- Given hồ sơ thiếu thông tin / Then hiện rõ cần bổ sung gì, không để màn trắng.
- Given scoring timeout / Then hiện trạng thái "đang xử lý", không treo.

## Kết quả
Dev build 1 lần trúng; QA có tiêu chí nghiệm thu rõ; ràng buộc Risk được đưa vào **từ đầu**, không phát hiện muộn.

## Câu hỏi thảo luận
1. Trong story gốc thiếu chính xác những gì? (vai / giá trị / AC / case lỗi / ràng buộc)
2. Vì sao đây vừa là bài học Agile (AC) vừa là bài học Growth (Reality: rõ ràng, đo được)?
3. Ai lẽ ra phải đưa ràng buộc Risk vào AC, ở bước nào?
