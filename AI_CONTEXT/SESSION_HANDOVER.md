# SESSION HANDOVER — AI OS

**Từ phiên:** 2026-08-03 (Cowork — Sprint 1→5)
**Cho:** phiên/công cụ kế tiếp (Cowork hoặc Claude Code)

## Delta phiên (2026-08-19 #2 — tính năng gửi báo cáo tuần qua email (SHTD), Claude Code)
- **Task completed:** Triển khai tính năng **gửi báo cáo tuần định kỳ qua email** như 1 feature của dự án **SHTD-Dashboard**. Template HTML điều hành-first (đã DUYỆT) dựng ở AIOS `weekly-report/build_email.js`; **SHTD GAS backend là bên GỬI**. **To** = user `CuongVM1`; **Cc** = mọi user `Role=Teamlead`, `Active≠false`, có Email (loại trùng địa chỉ To). GAS tự phân giải người nhận từ `User_Master` (nguồn sự thật server-side) rồi `MailApp.sendEmail`. Định kỳ = scheduled task AIOS chiều thứ 6 chạy `node run.js --send`.
- **Files changed:** *SHTD (commit `ce56c8c`, main):* mới `backend/ReportEmailService.gs` (`_reportRecipients_` dedup + `sendWeeklyReport_` dryRun) · sửa `backend/Code.gs` (route `send-report` Admin-only) · mới `verify_send_report.mjs` (7/7) · sửa `run_tests.mjs` · sửa `AI_CONTEXT/SESSION_HANDOVER.md` (S75). *AIOS (commit `fdac8d0`, master):* mới `03_Skills/weekly-report/send_email.js` · sửa `run.js` (cờ `--send`), `fetch_gas.js` (export `loadSecret`/`login`/`gasPost`), `SKILL.md` (v6), `06_Tools/connectors/gas.md`. *(AIOS commit riêng `2d257db`: onboard PRJ-BM — không liên quan feature.)*
- **Decision made:** (1) Kiến trúc **AIOS dựng + GAS gửi** — KHÔNG port logic aggregate 5 mảng sang GAS (tránh nhân đôi/lệch bản; đúng "1 nguồn sự thật"; tái dùng template đã duyệt) — theo AskUserQuestion. (2) Người nhận phân giải **server-side** từ `User_Master`, AIOS chỉ đưa `{html, subject}`. (3) `send-report` **Admin-only** + `dryRun` (soi To/Cc trước khi bắn). (4) `--send` **opt-in** trong `run.js` để chạy tay không lỡ gửi. (5) Data-boundary: HTML chứa tên KH (nội bộ) gửi email nội bộ qua GAS của ngân hàng — cùng miền tin cậy với Sheets nguồn, không lên cloud ngoài.
- **Blocker:** **GAS SHTD CHƯA redeploy** — `backend/*.gs` merge tay vào Apps Script rồi redeploy (link không đổi); trước redeploy `--send`/`--dry` báo `action không hợp lệ: send-report`. Đồng thời **`User_Master` cần điền Email** cho CuongVM1 + teamlead (nợ cũ S74).
- **Next step:** [TT] (1) merge `ReportEmailService.gs` + route `send-report` vào Apps Script → **redeploy** Web App; (2) điền Email `User_Master` (CuongVM1 + teamlead); (3) `node send_email.js --dry` soi To/Cc → `node run.js --send` chạy thử 1 kỳ; (4) đổi lệnh scheduled task thứ 6 sang `run.js --send`.
- **Regression risk:** **Thấp.** Toàn file/route mới độc lập; `send-report` Admin-only, gate token như action khác; AIOS chỉ thêm module + cờ opt-in + export helper (không đổi luồng fetch/aggregate/build). Đã verify: `verify_send_report.mjs` **7/7** chạy hàm GAS THẬT (sandbox stub SpreadsheetApp/MailApp) — đúng To/Cc/dedup/dryRun-không-gửi/payload; syntax mọi file OK; live `send_email.js --dry` login OK + POST tới GAS (đúng lỗi chưa-deploy). Chưa gửi email thật nào.

