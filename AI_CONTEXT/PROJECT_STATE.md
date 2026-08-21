# PROJECT STATE — AI OS

**Cập nhật:** 2026-08-03 (Sprint 5)
**Version:** 0.5.0
**Repo:** https://github.com/tuanttstb-debug/AI-US

## Tóm tắt
AI OS = lớp quản trị & trí tuệ ngồi trên SHTD Dashboard (hệ tác nghiệp). Đơn người dùng (PER-TTT). Chỉ metadata công việc. Trung lập model, local-first, có Git + GitHub.

## Đã có
- Nền: 00_System (README, INDEX, manifest, CHANGELOG, 6 template), 01_Soul, 02_Rules, 06_Tools/gas.
- Knowledge: SYS-GNOL, SYS-BLOL, PER-TTT.
- Journal: 5 Decision (DEC-20260803-01..05).
- Skills: weekly-report (v2, có mẫu .docx), deadline-brief, decision-brief, intake-triage.
- Lịch: thứ 6 17:00 nhắc data, 18:00 dựng báo cáo.
- 07_Agents: trống (theo agent-hiring-rule).

## Nguồn tác nghiệp (Google Sheets qua GAS)
- Spreadsheet: `1cpg1p_8TGGbvZNNWZmjsKANqHW1tQijbiQBFLYn56Hk`
- Endpoint: xem `06_Tools/connectors/gas.md`
- 9 sheet: Task_Master(24), Initiative_Master(15), Case_Pipeline(20), Issue_Tracker(18), Dev_Plan(12), KPI_Summary, Notifications, User_Master, Audit_Log.

## Đang treo
- Chạy thử weekly-report một kỳ thật với GAS (điều kiện tiên quyết trước khi tuyển agent).
- Bổ sung dữ liệu Đào tạo AI vào Initiative/Task.
- Làm giàu Knowledge GNOL/BLOL (qua phỏng vấn).

## Rủi ro/hiện tượng đã biết
- Commit từ sandbox Cowork có thể vướng `.git/index.lock` trên ổ Windows → commit từ máy hoặc Claude Code.
- Lock git stale (`index.lock`/`HEAD.lock`) cũng gặp trên Claude Code khi commit trước bị gián đoạn — xem `AI_CONTEXT/TECH_DEBT.md` (2026-08-03).
- Sandbox Cowork không gọi được URL ngoài → tích hợp GAS live giao Claude Code.

## Delta (2026-08-21, Claude Code)
**Bộ đào tạo 3 trụ + skill dựng PPTX TPBank + lệnh phiên (commit `d1921b8`).** AIOS nay có: (1) **`training-program/`** — chương trình đào tạo Team Số hóa Tín dụng gồm **Design Thinking (M1) · Agile (M2) · Growth (M3) · Capstone (M4)** + followup, nối 3 trụ bằng ngôn ngữ chung (Options=Ideate=Prioritization · Harvest=Test-learning=Retro); bộ Growth cũ nằm ở `03_growth`. (2) Skill **`tpbank-deck`** — dựng PPTX chuẩn nhận diện TPBank bằng python-pptx (6 layout, asset brand thật trích từ pptx tham khảo SCF), verify render qua PowerPoint COM. (3) **Lệnh phiên riêng repo hub:** `.claude/commands/{start,handover}.md` (`/start` nạp context theo cấu trúc hub, `/handover` ghi delta 4 file + push). Danh mục skill: weekly-report · portfolio-digest · init-project · deadline/decision-brief · intake-triage · **tpbank-deck**. **Blocker:** không.

## Delta (2026-08-20, Claude Code)
**Người nhận báo cáo email = sheet cấu hình `Report_Config` (bỏ hardcode).** `ReportEmailService.gs` (SHTD) nay đọc người nhận động từ sheet `Report_Config` (Enabled/To_Username/Cc_Role/Cc_Extra/From_Name) qua `_reportConfig_()`, fallback hằng số nếu sheet vắng; `setupReportConfig()` tạo sheet 1 lần từ editor. Cc hỗ trợ nhiều role + Cc_Extra + gate Enabled. Nghiệm thu **LIVE** `--dry`: đọc đúng sheet, To/Cc thật. Debug thiếu teamlead: MaiTTT7/QuynhNNY thiếu Email, TuanTT4=Admin (dùng Cc_Extra), SPTDDN.CB là Cc_Extra chủ đích. verify 10/10 (hàm GAS thật). Commits: SHTD `d38de2f`, AIOS `8470f86` (đã push). **Chặn:** điền Email MaiTTT7/QuynhNNY + thêm TuanTT4 vào Cc_Extra (chỉnh sheet, không redeploy).

