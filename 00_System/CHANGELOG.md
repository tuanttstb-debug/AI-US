# CHANGELOG — AI OS

Nhật ký thay đổi cấu trúc và nội dung nền của AI OS.

## 2026-08-03 — Sprint 5 (v0.5.0)
- Thêm lớp `AI_CONTEXT/` (SESSION_HANDOVER, PROJECT_STATE, TODO_NEXT, SYSTEM_ARCHITECTURE_CURRENT) cho cộng tác đa công cụ.
- Thêm `02_Rules/collaboration-protocol.md` — quy trình làm việc song song Cowork + Claude Code (phân vai, vùng sở hữu file, nhịp pull/commit/push, chống xung đột).
- Cập nhật README + manifest (v0.5.0).

## 2026-08-03 — Sprint 4 (v0.4.0)
- Hoàn thiện 3 skill ưu tiên: deadline-brief (#2), decision-brief (#3), intake-triage (#4).
- Cập nhật INDEX; bump version 0.4.0.
- Repo đã push GitHub: https://github.com/tuanttstb-debug/AI-US

### Hạng mục treo
- Chạy thử weekly-report một kỳ thật (điều kiện tiên quyết trước khi tuyển agent).
- Bổ sung dữ liệu Đào tạo AI; làm giàu Knowledge GNOL/BLOL qua phỏng vấn.

## 2026-08-03 — Sprint 3 (v0.3.0)
- Thiết kế mẫu báo cáo tuần mới v2 (.docx 4 mảng, tổng quan 15s, biểu đồ, KH tuần tới) — file mẫu tại 00_System/templates/bao-cao-tuan_MAU.docx.
- Cập nhật skill weekly-report v2 + template report.md + build_report.js.
- Đặt 2 lịch thứ 6: 17:00 nhắc cập nhật data, 18:00 dựng báo cáo.
- Log DEC-20260803-05 (thiết kế báo cáo).
- Khởi tạo Git repo + .gitignore để bật version history.

### Hạng mục treo
- Chạy thử báo cáo một kỳ thật (Run now để duyệt quyền + kiểm tra đọc GAS).
- Bổ sung dữ liệu Đào tạo AI vào Initiative/Task.
- Làm giàu Knowledge GNOL/BLOL qua phỏng vấn.
- Cân nhắc thêm mốc nhắc 17:00 thứ 6 vào NotificationService (GAS) cho email đáng tin cậy.

## 2026-08-03 — Sprint 2 (v0.2.0)
- Viết skill `weekly-report` (03_Skills/weekly-report/SKILL.md).
- Log 4 quyết định kiến trúc Phase 1–3 vào 05_Journal/decisions (DEC-20260803-01..04).
- Thêm Knowledge: PER-TTT, SYS-BLOL.
- Cập nhật INDEX; bump version 0.2.0.

### Hạng mục treo
- Email mẫu báo cáo tuần BLĐ → tinh chỉnh template Report + skill weekly-report.
- Rà lại 01_Soul (principles/voice) cho đúng "chất Tuân".

## 2026-08-03 — Sprint 1 (v0.1.0)
- Khoá Phase 0–4 (Discovery, Architecture, Data Model, Folder, Template).
- Dựng khung thư mục 8 lớp (Option B: tách 05_Journal).
- Viết 00_System (README, INDEX, manifest, CHANGELOG) + 6 template chuẩn.
- Viết 01_Soul (identity, principles, voice) — bản draft.
- Viết 02_Rules (naming, taxonomy-tags, data-boundary, reporting-rules, agent-hiring-rule).
- Viết 06_Tools/connectors/gas.md (kết nối 9 sheet).
- Tạo Product mẫu SYS-GNOL.