## Delta phiên (2026-08-19 — tri thức TPBank tái dùng đa dự án, Claude Code)
- **Task completed:** Scan dự án **tham khảo SCF** (`D:\Workspace\SCF`) → rút concept/kiến trúc/vai trò hệ thống/vướng mắc; **so sánh SCF ↔ PRJ-SG** rút bài học (heavy self-build vs lean PoC). Chốt lại thành **tri thức TPBank dùng chung**: tạo mới **`04_Knowledge/products/SYS-TPBANK.md`** (landscape hệ thống + pattern kiến trúc + phụ thuộc/SPOF + chữ ký số/ECM + data-boundary) và **`04_Knowledge/references/REF-TPBANK-DELIVERY.md`** (org actors, thẩm quyền, vòng đời triển khai, maker-checker BPM, blocker phổ biến, 2 archetype, pre-flight checklist). Mục tiêu: sẵn sàng cho dự án phối hợp phòng ban khác, không chỉ SG.
- **Files changed (AIOS):** mới `04_Knowledge/products/SYS-TPBANK.md`, `04_Knowledge/references/REF-TPBANK-DELIVERY.md`; sửa `00_System/INDEX.md` (+SYS-TPBANK, +mục **Reference (REF)**), `02_Rules/naming-convention.md` (+ID `REF-<MÃ>`), `04_Knowledge/projects/PRJ-SG.md` (`related` +SYS-TPBANK/REF-TPBANK-DELIVERY). Memory AIOS: `tpbank-system-landscape` + `scf-reference-project` (reference, trỏ canonical trong 04_Knowledge).
- **Decision made:** (1) Tri thức hạ tầng/quy trình TPBank = **dùng chung**, tách khỏi thẻ dự án → đặt ở `04_Knowledge/{products,references}`. (2) **KHÔNG lưu nguyên tắc nghiệp vụ SCF** (theo yêu cầu [TT]) — chỉ lấy tri thức hệ thống/tổ chức, có ghi rõ ràng buộc trong cả doc lẫn memory. (3) Thêm loại entity **REF-** vào naming-convention.
- **Blocker:** không. **Next step:** [TT] bổ sung đầu mối IT/OP thực (PER-*) cho SYS-TPBANK khi có; [CC] khi vào dự án TPBank mới → chạy pre-flight checklist trong REF-TPBANK-DELIVERY.
- **Regression risk:** không — toàn file tri thức mới + đăng ký registry; không đụng code/skill/dự án đang chạy. Chưa commit (chờ [TT]).

## ▣ CHỐT PHIÊN #2 (2026-08-17, Claude Code) — cơ chế onboard + dự án mới
> Nối tiếp CHỐT PHIÊN #1 (bên dưới). Chi tiết từng bước: delta #5–#6.

- **Task completed:** (1) **Cơ chế onboard dự án mới** — `00_System/templates/CLAUDE.md` (bootstrap auto-load, mắt xích còn thiếu) + skill **`03_Skills/init-project/`** (1 lệnh: scaffold repo `AI_CONTEXT/`+`CLAUDE.md` **và** đăng ký AIOS qua anchor; no-overwrite, không tự commit, có `--dry`). (2) **Onboard dự án thật đầu tiên — Smart Guarantee** (`PRJ-SG`): `git init`, khung context đầy đủ, **`DESIGN_SYSTEM.md` kế thừa UI/UX SHTD** (tím `#7B2CBF`, breakpoints 1440/1280/1024/768/480), đăng ký registry; digest 5/5 repo.
- **Files changed:** *AIOS (commit `84cd110`→`a97c165`):* `00_System/templates/{CLAUDE.md,AI_CONTEXT_TEMPLATE/README.md}`, `03_Skills/init-project/{init.js,SKILL.md}`, `00_System/{PORTFOLIO.md,INDEX.md,PORTFOLIO_DIGEST.md}` (+anchor), `02_Rules/naming-convention.md`, `03_Skills/portfolio-digest/projects.json`, `04_Knowledge/projects/PRJ-SG.md`, AI_CONTEXT. *Repo SG (`3f66e13`, local):* `AI_CONTEXT/*` (6) + `CLAUDE.md`.
- **Decision made:** "Khai báo" dự án = 2 tầng (repo: `CLAUDE.md`+`AI_CONTEXT/`; AIOS: thẻ PRJ+PORTFOLIO/INDEX/projects.json), tự động hoá bằng `init-project`; chèn dòng qua **anchor comment**. SG kế thừa UI/UX SHTD; nghiệp vụ tham chiếu `SYS-BLOL`; **stack/phạm vi SG để phiên 1 chốt** (không bịa).
- **Blocker:** repo SG **chưa có GitHub remote** (mới local); phạm vi nghiệp vụ SG [CHỜ XÁC NHẬN].
- **Next step:** [TT] bắt đầu **phiên 1 trên Smart Guarantee** (chốt phạm vi/stack, tạo remote); [CC] scaffold FE theo DESIGN_SYSTEM. (tuỳ chọn) backfill `CLAUDE.md` cho 4 repo cũ.
- **Regression risk:** không — toàn file/skill mới độc lập trong AIOS; `init-project` no-overwrite + không tự commit; SG là dự án mới chưa có code.