## Delta (2026-08-19 #2, Claude Code)
**Tính năng gửi báo cáo tuần qua email (SHTD).** weekly-report nay có đường **GỬI định kỳ**: AIOS dựng HTML (template đã duyệt) → POST action GAS `send-report` (SHTD backend) → `MailApp` gửi. To=`CuongVM1`, Cc=`Teamlead` active (dedup), phân giải server-side từ `User_Master`. `run.js --send` (opt-in) cho lịch thứ 6; `send_email.js --dry` soi người nhận. skill v6. **Chặn triển khai:** SHTD phải **redeploy GAS** + điền **Email User_Master**. Verify `verify_send_report.mjs` 7/7 (hàm GAS thật). Commits: SHTD `ce56c8c`, AIOS `fdac8d0`.

## Delta (2026-08-19, Claude Code)
**Tri thức TPBank tái dùng đa dự án.** Từ dự án tham khảo SCF + so sánh với PRJ-SG, AIOS nay có 2 tri thức dùng chung: `04_Knowledge/products/SYS-TPBANK.md` (landscape hệ thống/kiến trúc/phụ thuộc) và `04_Knowledge/references/REF-TPBANK-DELIVERY.md` (mô hình triển khai/governance/blocker/checklist). Thêm loại entity `REF-` vào naming-convention + mục Reference trong INDEX. Sẵn sàng cho dự án phối hợp phòng ban khác. **Ràng buộc:** không lưu nguyên tắc nghiệp vụ SCF — chỉ tri thức hệ thống/tổ chức.

## ▣ CHỐT PHIÊN #2 (2026-08-17, Claude Code)
**Cơ chế onboard + dự án mới (commit `84cd110`→`a97c165`).** AIOS nay có **luồng khai báo dự án 1 lệnh**: skill `03_Skills/init-project/` + `CLAUDE.md` bootstrap template → scaffold repo mới (`AI_CONTEXT/`+`CLAUDE.md`) và đăng ký registry (thẻ PRJ + PORTFOLIO/INDEX/projects.json) qua anchor. Đã onboard dự án thật đầu tiên **PRJ-SG (Smart Guarantee)** — UI/UX kế thừa SHTD, nghiệp vụ tham chiếu `SYS-BLOL`, chờ chốt phạm vi/stack phiên 1. **Danh mục active: 5** (SHTD/AIUS/LOG/NOXH/SG); digest gom 5/5. Skill AIOS: weekly-report · portfolio-digest · init-project.
- **Blocker:** repo SG chưa có remote. **Regression risk:** không (file/skill mới độc lập; no-overwrite).

## ▣ CHỐT PHIÊN (2026-08-17, Claude Code)
**Cả phiên (8 commit `dd1b000`→`31a3c29`):** (1) xác nhận đổi tên folder `AI-US`→`AIOS` không vỡ (code path tương đối); (2) **TD-WR-02** giải quyết — `aggregate.js` map cột theo header-name; (3) **quy hoạch tri thức đa dự án** trọn 4 pha — AIOS nay là **registry Hub-and-Spoke** cho **4 dự án active** (PRJ-SHTD/AIUS/LOG/NOXH, đều `AI_CONTEXT/` đồng nhất) + 2 đã loại (PRJ-LGD/NOXHHACK → `Dự án lỗi`); có `PORTFOLIO.md` (điểm vào), thẻ `PRJ-*`, template khung, ID `PRJ-`, và skill **`portfolio-digest`** tự gom trạng thái (`PORTFOLIO_DIGEST.md`). Tri thức dự án: **tập trung · thống nhất · đồng bộ**.
- **Blocker:** không. **Regression risk:** thấp (tài liệu + code mới độc lập; aggregate giữ fallback; repo khác chỉ rename/thêm file).

