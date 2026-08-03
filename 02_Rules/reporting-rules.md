---
id: RULE-reporting
type: rule
title: Quy tắc dựng báo cáo
owner: PER-TTT
version: 1
updated: 2026-08-03
---

## Nhịp
Báo cáo tuần cho BLĐ là mặc định. Tháng/quý tổng hợp từ báo cáo tuần.

## Nguồn dữ liệu
Đọc qua GAS (xem 06_Tools/connectors/gas.md): Task_Master, Case_Pipeline, Issue_Tracker, Initiative_Master. Lọc theo `Tuần BC`.

## RAG (sức khỏe)
- Green: đúng tiến độ.
- Amber: có rủi ro trễ.
- Red: đã/sắp trễ nghiêm trọng — luôn liệt kê chi tiết trong báo cáo.

## Trạng thái công việc
Chưa bắt đầu · Đang thực hiện · Hoàn thành chuẩn bị · Hoàn thành · Tạm dừng · Blocked.

## Quy tắc nội dung
- "Điểm nhấn" lấy từ cờ `Highlight báo cáo`.
- "Cần BLĐ quyết" lấy từ cờ `Cần BLĐ` (Task + Case), kèm nội dung đề xuất.
- "Kế hoạch tuần tới" lấy từ trường `Kế hoạch`.
- Tách tiến độ theo dòng (Mới/Cải tiến/Vận hành) và theo Initiative.
- Tóm tắt điều hành tối đa 5 dòng.

## Lưu kết quả
Ghi ra `05_Journal/reports/` theo ID `RPT-YYYY-Wnn`.

## Chờ tinh chỉnh
Cấu trúc cuối cùng theo email mẫu BLĐ (hạng mục treo).
