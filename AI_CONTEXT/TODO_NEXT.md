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

## Delta (2026-08-21, Claude Code) — bộ đào tạo 3 trụ + skill tpbank-deck + lệnh phiên
XONG (commit `d1921b8`): ✅ chương trình `training-program/` (DT·Agile·Growth·Capstone + followup) · ✅ skill `tpbank-deck` (PPTX chuẩn TPBank) · ✅ 3 deck slide M1/M2/M4 · ✅ lệnh `/start` + `/handover`. Ưu tiên tiếp:
- [TT] Duyệt nội dung 3 module; chạy thử **1 workshop** (M1 Design Thinking hoặc M3 Growth) với team ≤8. Dùng **`/start`** đầu phiên, **`/handover`** cuối phiên từ nay.
- [CC] (tuỳ chọn) **Rebrand deck M3 Growth** sang chuẩn TPBank bằng `tpbank-deck` (đang teal — TD-TR-01, lệch nhận diện với M1/M2/M4).
- [CC] (tuỳ chọn) Dựng **M0** (buổi khởi động 30') thành slide/tài liệu; **export PDF** bản in member + tóm tắt 1–2 trang (hiện là HTML).
- [CC] (tuỳ chọn) Bổ sung **bộ icon** cho skill tpbank-deck (template gốc không nhúng icon raster).

## Delta (2026-08-20, Claude Code) — sheet cấu hình người nhận + debug teamlead
XONG: người nhận chuyển sang sheet `Report_Config` (bỏ hardcode, fallback an toàn) + `setupReportConfig()`; verify 10/10; nghiệm thu `--dry` LIVE. Còn để đủ người nhận + gửi thật:
- [TT] **Điền Email** cho `MaiTTT7` + `QuynhNNY` trong `User_Master` (đã Teamlead active, chỉ thiếu email).
- [TT] **Thêm `TuanTT4@tpb.com.vn` vào `Cc_Extra`** của sheet `Report_Config` (giữ Admin, không đổi role): `SPTDDN.CB@tpb.com.vn, TuanTT4@tpb.com.vn`.
- [TT] Báo [CC] chạy lại `node send_email.js --dry` → xác nhận **To + 6 Cc** → `node run.js --send` gửi thử kỳ W34.
- [TT] Đổi scheduled task chiều thứ 6 sang `node run.js --send`.
- [CC] (tuỳ chọn) đưa `Cc_Role`/`Cc_Extra` mặc định vào tài liệu skill; ẩn tên KH bản email nếu [TT] muốn.

## Delta (2026-08-19 #2, Claude Code) — gửi báo cáo tuần qua email (SHTD)
Feature XONG (code + test): action GAS `send-report` (SHTD) + `send_email.js`/`run.js --send` (AIOS). Còn để chạy thật:
- [TT] **Redeploy GAS SHTD** — merge `backend/ReportEmailService.gs` + route `send-report` vào Apps Script đã deploy rồi redeploy (link không đổi). Trước redeploy `--send` báo `action không hợp lệ`.
- [TT] **Điền Email `User_Master`** cho `CuongVM1` + các user `Teamlead` (nợ cũ S74 — feature phụ thuộc trực tiếp).
- [TT] `node send_email.js --dry` soi To/Cc thật → `node run.js --send` chạy thử 1 kỳ.
- [TT] Đổi lệnh scheduled task chiều thứ 6 sang `node run.js --send` (tự động gửi định kỳ).
- [CC] (tuỳ chọn) đưa `REPORT_TO_USERNAME`/`REPORT_CC_ROLE` thành cấu hình sheet thay vì hardcode; ẩn tên KH bản email nếu [TT] muốn.

## Delta (2026-08-19, Claude Code) — tri thức TPBank dùng chung
Đã tạo `SYS-TPBANK.md` + `REF-TPBANK-DELIVERY.md` (04_Knowledge), đăng ký INDEX + naming `REF-`. Ưu tiên tiếp:
- [TT] Bổ sung **đầu mối IT/OP thực (PER-*)** cho SYS-TPBANK khi có; xác nhận các mục [OPEN] (auth API, môi trường, go-live authority) theo dự án cụ thể.
- [CC] Khi vào **dự án TPBank mới** → chạy **pre-flight checklist** trong `REF-TPBANK-DELIVERY.md §8`; cập nhật SYS-TPBANK/REF khi phát hiện hệ thống/quy trình mới (nguồn sự thật, không chỉ ghi memory).
- [CC] (tuỳ chọn) làm giàu SYS-GNOL/SYS-BLOL (hiện còn "chờ bổ sung") bằng tri thức đã có.

## ▣ CHỐT PHIÊN #2 (2026-08-17, Claude Code) — ưu tiên cho phiên sau
Phiên này XONG: cơ chế **init-project** (onboard 1 lệnh + `CLAUDE.md` bootstrap) · onboard **PRJ-SG Smart Guarantee** (UI/UX kế thừa SHTD). Ưu tiên tiếp:
- [TT] **Phiên 1 trên Smart Guarantee:** chốt phạm vi nghiệp vụ + stack (mục [CHỜ XÁC NHẬN] trong `Production/Smart Guarantee/AI_CONTEXT/PROJECT_OVERVIEW.md`); tạo GitHub remote `Smart-Guarantee` → `git remote add origin … && git push -u origin main`.
- [CC] Dựng scaffold FE cho SG theo `DESIGN_SYSTEM.md` (copy `variables.css` + shell từ SHTD).
- [CC] (tuỳ chọn) backfill `CLAUDE.md` cho 4 repo cũ (SHTD/AIUS/LOG/NOXH); lên lịch chạy `portfolio-digest` định kỳ.

## ▣ CHỐT PHIÊN (2026-08-17, Claude Code) — ưu tiên cho phiên sau
Phiên này XONG: rà đổi tên folder · TD-WR-02 · quy hoạch đa dự án P1–P4 (registry + dedup + chuẩn hoá 4/4 + digest). Ưu tiên tiếp:
- [TT] Xử lý conflict/merge nhánh AIUS `docs/v3.15.0-deployed` → `main` (thay đổi rename `AI_CONTEXT/` đang nằm ở nhánh này).
- [TT] Các việc cũ còn treo: nghiệm thu HTML email trên client thật (TD-WR-05); bổ sung data "Đào tạo AI"; chạy thử scheduled task weekly-report.
- [CC] (tuỳ chọn) lên lịch chạy `portfolio-digest` định kỳ; gom ~20 `.md` root AIUS về `AI_CONTEXT/docs/`; snapshot lịch sử weekly-report (delta tuần-qua-tuần); gộp helper build_email/build_report (TD-WR-06).

## Delta (2026-08-17 #4, Claude Code) — AIUS xong + Phase 4
- ✅ **P3 HOÀN TẤT:** AIUS đổi `ai_context`→`AI_CONTEXT` (commit AIUS `e377098`). Cả 4 repo active đồng nhất.
- ✅ **P4 XONG:** skill `portfolio-digest` — `node 03_Skills/portfolio-digest/digest.js` → tự sinh `00_System/PORTFOLIO_DIGEST.md` (đọc-only, 4/4 repo OK).
- Ưu tiên tiếp: [TT] xử lý conflict/merge nhánh AIUS `docs/v3.15.0` nếu cần. (tuỳ chọn) lên lịch digest định kỳ; gom .md root AIUS (ưu tiên thấp).

## Delta (2026-08-17 #3, Claude Code) — P2 dedup + P3 chuẩn hoá
- ✅ **P2 dedup XONG:** [TT] loại LG Dashboard + NOXH Hackathon sang `Dự án lỗi`; registry archive 2 thẻ. Danh mục active còn 4.
- ✅ **P3 phần lớn XONG:** LOG (2 tầng cố ý, giữ) · NOXH (+PROJECT_STATE, commit `bf81743`) · SHTD (sẵn đạt).
- ⏸ **P3 còn 1 việc:** [CC] đổi `ai_context/`→`AI_CONTEXT/` cho **AIUS** — hoãn tới khi [TT] gom xong việc dở (nhánh `docs/v3.15.0`, png dirty + `H2/`).
- [CC] **(P4 tuỳ chọn)** skill "portfolio digest": gom delta `SESSION_HANDOVER` từng repo → cập nhật `PORTFOLIO.md` tự động.

## Delta (2026-08-17 #2, Claude Code) — Registry đa dự án
Dựng khung trung tâm P1 (PORTFOLIO + 6 thẻ PRJ + template + naming).

## Delta (2026-08-16, Claude Code)
Đổi định danh **Khối Ngân hàng Doanh nghiệp** (nơi nhận giữ Giám đốc Trung tâm) + weekly-report **v5** thêm **HTML email responsive** (bản chính, đọc di động không vỡ). Ưu tiên tiếp:
- [TT] Gửi thử bản `.html` qua email + mở trên điện thoại thật (Gmail/Outlook mobile) để **nghiệm thu render trên client**.
- [TT] Xác nhận tên Khối: đã đổi thành "Khối **Ngân hàng** Doanh nghiệp"; tài liệu cũ ghi "**Khách hàng** Doanh nghiệp" — báo nếu cần giữ nguyên.
- [TT] Đóng Word rồi `node run.js --cache` để làm mới bản `.docx` theo tên Khối (HTML đã đúng; xem TD-WR-04).
- [CC] (tùy chọn) tự động đưa nội dung HTML vào thân email khi có kênh gửi (GAS/SMTP); gộp helper build_email/build_report (TD-WR-06); TD-WR-02 header-name; snapshot lịch sử → delta tuần-qua-tuần.

## Delta (2026-08-14 #2, Claude Code)
weekly-report nâng lên **v4 điều hành-first** (Trang 1 đọc 60 giây · Sức khỏe THỰC đối chiếu deadline · Ưu tiên 1 core vs Ưu tiên 2 AI+Dev_Plan · +domain `dev`). Ưu tiên tiếp theo:
- [TT] Duyệt bản chuẩn `RPT-2026-W33` (v4); chạy thử vài kỳ để chốt classifier + ngưỡng hồ sơ lớn/quá hạn.
- [CC] Lưu **snapshot lịch sử** mỗi kỳ để có **delta tuần-qua-tuần**.
- ✅ [CC] **TD-WR-02** DONE (2026-08-17) — map cột `aggregate.js` theo header-name (`buildCols`+`*_SPEC`), fallback index mặc định + cảnh báo. Chống vỡ khi Dashboard chèn/đổi cột.
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
