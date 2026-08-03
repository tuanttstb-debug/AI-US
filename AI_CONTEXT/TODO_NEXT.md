# TODO NEXT — AI OS

Ưu tiên trên xuống. Owner: [CC]=Claude Code · [CW]=Cowork · [TT]=Tuân.

## Cao
1. [CC] Wiring đọc GAS live cho weekly-report: POST endpoint (action read / initiative-read / case / issue), parse 2D array, map 4 mảng. Tiêu chí: kéo được dữ liệu tuần hiện tại, không lộ dữ liệu KH.
2. [CC] Chạy `build_report.js` end-to-end với dữ liệu thật → xuất `05_Journal/reports/RPT-2026-Wnn_bao-cao-tuan.docx`; cập nhật INDEX.
3. [TT] Bổ sung dữ liệu "Đào tạo AI" vào Initiative/Task để mảng 3 có số thật.
4. [TT] Chạy thử scheduled task `dung-bao-cao-tuan` (Run now) để duyệt quyền + xác nhận đọc GAS.

## Trung bình
5. [CW] Phỏng vấn Tuân làm giàu Knowledge SYS-GNOL, SYS-BLOL (đầu mối IT/OP, luồng, rủi ro, tài liệu).
6. [CW] Log các Decision mới phát sinh khi vận hành.
7. [CC] Cân nhắc thêm mốc nhắc 17:00 thứ 6 vào NotificationService (GAS) cho email đáng tin cậy (cần deploy).

## Điều kiện tuyển agent đầu tiên
Chỉ khi weekly-report chạy ổn định thật (xem 02_Rules/agent-hiring-rule.md).

## Delta (2026-08-03, Claude Code)
Sprint 4 + Sprint 5 đã push. Không đổi thứ tự ưu tiên: mục #1–2 (GAS live cho weekly-report) vẫn đứng đầu, giao [CC].
