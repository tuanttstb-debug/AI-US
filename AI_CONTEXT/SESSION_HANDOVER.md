# SESSION HANDOVER — AI OS

**Từ phiên:** 2026-08-03 (Cowork — Sprint 1→5)
**Cho:** phiên/công cụ kế tiếp (Cowork hoặc Claude Code)

## Delta phiên (2026-08-14, Claude Code)
- **Việc xong:** TODO #1–2 DONE — weekly-report chạy **LIVE**, nâng cấp thành **báo cáo cấp Trung tâm 5 mảng nghiệp vụ**; xuất `05_Journal/reports/RPT-2026-W33_bao-cao-tuan.docx` (271 việc đang chạy · 117 hồ sơ lớn ~45,4 nghìn tỷ). Skill lên **v3**. Áp 5 điều chỉnh của [TT]: thêm cột **Khách hàng** bảng case; mục **"Phát sinh tuần này"** mỗi mảng; đổi tên mảng 2 → *"Các line dự án / initiative lớn đang chạy"*; **tách SP/xây quy trình khỏi QLDM** về mảng 1 (94 việc); mảng 4 chỉ còn giám sát nợ thực (53). Phân bố: SP 94 · Dự án 107 · Case 117 · QLDM 53 · AI 17.
- **File đổi (đã commit — CODE + DOCS):** mới `03_Skills/weekly-report/{fetch_gas,aggregate,make_charts,run}.js`, `package.json`; sửa `03_Skills/weekly-report/{build_report.js, SKILL.md(v3)}`, `00_System/INDEX.md`, `06_Tools/connectors/gas.md` (auth+batch-read), `.gitignore`, 4 file `AI_CONTEXT`.
- **File LOCAL-ONLY (gitignore — chứa tên KH/secret, KHÔNG lên GitHub):** `05_Journal/reports/*.docx`, `03_Skills/weekly-report/report_data.json`, `00_System/cache/gas_snapshot.json`, `06_Tools/connectors/.gas-secret.json`, `node_modules/`.
- **Quyết định:** (1) Nguồn đọc = GAS **`auth-login`+`batch-read`** (connector Drive `read_file_content` lossy — làm phẳng/trộn sheet, chỉ ra 94/1178 task). (2) **5 mảng cấp Trung tâm** phân loại bằng classifier ưu tiên (AI → nợ/danh mục thực → SP/quy trình → dự án) trong `aggregate.js`. (3) Báo cáo **nội bộ → hiển thị tên KH** (task + case) để phân biệt; nhưng artifacts gitignore, không đẩy cloud (RULE-data-boundary). (4) Chart bằng Node `@napi-rs/canvas` (bỏ matplotlib/Python).
- **Blocker:** không. Credential đã có; `git check-ignore` xác nhận secret/artifacts bị loại.
- **Bước kế:** [TT] duyệt nội dung cuối; [TT] #3 bổ sung data Đào tạo AI, #4 chạy thử scheduled task. [CC] tùy chọn: chart theo initiative %HT, memoize membership, map cột theo header-name (TD-WR-02), log DEC báo cáo Trung tâm.
- **Rủi ro hồi quy:** Thấp — code mới độc lập, chỉ đọc, không đụng skill khác. Rủi ro chính: classifier heuristic có thể xếp nhầm vài task biên (đã rà tay); nếu Dashboard đổi cột thì `aggregate.js` (index cột C/I/K) vỡ — xem TECH_DEBT TD-WR-02.

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
