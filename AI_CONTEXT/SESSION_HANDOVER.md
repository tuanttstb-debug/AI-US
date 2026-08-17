# SESSION HANDOVER — AI OS

**Từ phiên:** 2026-08-03 (Cowork — Sprint 1→5)
**Cho:** phiên/công cụ kế tiếp (Cowork hoặc Claude Code)

## Delta phiên (2026-08-17 — đổi tên folder local `AI-US`→`AIOS`, Claude Code)
- **Việc xong:** [TT] đã đổi tên thư mục làm việc `D:\Workspace\AI-US` → **`D:\Workspace\AIOS`**. Rà soát toàn bộ **local + git**: (1) toàn bộ code JS dùng đường dẫn **tương đối** (`__dirname`/`path.resolve(__dirname,'..','..')`) → **không vỡ**; (2) git hoạt động bình thường, worktree không bind đường dẫn tuyệt đối; (3) **không** scheduled task Windows nào trỏ đường dẫn cũ; (4) `.claude/settings.local.json` chỉ chứa permissions, không có path. Đã **kiểm chứng chạy** `aggregate.js` → REPO resolve đúng `D:\Workspace\AIOS`, dựng lại `report_data.json` OK (kỳ W34: 272 active, 89 quá hạn).
- **KHÔNG cần sửa:** remote GitHub vẫn là `github.com/tuanttstb-debug/**AI-US**` — đó là **tên repo trên GitHub** (không liên quan tên folder local), giữ nguyên. Các reference "AI-US" trong `CHANGELOG.md`/`PROJECT_STATE.md` là URL repo, đúng.
- **Dấu vết định danh cũ (vô hại, không sửa file):** (a) project key Claude Code cũ `C:\Users\LENOVO\.claude\projects\D--Workspace-AI-US\` chứa transcript các phiên trước (giữ lại làm lịch sử); phiên mới key `D--Workspace-AIOS`. (b) memory dir rỗng ở cả 2 key → không có gì migrate.
- **Việc xong (2):** **TD-WR-02 GIẢI QUYẾT** — `aggregate.js` map cột theo **tên header** thay index cứng: thêm `buildCols(header, spec, fallback, label)` + `C_SPEC/I_SPEC/K_SPEC/DV_SPEC` (regex trên header row), gán C/I/K/DV trong `main()` từ header cache; không khớp → fallback `*_DEFAULT` (= index cũ, không tệ hơn) + `console.warn`. Verify: chạy lại đúng số kỳ W34, 0 cảnh báo; giả lập chèn cột giữa → resolver remap đúng. File đổi: `aggregate.js`, `SKILL.md`, `TECH_DEBT.md`, `TODO_NEXT.md`.
- **Blocker:** không. **Rủi ro hồi quy:** Không — chỉ đổi tên thư mục + refactor map cột (giữ fallback = hành vi cũ), đã verify output không đổi.

## Delta phiên (2026-08-16 — đổi định danh KHỐI + HTML email di động, Claude Code)
- **Việc xong:** (1) **Đổi định danh** đơn vị báo cáo: "Trung tâm SP&GP Tín dụng" → **"Khối Ngân hàng Doanh nghiệp"** (tiêu đề báo cáo + code + tài liệu); **nơi nhận giữ "Giám đốc Trung tâm"** (theo chốt của [TT]). (2) **weekly-report v5**: thêm đầu ra **HTML email responsive** (`build_email.js`) làm **bản chính** — Giám đốc đọc thẳng trong email, xem trên điện thoại **không vỡ cấu trúc**; giữ `.docx` làm bản lưu trữ. Đã render thử ở khổ hẹp, bố cục 1 cột fluid OK.
- **File đổi (commit CODE+DOCS):** **mới** `build_email.js`; sửa `aggregate.js` (scope + tên mảng 5 "của Khối" + banner), `build_report.js` (tiêu đề "KHỐI NGÂN HÀNG DOANH NGHIỆP", subtitle), `run.js` (+build_email), `SKILL.md` v5, `.gitignore` (+`*.html`), `00_System/INDEX.md`, `01_Soul/identity.md`, `04_Knowledge/people/PER-TTT.md`, 3 file AI_CONTEXT. Local-only mới: `RPT-2026-W33_bao-cao-tuan.html`.
- **Quyết định:** (1) Tiêu đề = **Khối Ngân hàng Doanh nghiệp**, nơi nhận = **Giám đốc Trung tâm** (AskUserQuestion 2026-08-16). (2) Đầu ra chính = **HTML email**, giữ .docx. (3) Email-safe: 1 cột max-640, **CSS inline**, tiles inline-block tự xuống dòng, **bảng hồ sơ → thẻ**, **chart bằng thanh CSS** (không PNG vì mobile chặn ảnh). (4) `.html` báo cáo **gitignore** (chứa tên KH) như `.docx`.
- **Cần [TT] xác nhận:** tài liệu cũ (`identity.md`/`PER-TTT.md`) ghi "Khối **Khách hàng** Doanh nghiệp"; đã đổi theo tên [TT] đưa là "Khối **Ngân hàng** Doanh nghiệp". Nếu là lỗi gõ → báo để revert về "Khách hàng".
- **Blocker:** không cản việc; 1 vướng môi trường: dựng lại `.docx` báo **EBUSY** khi file đang mở trong Word (HTML vẫn ra bình thường) → đóng file rồi `node run.js --cache`. Đã ghi **TD-WR-04**.
- **Bước kế:** [TT] gửi thử bản HTML qua email/điện thoại thật để nghiệm thu render trên client (Gmail/Outlook mobile — **TD-WR-05**); đóng Word rồi chạy lại để làm mới `.docx`. [CC] (tùy chọn) đọc nội dung HTML vào thân email tự động khi có kênh gửi; gộp helper build_email/build_report (**TD-WR-06**); TD-WR-02 header-name; snapshot lịch sử.
- **Rủi ro hồi quy:** Thấp. `build_email.js` độc lập, chỉ đọc `report_data.json`, không đụng .docx/aggregate logic. Rủi ro chính: render khác nhau giữa các email client (Outlook desktop bỏ inline-block → tiles xuống 1 cột, chấp nhận được). Chưa nghiệm thu trên client thật.
- **Trạng thái commit:** đã commit + push `d5d8b0b` (13 file, không lọt artifact/secret). Đã gửi file HTML cho [TT] xem trước. Phiên bàn giao này thêm TECH_DEBT + finalize delta.

## Delta phiên (2026-08-14 #2 — nâng cấp ĐIỀU HÀNH-FIRST, Claude Code)
- **Việc xong:** Sau phản biện góc Giám đốc, nâng weekly-report lên **v4 điều hành-first**: **Trang 1 đọc 60 giây** (5 ô KPI · ① Cần BLĐ xếp theo tiền · ② Cảnh báo quá hạn/blocked · ③ Thắng lợi 2 tuần · ④ Milestone ≤14 ngày) → **Ưu tiên 1 core** (4 mảng) → **Ưu tiên 2** (5 AI + 6 Dev_Plan) → Trọng tâm. Thêm **Sức khỏe THỰC** đối chiếu deadline (kỳ W33: team tô 267/272 xanh nhưng **75 quá hạn** → core "Rủi ro cao"; ~**7,8 nghìn tỷ** hồ sơ blocked). Fetch thêm domain **`dev`** (42 mục phát triển bản thân). Đặt v3/v4 làm bản chuẩn.
- **File đổi (commit CODE+DOCS):** `aggregate.js` (khối exec, realHealth, dev, priority P1/P2, overdue), `make_charts.js` (donut Đúng hạn/Quá hạn), `build_report.js` (rewrite điều hành-first), `fetch_gas.js` (+domain dev), `SKILL.md` v4, 4 file AI_CONTEXT. Local-only: `RPT-2026-W33_bao-cao-tuan.docx`, `report_data.json`, cache.
- **Quyết định:** (1) **Sức khỏe = realHealth** (suy từ hạn + đối chiếu RAG, lấy màu xấu hơn). (2) **Ưu tiên 2 = AI + Dev_Plan**. (3) Cấu trúc **exceptions-first**, core P1 nổi bật, AI/Dev P2 gọn. (4) Ngưỡng: hồ sơ lớn = Cao|Dự án|≥50 tỷ; quá hạn = deadline<hôm nay & chưa xong; milestone ≤14d; thắng lợi = xong có hạn trong 14d. (5) Hiển thị **tên KH** ở hồ sơ + quyết định (nội bộ), artifacts vẫn gitignore.
- **Blocker:** không.
- **Bước kế (phiên sau):** [TT] tiếp tục; đã đề xuất (chờ chốt) **quá hạn theo team** để quy trách nhiệm + **top hồ sơ treo lâu nhất**; [CC] lưu snapshot lịch sử để có **delta tuần-qua-tuần**; TD-WR-02 map cột theo header-name; xét ngưỡng cấu hình hoá.
- **Rủi ro hồi quy:** Thấp–trung bình. Rewrite `build_report.js` lớn nhưng chỉ dựng docx, đọc-only. Rủi ro: `realHealth`/quá hạn phụ thuộc parse ngày (đã xử lý 3 định dạng; ngày lạ → không tính quá hạn → có thể sót); classifier heuristic (TD-WR-01). Đã rà tay kỳ W33.

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
- **Đường dẫn làm việc: `D:\Workspace\AIOS`** (đã đổi tên từ `AI-US`, 2026-08-17). Code dùng path tương đối nên không phụ thuộc tên folder. Remote GitHub vẫn tên `AI-US` (không đổi).
- Commit từ sandbox Cowork có thể vướng `.git/index.lock` (ổ Windows). Xử lý: `del .git\index.lock` rồi commit. Commit từ Claude Code/máy không gặp.
- Sandbox Cowork không POST được URL ngoài → tích hợp GAS live phải chạy ở Claude Code/máy.
- Chạy `build_report.js`: cần Node; nếu thiếu module docx, đặt `NODE_PATH` tới node_modules global hoặc `npm i docx`.
- Chỉ metadata công việc — không đưa dữ liệu khách hàng lên GAS/cloud.

## Trạng thái commit
Sprint 4 (v0.4.0, 69896f2) + Sprint 5 (v0.5.0, dc83419 — AI_CONTEXT + protocol) đã commit. Phiên Claude Code này push cả hai + delta AI_CONTEXT lên origin/master.
