---
id: RULE-data-boundary
type: rule
title: Ranh giới dữ liệu & tuân thủ
owner: PER-TTT
version: 1
updated: 2026-08-03
---

## Được phép
Chỉ **metadata quản trị công việc**: tên task/dự án, tiến độ, PIC, deadline, RAG, trạng thái, ghi chú điều hành.

## Cấm
- Không đưa **dữ liệu khách hàng / khoản vay / hồ sơ tín dụng** lên GAS, Sheets dùng cho AI OS, hay bất kỳ AI đám mây nào.
- Không lưu thông tin định danh khách hàng trong 04_Knowledge/05_Journal.

## Phạm vi người dùng
Đơn người dùng (PER-TTT). Không mở truy cập trực tiếp cho người khác ở giai đoạn này; tư vấn người khác thực hiện qua Tuân.

## Khi nghi ngờ
Nếu một yêu cầu có thể chạm dữ liệu khách hàng, dừng lại và hỏi trước khi xử lý.