## Delta phiên (2026-08-17 #6 — onboard dự án PRJ-SG Smart Guarantee, Claude Code)
- **Task completed:** Onboard dự án mới **Smart Guarantee** (`D:\Workspace\Production\Smart Guarantee`) bằng skill `init-project` (lần dùng thật đầu tiên): `git init` (main) + scaffold `AI_CONTEXT/` + `CLAUDE.md`; làm giàu OVERVIEW/STATE/TODO/HANDOVER với nội dung khởi điểm; tạo **`DESIGN_SYSTEM.md` kế thừa UI/UX SHTD** (token tím `#7B2CBF`, radius/shadow, kiến trúc CSS, breakpoints 1440/1280/1024/768/480 — theo yêu cầu [TT]). Đăng ký registry (thẻ PRJ-SG + PORTFOLIO + INDEX + projects.json). Commit đầu repo SG `3f66e13`. Digest cập nhật: 5/5 dự án.
- **Files changed:** *repo SG:* `AI_CONTEXT/*` (6 file) + `CLAUDE.md`. *AIOS:* `04_Knowledge/projects/PRJ-SG.md`, `00_System/{PORTFOLIO.md,INDEX.md,PORTFOLIO_DIGEST.md}`, `03_Skills/portfolio-digest/projects.json`, AI_CONTEXT.
- **Decision made:** SG kế thừa UI/UX từ SHTD; nghiệp vụ tham chiếu `SYS-BLOL`; **stack + phạm vi nghiệp vụ để phiên 1 chốt** (không bịa). Copy `variables.css` SHTD làm nền FE.
- **Blocker:** repo SG **chưa có GitHub remote** (mới local); phạm vi nghiệp vụ [CHỜ XÁC NHẬN].
- **Next step:** [TT] bắt đầu **phiên 1 trên Smart Guarantee** — chốt phạm vi/stack (TODO_NEXT), tạo remote; [CC] dựng scaffold FE theo DESIGN_SYSTEM. **init-project đã kiểm chứng end-to-end.**
- **Regression risk:** không — dự án mới độc lập; AIOS chỉ thêm 1 dòng danh mục + digest.

