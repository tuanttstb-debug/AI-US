---
id: DEC-20260803-03
type: decision
title: Data model map lên 9 sheet operational, thêm miền Journal, taxonomy 2 chiều
status: active
owner: PER-TTT
tags: [quy-trinh]
related: [DEC-20260803-01]
created: 2026-08-03
updated: 2026-08-03
version: 1
source: Phase 2 - Data Model
---

## Bối cảnh
Lớp operational thực tế gồm 9 sheet (Task, Initiative/Milestone, Case, Issue, Dev, KPI, Notification, User, Audit), không phải một bảng.

## Vấn đề cần quyết
AI OS định nghĩa lại entity hay map lên hiện có? Phân loại 3 dòng công việc thế nào để hết mơ hồ nhập liệu?

## Phương án đã cân nhắc
- Taxonomy: dùng lại field `Phân loại` (trộn 3 trục) vs tách 2 chiều vuông góc.

## Quyết định
AI OS map lên 9 sheet, không định nghĩa lại. Thêm miền Journal (append-only) và Knowledge (file). Taxonomy tách 2 chiều: độ lớn (Initiative vs Task, đã có) + Dòng công việc (thêm 1 cột `Dòng` trên Task_Master: Mới/Cải tiến/Vận hành/Sự vụ).

## Lý do
Gốc rễ nhập liệu mơ hồ là do một field trộn 3 khái niệm. Tách trục vuông góc giải quyết dứt điểm, chi phí thêm rất nhỏ; các sheet khác đã tự phân dòng theo bản chất.

## Đánh đổi chấp nhận
Cần remap giá trị cũ (BAU→Vận hành, Case→Sự vụ) khi làm sạch dữ liệu.

## Hệ quả & việc tiếp theo
Định nghĩa naming/tag ở 02_Rules; báo cáo tổng hợp chéo sheet.

## Nhìn lại (điền sau)
