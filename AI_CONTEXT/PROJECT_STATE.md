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

## Delta (2026-08-16, Claude Code)
**Đổi định danh KHỐI + HTML email di động.** Đơn vị báo cáo đổi "Trung tâm SP&GP Tín dụng" → **"Khối Ngân hàng Doanh nghiệp"** (tiêu đề + code + tài liệu); nơi nhận giữ **Giám đốc Trung tâm**. weekly-report **v5**: thêm bản **HTML email responsive** (`build_email.js`) làm đầu ra chính (đọc trong email + điện thoại không vỡ: 1 cột, CSS inline, tiles tự xuống dòng, bảng hồ sơ → thẻ, chart bằng thanh CSS); giữ `.docx`. `.html` báo cáo gitignore (tên KH). Lưu ý: tài liệu cũ ghi "Khối Khách hàng Doanh nghiệp" — đã đổi theo tên [TT] đưa, chờ [TT] xác nhận không phải lỗi gõ.

## Delta (2026-08-14 #2, Claude Code)
**weekly-report v4 — điều hành-first.** Trang 1 đọc 60 giây (cần BLĐ/quá hạn/hồ sơ treo/thắng lợi/milestone); **Sức khỏe THỰC** đối chiếu deadline (W33: 75/272 quá hạn, ~7,8 nghìn tỷ hồ sơ blocked); tách **Ưu tiên 1 core** (SP · dự án · hồ sơ · danh mục-nợ) và **Ưu tiên 2** (AI + Dev_Plan, +domain `dev` 42 mục). Hiển thị tên KH (nội bộ). Bản chuẩn `RPT-2026-W33` (local-only).

## Delta (2026-08-14, Claude Code)
**weekly-report chạy LIVE — báo cáo cấp Trung tâm** (TODO #1–2 xong). Skill v3: đọc GAS `auth-login`+`batch-read` (1178 task/439 initiative/293 case), gom **5 mảng nghiệp vụ** (1 Phát triển SP · 2 Line dự án/initiative lớn · 3 Hồ sơ/case lớn · 4 Danh mục & giám sát nợ · 5 Chương trình AI), xuất `RPT-2026-W33_bao-cao-tuan.docx`. Pipeline `fetch_gas → aggregate → make_charts (Node canvas) → build_report`, orchestrator `run.js`. Deps `docx`, `@napi-rs/canvas`.
- **Data-boundary:** báo cáo hiển thị tên KH cho nội bộ, nhưng `.docx`/`report_data.json`/`cache`/`.gas-secret.json`/`node_modules` **gitignore** — không đẩy GitHub/cloud.
- Điều kiện tuyển agent (weekly-report chạy ổn định thật) → **đã đạt bước chạy được**; còn chờ [TT] duyệt nội dung + chạy vài kỳ.

## Delta (2026-08-03, Claude Code)
Sprint 4 (69896f2) + Sprint 5 (dc83419) đã commit + push lên origin/master. Trạng thái chức năng không đổi; ưu tiên tiếp theo vẫn là wiring GAS live cho weekly-report (TODO #1–2).
