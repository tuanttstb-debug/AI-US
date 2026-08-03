---
id: DEC-20260803-02
type: decision
title: Đặt động cơ luôn bật tại GAS, đọc qua endpoint sẵn có
status: active
owner: PER-TTT
tags: [ai, quy-trinh]
related: [DEC-20260803-01, TOOL-gas]
created: 2026-08-03
updated: 2026-08-03
version: 1
source: Phase 1 - Architecture
---

## Bối cảnh
Yêu cầu nhắc việc/cảnh báo chủ động, truy xuất cả khi máy tắt; nhưng Claude/Cowork chỉ chạy khi được gọi.

## Vấn đề cần quyết
Đặt phần "luôn bật" (nhắc hạn, cảnh báo) ở đâu, và AI OS đọc dữ liệu tác nghiệp bằng cách nào?

## Phương án đã cân nhắc
- Đọc: (1) endpoint GAS sẵn có; (2) export CSV local; (3) Sheets connector.
- Động cơ: lớp Claude vs lớp GAS.

## Quyết định
Động cơ luôn bật đặt tại GAS (đã có NotificationService: trigger ~8h + email digest). AI OS đọc lại qua endpoint GAS sẵn có.

## Lý do
GAS có time-trigger chạy khi máy tắt; tái sử dụng hạ tầng đã deploy, không thêm phụ thuộc. Lớp Claude lo phần trí tuệ (tổng hợp, brief), chạy on-demand.

## Đánh đổi chấp nhận
Phụ thuộc vào tính ổn định của endpoint GAS.

## Hệ quả & việc tiếp theo
Ghi cấu hình vào TOOL-gas. Quick win "nhắc hạn" chuyển thành "nâng chất" thay vì xây mới.

## Nhìn lại (điền sau)