## Delta phiên (2026-08-17 #5 — cơ chế onboard dự án mới, Claude Code)
- **Task completed:** Dựng cơ chế "khai báo" để phiên mới tự lấy đúng kiến trúc/quy trình: (1) **`00_System/templates/CLAUDE.md`** — bootstrap auto-load (thứ tự đọc `AI_CONTEXT/` + quy tắc commit/handover 6 trường/data-boundary); phát hiện **chưa repo nào có CLAUDE.md** → đây là mắt xích thiếu. (2) **Skill `03_Skills/init-project/`** (`init.js`+`SKILL.md`): 1 lệnh scaffold repo mới (`AI_CONTEXT/` 5 file + `CLAUDE.md`) **và** đăng ký AIOS (thẻ PRJ + chèn PORTFOLIO/INDEX tại anchor + `projects.json`). No-overwrite, không tự commit, có `--dry`. Đã test dry + thật (scratchpad) → dọn sạch.
- **Files changed:** mới `00_System/templates/CLAUDE.md`, `03_Skills/init-project/{init.js,SKILL.md}`; sửa `00_System/PORTFOLIO.md` + `INDEX.md` (thêm **anchor** chèn dòng + row skill), `02_Rules/naming-convention.md`, `00_System/templates/AI_CONTEXT_TEMPLATE/README.md`, `03_Skills/portfolio-digest/projects.json` (format mở rộng), AI_CONTEXT.
- **Decision made:** "Khai báo" 2 tầng — (repo) `CLAUDE.md` auto-load + `AI_CONTEXT/`; (AIOS) thẻ PRJ + PORTFOLIO/INDEX/projects.json. Tự động hoá bằng `init-project` để không sót bước. Script chèn dòng qua **anchor comment** (bền hơn parse bảng).
- **Blocker:** không.
- **Next step:** khi [TT] tạo dự án mới → `node 03_Skills/init-project/init.js --id PRJ-<MÃ> --name .. --folder .. --role ..` rồi điền OVERVIEW + commit 2 repo. (tuỳ chọn) backfill `CLAUDE.md` cho 4 repo hiện có.
- **Regression risk:** không — toàn file mới + anchor/tài liệu trong AIOS; script no-overwrite, không tự commit, không đụng dự án đang chạy.

## ▣ CHỐT PHIÊN (2026-08-17, Claude Code) — tổng hợp cả phiên
> Chi tiết từng bước ở các delta #1–#4 bên dưới. Đây là bản cuộn tóm cấp phiên.

- **Task completed:**
  1. Rà soát sau đổi tên folder `D:\Workspace\AI-US`→`AIOS` (code path tương đối, không vỡ; verify chạy).
  2. **TD-WR-02** — `aggregate.js` map cột theo **header-name** (`buildCols`+`*_SPEC`, fallback index + cảnh báo).
  3. **Quy hoạch tri thức đa dự án** trọn 4 pha: **P1** registry Hub-and-Spoke (PORTFOLIO + 6 thẻ PRJ + template + naming) · **P2** dedup (loại LG Dashboard, NOXH Hackathon sang `Dự án lỗi`) · **P3** chuẩn hoá 4/4 repo active về `AI_CONTEXT/` (NOXH +PROJECT_STATE; AIUS đổi `ai_context`→`AI_CONTEXT`; LOG giữ 2 tầng cố ý; SHTD sẵn đạt) · **P4** skill `portfolio-digest` tự gom trạng thái.
- **Files changed:** *AIOS (8 commit `dd1b000`→`31a3c29`):* `03_Skills/weekly-report/{aggregate.js,SKILL.md}`, `03_Skills/portfolio-digest/{digest.js,projects.json,SKILL.md}`, `00_System/{PORTFOLIO.md,PORTFOLIO_DIGEST.md,INDEX.md}`, `04_Knowledge/projects/PRJ-*.md` (6), `00_System/templates/AI_CONTEXT_TEMPLATE/` (7), `02_Rules/naming-convention.md`, 4 file `AI_CONTEXT`. *Repo NOXH:* +`AI_CONTEXT/PROJECT_STATE.md` (`bf81743`). *Repo AIUS:* rename `ai_context/`→`AI_CONTEXT/` + `TECH_DEBT.md` (`e377098`, nhánh `docs/v3.15.0-deployed`).
- **Decision made:** (1) Mô hình **Hub-and-Spoke** — context sống trong repo, AIOS làm registry (không copy → 1 nguồn sự thật). (2) Khung tối thiểu = `AI_CONTEXT/` (hoa) + 5 file; mở rộng hợp lệ được chấp nhận (LOG 2 tầng, NOXH ROADMAP≈TODO). (3) "Chuẩn hoá" ≠ gộp cơ học. (4) TD-WR-02 giữ **fallback index** = hành vi cũ. (5) Digest ghi file **tự sinh riêng**, đọc-only repo Production.
- **Blocker:** Không.
- **Next step:** [TT] xử lý conflict/merge nhánh AIUS `docs/v3.15.0-deployed` vào `main` khi cần. [CC] (tuỳ chọn) lên lịch chạy `digest.js` định kỳ; gom ~20 `.md` root AIUS về `AI_CONTEXT/docs/` (ưu tiên thấp); snapshot lịch sử weekly-report → delta tuần-qua-tuần.
- **Regression risk:** **Thấp.** AIOS toàn tài liệu + code mới độc lập. `aggregate.js` giữ fallback (verify output không đổi kỳ W34). AIUS chỉ rename R100 (giữ lịch sử) + sửa 2 con trỏ, không đụng việc dở của [TT]. NOXH chỉ +1 file. `portfolio-digest` đọc-only.

