---
name: weekly-report
type: skill
description: Dựng báo cáo tuần cho BLĐ dưới dạng .docx chuyên nghiệp — tổng quan "nhìn 15 giây" 4 mảng + chi tiết + kế hoạch tuần tới. Kích hoạt khi Tuân yêu cầu "báo cáo tuần" hoặc chạy định kỳ chiều thứ 6.
owner: PER-TTT
version: 2
updated: 2026-08-03
---

## Mục tiêu
Rút thời gian dựng báo cáo tuần từ 2–3 giờ xuống dưới 30 phút, dạng docx để lãnh đạo nắm trong 15 giây.

## Scope (4 mảng)
1. GNOL — giải ngân online
2. BLOL — bảo lãnh online
3. Đào tạo AI — chương trình do Tuân phụ trách (theo dõi trong Initiative/Task)
4. Task số khác — menu tín dụng, SCF, BPM, việc vận hành của team

## Đầu vào
- Kỳ: `Tuần BC` mục tiêu (chốt số liệu 18:00 thứ 6).
- Nguồn qua GAS (06_Tools/connectors/gas.md): Task_Master, Initiative_Master, Case_Pipeline, Issue_Tracker. Chỉ metadata công việc.
- Quy tắc: 02_Rules/reporting-rules.md · Giọng văn: 01_Soul/voice.md.

## Các bước
1. Xác định `Tuần BC`.
2. Đọc dữ liệu qua GAS; gán mỗi bản ghi vào 1 trong 4 mảng (theo Initiative/hệ thống/tag).
3. Với mỗi mảng, tổng hợp: trạng thái RAG, %HT, tình hình 1 dòng, next milestone, cần BLĐ?, vướng mắc, kế hoạch tuần tới.
4. Sinh 2 biểu đồ (thanh %tiến độ 4 mảng; donut RAG) — xem `build_report.js`.
5. Dựng .docx theo `00_System/templates/bao-cao-tuan_MAU.docx` (cấu trúc: bìa → Tổng quan điều hành → Chi tiết 4 mảng → Kế hoạch tuần tới).
6. Lưu `05_Journal/reports/RPT-YYYY-Wnn_bao-cao-tuan.docx`; cập nhật `00_System/INDEX.md`.

## Sinh file
- Biểu đồ: matplotlib. Docx: `build_report.js` (docx-js). Chạy Node với `NODE_PATH` trỏ tới node_modules global nếu cần.
- Đổi dữ liệu minh họa trong `build_report.js` bằng số thật đã tổng hợp ở bước 3.

## Đầu ra
File `.docx` (2–3 trang) ở `05_Journal/reports/`.

## Kiểm tra chất lượng
- [ ] Bảng tổng quan phản ánh đúng RAG + %HT từng mảng.
- [ ] Mọi việc cần BLĐ xuất hiện ở hộp nổi bật.
- [ ] Next milestone + hạn đúng.
- [ ] Tóm tắt/tình hình ngắn, văn phong điều hành.
- [ ] Không lộ dữ liệu khách hàng.

## Chờ tinh chỉnh
Cấu trúc/mục theo email mẫu BLĐ khi Tuân cung cấp; hiện dùng bố cục v2 đã duyệt.