## Delta (2026-08-17 #2, Claude Code)
**Registry đa dự án — Hub-and-Spoke.** AIOS nay là **danh mục trung tâm** cho 6 repo ở `D:\Workspace\Production` (PRJ-SHTD/AIUS/LOG/LGD/NOXH/NOXHHACK). Context vẫn sống trong repo mỗi dự án (`AI_CONTEXT/`); AIOS giữ thẻ mỏng `04_Knowledge/projects/PRJ-*.md` + `00_System/PORTFOLIO.md` (điểm vào) + template khung chuẩn + ID `PRJ-`. Không copy nội dung. Chuẩn hoá từng repo (đổi hoa `AI_CONTEXT/`, gom context, dedup LG↔Logistics & NOXH↔Hackathon) làm dần — xem PORTFOLIO "việc treo". Không đụng repo Production.

## Delta (2026-08-17, Claude Code)
**Đổi tên folder local `D:\Workspace\AI-US` → `D:\Workspace\AIOS`.** Rà soát toàn bộ local + git: code JS dùng path tương đối nên **không vỡ**; git/worktree OK; không scheduled task nào trỏ path cũ. Đã verify `aggregate.js` chạy resolve đúng path mới. Remote GitHub giữ nguyên `AI-US` (tên repo, khác tên folder). Không sửa code/config — chỉ ghi nhận context. Không rủi ro hồi quy.

## Delta (2026-08-16, Claude Code)
**Đổi định danh KHỐI + HTML email di động.** Đơn vị báo cáo đổi "Trung tâm SP&GP Tín dụng" → **"Khối Ngân hàng Doanh nghiệp"** (tiêu đề + code + tài liệu); nơi nhận giữ **Giám đốc Trung tâm**. weekly-report **v5**: thêm bản **HTML email responsive** (`build_email.js`) làm đầu ra chính (đọc trong email + điện thoại không vỡ: 1 cột, CSS inline, tiles tự xuống dòng, bảng hồ sơ → thẻ, chart bằng thanh CSS); giữ `.docx`. `.html` báo cáo gitignore (tên KH). Lưu ý: tài liệu cũ ghi "Khối Khách hàng Doanh nghiệp" — đã đổi theo tên [TT] đưa, chờ [TT] xác nhận không phải lỗi gõ. Commit + push `d5d8b0b`. Nợ mới: **TD-WR-04** (.docx EBUSY khi mở Word), **TD-WR-05** (chưa nghiệm thu email client thật), **TD-WR-06** (trùng logic build_email/build_report).

## Delta (2026-08-14 #2, Claude Code)
**weekly-report v4 — điều hành-first.** Trang 1 đọc 60 giây (cần BLĐ/quá hạn/hồ sơ treo/thắng lợi/milestone); **Sức khỏe THỰC** đối chiếu deadline (W33: 75/272 quá hạn, ~7,8 nghìn tỷ hồ sơ blocked); tách **Ưu tiên 1 core** (SP · dự án · hồ sơ · danh mục-nợ) và **Ưu tiên 2** (AI + Dev_Plan, +domain `dev` 42 mục). Hiển thị tên KH (nội bộ). Bản chuẩn `RPT-2026-W33` (local-only).

## Delta (2026-08-14, Claude Code)
**weekly-report chạy LIVE — báo cáo cấp Trung tâm** (TODO #1–2 xong). Skill v3: đọc GAS `auth-login`+`batch-read` (1178 task/439 initiative/293 case), gom **5 mảng nghiệp vụ** (1 Phát triển SP · 2 Line dự án/initiative lớn · 3 Hồ sơ/case lớn · 4 Danh mục & giám sát nợ · 5 Chương trình AI), xuất `RPT-2026-W33_bao-cao-tuan.docx`. Pipeline `fetch_gas → aggregate → make_charts (Node canvas) → build_report`, orchestrator `run.js`. Deps `docx`, `@napi-rs/canvas`.
- **Data-boundary:** báo cáo hiển thị tên KH cho nội bộ, nhưng `.docx`/`report_data.json`/`cache`/`.gas-secret.json`/`node_modules` **gitignore** — không đẩy GitHub/cloud.
- Điều kiện tuyển agent (weekly-report chạy ổn định thật) → **đã đạt bước chạy được**; còn chờ [TT] duyệt nội dung + chạy vài kỳ.

## Delta (2026-08-03, Claude Code)
Sprint 4 (69896f2) + Sprint 5 (dc83419) đã commit + push lên origin/master. Trạng thái chức năng không đổi; ưu tiên tiếp theo vẫn là wiring GAS live cho weekly-report (TODO #1–2).
