# SESSION HANDOVER — AI OS

**Từ phiên:** 2026-08-03 (Cowork — Sprint 1→5)
**Cho:** phiên/công cụ kế tiếp (Cowork hoặc Claude Code)

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
Sprint 4 (v0.4.0) đã commit + push. Sprint 5 (AI_CONTEXT + protocol, v0.5.0): cần commit sau phiên này.
