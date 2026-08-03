# SESSION HANDOVER — AI OS

**Từ phiên:** 2026-08-03 (Cowork — Sprint 1→5)
**Cho:** phiên/công cụ kế tiếp (Cowork hoặc Claude Code)

## Delta phiên (2026-08-03, Claude Code)
- **Việc xong:** Commit + push Sprint 4 (v0.4.0) — 3 skill đang treo (deadline-brief, decision-brief, intake-triage) + CHANGELOG/INDEX/manifest. Gỡ blocker khoá git để đẩy được lên remote. Push luôn Sprint 5 (dc83419) còn treo local.
- **File đổi:** `03_Skills/{deadline-brief,decision-brief,intake-triage}/SKILL.md`, `00_System/{CHANGELOG,INDEX,manifest.yaml}` (commit 69896f2). Phiên này cập nhật 4 file AI_CONTEXT (SESSION_HANDOVER, PROJECT_STATE, TODO_NEXT, TECH_DEBT — mới).
- **Quyết định:** `.git/index.lock` + `.git/HEAD.lock` là stale — đã xác minh 2 tiến trình git đang chạy chỉ là `fsmonitor--daemon` (không giữ lock) → an toàn xoá lock rồi commit. Không kill tiến trình nào.
- **Blocker:** Lock git chặn commit — đã gỡ. Chi tiết + cách phòng: `AI_CONTEXT/TECH_DEBT.md`.
- **Bước kế:** Không đổi ưu tiên — TODO #1–2 (wiring GAS live cho weekly-report) vẫn đứng đầu.
- **Rủi ro hồi quy:** Thấp. Chỉ thêm tài liệu skill (.md) + delta AI_CONTEXT; không đụng code/luồng chạy.

## Vừa làm gì
Dựng toàn bộ nền AI OS (Phase 0–4 đã khoá; Phase 5 qua 5 sprint): folder 8 lớp, Soul/Rules/Tools, 4 skill, 5 Decision, Knowledge GNOL/BLOL/PER-TTT, mẫu báo cáo tuần .docx, 2 lịch thứ 6, Git + GitHub, và lớp AI_CONTEXT + quy trình cộng tác song song.

## Việc kế tiếp (ưu tiên 1)
Làm weekly-report chạy live với GAS — chi tiết trong `AI_CONTEXT/TODO_NEXT.md` mục 1–2. Giao Claude Code.

## Cách bắt đầu một phiên (bắt buộc)
1. `git pull`.
2. Đọc `AI_CONTEXT/PROJECT_STATE.md` + `TODO_NEXT.md` + file này.
3. Đọc `02_Rules/collaboration-protocol.md` để biết phân vai.
4. Làm việc nhỏ → commit nhỏ → cập nhật 3 file AI_CONTEXT → `git push`.

## Gotchas
- Commit từ sandbox Cowork có thể vướng `.git/index.lock` (ổ Windows). Xử lý: `del .git\index.lock` rồi commit. Commit từ Claude Code/máy không gặp.
- Sandbox Cowork không POST được URL ngoài → tích hợp GAS live phải chạy ở Claude Code/máy.
- Chạy `build_report.js`: cần Node; nếu thiếu module docx, đặt `NODE_PATH` tới node_modules global hoặc `npm i docx`.
- Chỉ metadata công việc — không đưa dữ liệu khách hàng lên GAS/cloud.

## Trạng thái commit
Sprint 4 (v0.4.0, 69896f2) + Sprint 5 (v0.5.0, dc83419 — AI_CONTEXT + protocol) đã commit. Phiên Claude Code này push cả hai + delta AI_CONTEXT lên origin/master.
