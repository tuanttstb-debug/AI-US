# User Story & Acceptance Criteria — viết để Dev không phải đoán

> Requirement mơ hồ là gốc của rework và lỗi. Story + AC tốt = Dev build đúng ngay lần đầu.

## User Story — công thức
> **Là** [vai], **tôi muốn** [hành động], **để** [giá trị].

Ví dụ (Digital Lending):
> *Là khách hàng vay số, tôi muốn xem hạn mức được duyệt ngay sau khi nộp hồ sơ, để biết mình vay được bao nhiêu mà không phải chờ gọi điện.*

Phần **"để…"** quan trọng nhất — nó là *giá trị* (nối Goal của Growth, Define của DT). Story không có "để" thường là task, không phải story.

## INVEST — story tốt có 6 tính chất
| | Nghĩa |
|---|---|
| **I**ndependent | Độc lập, giao được riêng |
| **N**egotiable | Còn thương lượng được, không phải hợp đồng cứng |
| **V**aluable | Có giá trị cho người dùng/business |
| **E**stimable | Dev ước lượng được |
| **S**mall | Đủ nhỏ để làm trong 1 iteration |
| **T**estable | Kiểm thử được (→ cần AC) |

## Acceptance Criteria — "thế nào là xong đúng"
Viết dạng **Given / When / Then** (Cho / Khi / Thì):

> **Given** khách đã nộp đủ hồ sơ hợp lệ
> **When** hệ thống hoàn tất chấm điểm
> **Then** hiển thị hạn mức được duyệt trong ≤ 5 giây

AC tốt phải:
- **Đo được** (≤5 giây, không "nhanh").
- **Phủ cả case lỗi** (hồ sơ thiếu → hiện gì? scoring timeout → hiện gì?).
- **Phản ánh ràng buộc Risk/Compliance** (vd: trường hợp không được hiển thị hạn mức → AC ghi rõ).

> AC = bước **Reality** của Growth áp vào requirement: rõ ràng, đo được, không để chỗ cho "đoán".

## Bẫy hay gặp (nối case AG-A)
- Story kiểu "PO muốn khách xem hạn mức" — thiếu vai thật, thiếu "để", không AC → Dev đoán → lỗi.
- AC kiểu "hiển thị đẹp, dễ dùng" — không đo được → QA và PO cãi nhau lúc nghiệm thu.

## Ngày mai áp dụng
Mỗi story trước khi đưa Dev: kiểm INVEST + có ≥1 AC dạng Given/When/Then đo được + có case lỗi.
Xem [Definition of Ready/Done](../tools/dor-dod.md).
