# TODO NEXT — AI OS

Ưu tiên trên xuống. Owner: [CC]=Claude Code · [CW]=Cowork · [TT]=Tuân.

## Cao
1. ✅ [CC] Wiring đọc GAS live cho weekly-report — DONE (2026-08-14): `auth-login`+`batch-read`, parse 2D array, gom **5 mảng cấp Trung tâm**. Case ẩn tên KH.
2. ✅ [CC] Chạy end-to-end với dữ liệu thật → `RPT-2026-W33_bao-cao-tuan.docx`; INDEX đã cập nhật.
3. [TT] Bổ sung dữ liệu "Đào tạo AI" vào Initiative/Task để mảng 3 có số thật.
4. [TT] Chạy thử scheduled task `dung-bao-cao-tuan` (Run now) để duyệt quyền + xác nhận đọc GAS.

## Trung bình
5. [CW] Phỏng vấn Tuân làm giàu Knowledge SYS-GNOL, SYS-BLOL (đầu mối IT/OP, luồng, rủi ro, tài liệu).
6. [CW] Log các Decision mới phát sinh khi vận hành.
7. [CC] Cân nhắc thêm mốc nhắc 17:00 thứ 6 vào NotificationService (GAS) cho email đáng tin cậy (cần deploy).

## Điều kiện tuyển agent đầu tiên
Chỉ khi weekly-report chạy ổn định thật (xem 02_Rules/agent-hiring-rule.md).

## Delta (2026-08-16, Claude Code)
Đổi định danh **Khối Ngân hàng Doanh nghiệp** (nơi nhận giữ Giám đốc Trung tâm) + weekly-report **v5** thêm **HTML email responsive** (bản chính, đọc di động không vỡ). Ưu tiên tiếp:
- [TT] Gửi thử bản `.html` qua email + mở trên điện thoại thật (Gmail/Outlook mobile) để **nghiệm thu render trên client**.
- [TT] Xác nhận tên Khối: đã đổi thành "Khối **Ngân hàng** Doanh nghiệp"; tài liệu cũ ghi "**Khách hàng** Doanh nghiệp" — báo nếu cần giữ nguyên.
- [CC] (tùy chọn) tự động đưa nội dung HTML vào thân email khi có kênh gửi (GAS/SMTP); TD-WR-02 header-name; snapshot lịch sử → delta tuần-qua-tuần.

## Delta (2026-08-14 #2, Claude Code)
weekly-report nâng lên **v4 điều hành-first** (Trang 1 đọc 60 giây · Sức khỏe THỰC đối chiếu deadline · Ưu tiên 1 core vs Ưu tiên 2 AI+Dev_Plan · +domain `dev`). Ưu tiên tiếp theo:
- [TT] Duyệt bản chuẩn `RPT-2026-W33` (v4); chạy thử vài kỳ để chốt classifier + ngưỡng hồ sơ lớn/quá hạn.
- [CC] Lưu **snapshot lịch sử** mỗi kỳ để có **delta tuần-qua-tuần**.
- [CC] **TD-WR-02** — map cột `aggregate.js` theo header-name thay index (chống vỡ khi Dashboard đổi cột).
- [CC] (chờ [TT] chốt) **Quá hạn theo team** để quy trách nhiệm + **top hồ sơ treo lâu nhất**.
- [CC] Xét đưa các ngưỡng (hồ sơ lớn ≥50 tỷ, milestone ≤14d, thắng lợi 14d) thành **cấu hình hoá** thay vì hardcode.
- [CC] Log DEC "weekly-report v4 điều hành-first + realHealth".

## Delta (2026-08-14, Claude Code)
#1–2 DONE (weekly-report LIVE, báo cáo Trung tâm 5 mảng, đã áp 5 điều chỉnh [TT]: cột KH bảng case, "phát sinh tuần này", đổi tên mảng 2, tách SP/quy trình khỏi QLDM). Ưu tiên mới:
- [TT] Duyệt nội dung docx cuối; chạy thử vài kỳ để chốt classifier phân mảng.
- [CC] (tùy chọn) chart theo initiative %HT; map cột `aggregate.js` theo header-name thay index (TD-WR-02); memoize membership; log DEC "báo cáo Trung tâm 5 mảng + GAS batch-read".
- [TT] #3 bổ sung data "Đào tạo AI" & #4 chạy thử scheduled task vẫn giữ.

## Delta (2026-08-03, Claude Code)
Sprint 4 + Sprint 5 đã push. Không đổi thứ tự ưu tiên: mục #1–2 (GAS live cho weekly-report) vẫn đứng đầu, giao [CC].