## Delta phiên (2026-08-17 #4 — AIUS chuẩn hoá xong + Phase 4 portfolio-digest, Claude Code)
- **Việc xong:** (1) **AIUS** đổi `ai_context/`→`AI_CONTEXT/` (commit AIUS `e377098`, nhánh `docs/v3.15.0-deployed`): `git mv` 2 bước (Windows case-insensitive, rename thuần R100 giữ lịch sử) + sửa 2 con trỏ active trong `TECH_DEBT.md` gốc; **không đụng** 12 png `evd/` + `H2/` [TT] đang làm dở; bảng lịch sử trong handover giữ nguyên. → **P3 hoàn tất: cả 4 repo active dùng `AI_CONTEXT/` đồng nhất.** (2) **Phase 4** — dựng skill **`03_Skills/portfolio-digest/`** (`digest.js` + `projects.json` + `SKILL.md`): đọc-**only** delta `SESSION_HANDOVER` mới nhất + `git log/branch/status` từng repo → tự sinh `00_System/PORTFOLIO_DIGEST.md`. Chạy thử: 4/4 repo đọc OK.
- **File mới (AIOS):** `03_Skills/portfolio-digest/{digest.js,projects.json,SKILL.md}`, `00_System/PORTFOLIO_DIGEST.md` (tự sinh). **Sửa:** PORTFOLIO (link digest + P4 xong), INDEX (+skill), thẻ PRJ-AIUS, 3 file AI_CONTEXT. **Repo AIUS:** rename thư mục + TECH_DEBT.md.
- **Quyết định:** digest ghi ra **file riêng tự sinh** (`PORTFOLIO_DIGEST.md`), tách khỏi PORTFOLIO curated → không rủi ro clobber. Skill tuyệt đối đọc-only trên repo Production.
- **Blocker:** không. **Rủi ro hồi quy:** Không — AIUS chỉ rename (R100) + sửa 2 con trỏ; digest read-only, chỉ ghi 1 file trong AIOS.
- **Bước kế:** [TT] xử lý conflict AIUS nếu có (nhánh docs/v3.15.0 chưa merge main). (tuỳ chọn) lên lịch chạy digest định kỳ; gom ~20 .md root AIUS về `AI_CONTEXT/docs/` (ưu tiên thấp).

