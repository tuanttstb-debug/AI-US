---
id: DEC-20260803-05
type: decision
title: Mẫu báo cáo tuần v2 (docx 4 mảng) + lịch thứ 6
status: active
owner: PER-TTT
tags: [bao-cao, ai]
related: [SYS-GNOL, SYS-BLOL]
created: 2026-08-03
updated: 2026-08-03
version: 1
source: Phase 5 - Sprint 2/3
---

## Bối cảnh
Mẫu báo cáo tuần cũ đã lỗi thời. Cần mẫu mới dựng từ dữ liệu hiện có.

## Vấn đề cần quyết
Bố cục, nội dung, định dạng và nhịp của báo cáo tuần gửi BLĐ.

## Phương án đã cân nhắc
- Bố cục: theo 4 mảng vs theo chiều ngang (tiến độ/rủi ro/quyết định).
- Định dạng: markdown/email vs docx.

## Quyết định
Báo cáo dạng .docx chuyên nghiệp, tổ chức theo 4 mảng (GNOL, BLOL, Đào tạo AI, Task số khác). Cấu trúc: bìa → Tổng quan điều hành "nhìn 15 giây" (bảng RAG + biểu đồ + hộp Cần BLĐ) → Chi tiết từng mảng (tổng quan, đang ở đâu + RAG, vướng mắc, next milestone) → Kế hoạch tuần tới. Đồng bộ nhận diện Dashboard. Chốt số liệu 18:00 thứ 6; nhắc cập nhật data 17:00 thứ 6.

## Lý do
Người đọc là GĐ trung tâm cần nắm nhanh trong 15 giây → cần lớp tổng quan trực quan. Bố cục 4 mảng khớp cách BLĐ hỏi. Docx cho hình ảnh/bảng biểu chuyên nghiệp. Tái dùng màu Dashboard để nhất quán.

## Đánh đổi chấp nhận
- Email nhắc trước 1 tiếng cần kết nối Gmail hoặc tái dùng động cơ email GAS (chưa làm) — tạm hiện nhắc trong Cowork.
- Báo cáo tự động cần GAS đọc được tại thời điểm chạy; đã thiết kế task báo lỗi thay vì tạo báo cáo sai.

## Hệ quả & việc tiếp theo
- Cập nhật skill weekly-report v2 + template + build_report.js.
- Bổ sung dữ liệu Đào tạo AI vào Initiative/Task (Tuân).
- Chạy thử một kỳ thật cuối tuần (Run now để duyệt quyền + kiểm tra đọc GAS).
- Cân nhắc thêm mốc nhắc 17:00 thứ 6 vào NotificationService (GAS) để email đáng tin cậy.

## Nhìn lại (điền sau)