## Delta phiên (2026-08-17 #3 — P2 dedup + P3 chuẩn hoá, Claude Code)
- **Việc xong:** **P2 dedup** — [TT] loại **LG Dashboard** (bản cũ của Logistics-Dashboard) + **NOXH Hackathon** (bản dự thi, đã sản phẩm hoá thành NOXH) sang `D:\Workspace\Dự án lỗi`; registry archive 2 thẻ (`status: superseded`), PORTFOLIO/INDEX tách active 4 / đã loại 2. **P3 chuẩn hoá** sau khảo sát 3 repo còn lệch — điều chỉnh phạm vi đúng thực tế: (1) **LOG** `context/` là **kho tri thức 2 tầng CỐ Ý** (15 file, 10 tham chiếu chéo) → KHÔNG gộp, đánh dấu ✅; (2) **NOXH** thêm `AI_CONTEXT/PROJECT_STATE.md` (commit NOXH `bf81743`, chỉ add file mới, không đụng SESSION_HANDOVER user đang sửa) → ✅ đạt; (3) **AIUS** rename `ai_context`→`AI_CONTEXT` an toàn về code (grep 0 tham chiếu) nhưng **HOÃN** vì repo đang làm dở (nhánh `docs/v3.15.0`, 12 png dirty + `H2/`).
- **File đổi (AIOS):** PORTFOLIO, INDEX, 4 thẻ PRJ (LGD/NOXHHACK archive, LOG/NOXH/AIUS tinh chỉnh), 3 file AI_CONTEXT. **File đổi (repo NOXH):** +`AI_CONTEXT/PROJECT_STATE.md`.
- **Quyết định:** "chuẩn hoá" ≠ gộp cơ học — mở rộng khung hợp lệ (LOG 2 tầng, NOXH ROADMAP≈TODO) được chấp nhận. Chỉ đụng repo khác khi [TT] đồng ý từng lần.
- **Blocker:** không. **Bước kế:** [TT] khi rảnh gom xong việc dở AIUS → [CC] đổi hoa thư mục `AI_CONTEXT` cho AIUS (việc P3 duy nhất còn lại). (tuỳ chọn) P4 skill "portfolio digest".
- **Rủi ro hồi quy:** Không — AIOS chỉ thêm tài liệu; NOXH chỉ thêm 1 file mới (additive), không sửa code/logic.

## Delta phiên (2026-08-17 #2 — quy hoạch tri thức đa dự án: Registry Hub-and-Spoke, Claude Code)
- **Việc xong:** Khảo sát `D:\Workspace\Production` (6 repo: SHTD-Dashboard, ai-usecase-platform, Logistics-Dashboard, LG Dashboard, NOXH, NOXH Hackathon) + AIOS. Phát hiện phân mảnh: tên thư mục context không thống nhất (`AI_CONTEXT/` vs `ai_context/`), bộ file mỗi repo tự phát minh, context rải rác, **không có tầng danh mục trung tâm**. Chốt mô hình **Hub-and-Spoke** (AskUserQuestion): context sống trong repo mỗi dự án; AIOS làm **Registry + Portfolio** (thẻ mỏng trỏ về, không copy → một nguồn sự thật). Dựng **khung trung tâm P1**.
- **File mới (AIOS):** `00_System/PORTFOLIO.md` (bảng danh mục 6 dự án + quan hệ + việc chuẩn hoá treo); `04_Knowledge/projects/PRJ-{SHTD,AIUS,LOG,LGD,NOXH,NOXHHACK}.md` (6 thẻ); `00_System/templates/AI_CONTEXT_TEMPLATE/` (README + 5 file khung mẫu). **Sửa:** `02_Rules/naming-convention.md` (+ID `PRJ-` + mục thẻ dự án/registry), `00_System/INDEX.md` (+mục Project + trỏ PORTFOLIO).
- **Quyết định:** (1) Khung tối thiểu mọi repo = thư mục **`AI_CONTEXT/`** (in hoa) + 5 file: PROJECT_OVERVIEW/SESSION_HANDOVER/PROJECT_STATE/TODO_NEXT/TECH_DEBT; file chuyên biệt là mở rộng cùng chỗ. (2) AIOS **không** ôm bản copy; chỉ thẻ `PRJ-<MÃ>` + PORTFOLIO. (3) Chuẩn hoá từng repo làm **dần khi chạm repo**, không ép một lượt.
- **Cần [TT] chốt (dedup):** PRJ-LGD (LG Dashboard) có phải bản cũ của PRJ-LOG (Logistics-Dashboard)? · PRJ-NOXHHACK vs PRJ-NOXH giữ cả hai (thi vs sản phẩm) hay hợp nhất? → archive/gộp.
- **Blocker:** không. **Rủi ro hồi quy:** Không — chỉ thêm tài liệu trong AIOS, KHÔNG đụng 6 repo Production.
- **Bước kế:** [TT] chốt dedup (P2); [CC] chuẩn hoá `ai_context`→`AI_CONTEXT` + gom context rải rác khi có phiên chạm PRJ-AIUS/LOG/NOXHHACK (P3); (tuỳ chọn) skill "portfolio digest" gom delta handover các repo → PORTFOLIO tự động (P4).

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
