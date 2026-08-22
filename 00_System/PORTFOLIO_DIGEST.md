# PORTFOLIO DIGEST — trạng thái dự án (tự sinh)

> ⚙️ **File tự sinh bởi `03_Skills/portfolio-digest/digest.js` — KHÔNG sửa tay.** Điểm vào & phần quy hoạch curated: `00_System/PORTFOLIO.md`.
>
> Sinh lúc: 2026-08-22T08:26:34.044Z · Nguồn: `AI_CONTEXT/SESSION_HANDOVER.md` + git mỗi repo (đọc-only).

## Bảng nhanh

| Dự án | Nhánh | Commit gần nhất | Dirty | Delta handover mới nhất |
|---|---|---|---|---|
| PRJ-SHTD · SHTD-Dashboard | main | 2026-08-22 `8870d1d` docs(handover): chốt commit hash dbc84ce cho S78 (AI_CONTEXT) | 85 file | Delta phiên (2026-08-22 — CR Kanban "Công việc của tôi": 4 trạng thái To-do + scroll đồng nhất + filter nhân sự, Claude Code) |
| PRJ-AIUS · ai-usecase-platform | main | 2026-08-18 `dee94e6` @ docs: session handover 2026-08-18 — TECH_DEBT delta (đóng USERS-LEGACY-01, giảm USERMASTER-CONCURRENCY-01) | 14 file | Session: 2026-08-18 (Part 3) — Dọn rác: nguồn user DUY NHẤT = User_Master (SHTD) |
| PRJ-LOG · Logistics-Dashboard | main | 2026-08-07 `ff8be68` feat(overhead): khoản CHƯA map vẫn phân loại Overhead (safety-net) + chốt baseline $45.061,40 | sạch | 2026-08-07 (CHỐT PHIÊN) — Tổng kết phiên (3 việc; chi tiết ở 3 block dưới) |
| PRJ-NOXH · NOXH | main | 2026-08-17 `bf81743` @ docs(AI_CONTEXT): thêm PROJECT_STATE.md (chuẩn khung AI OS registry) | 1 file | 🔴 HANDOVER HIỆN TẠI (2026-07-31, phiên 3 — nối backend LIVE + push git) |
| PRJ-SG · Smart Guarantee | main | 2026-08-18 `bafe44a` docs(context): session handover — thông luồng end-to-end + nợ tích hợp | 4 file | ⭐ Tổng kết phiên 2026-08-18 #10 (Claude Code) — 🎉 THÔNG LUỒNG end-to-end |
| PRJ-BM · BeneMatch | main | 2026-08-22 `865a826` feat(reconcile): Batch Reconciliation da hoa don - da lenh CT + toi uu Dify rule-first | sạch | Delta phiên (2026-08-22) — Mở scope Batch Reconciliation + dựng end-to-end + tối ưu Dify |

## Chi tiết delta mới nhất mỗi dự án

### PRJ-SHTD — SHTD-Dashboard
*Hệ tác nghiệp Khối KHDN (AIOS đọc từ đây)*

**Delta phiên (2026-08-22 — CR Kanban "Công việc của tôi": 4 trạng thái To-do + scroll đồng nhất + filter nhân sự, Claude Code)**
- **Task completed:** 3 yêu cầu CR trên view Kanban của **My Work** (thuần FE): (1) **Cột "Cần thực hiện" gộp đúng 4 trạng thái** `Chưa bắt đầu · Hoàn thành chuẩn bị · Tạm dừng · Blocked` — định nghĩa tường minh bằng constant `MW_KB_TODO_STATES` (thay comment ngầm), giữ nguyên logic "phần còn lại → To-do" nên **không mất task** trạng thái lạ. (2) **Đồng nhất concept scroll**: trước chỉ cột "Vừa đóng" có khung cuộn `max-height:520px`; nay **To-do + In-process** dùng CHUNG khung cuộn đó → nhiều task không kéo dài trang. (3) **Filter theo nhân sự** hỗ trợ Teamlead/Admin review nhanh: droplist "Lọc theo nhân sự" (distinct picRes/picAcc trong phạm vi role) → chọn 1 người lọc task người đó là Res/Acc, áp cho **cả List lẫn Kanban** qua 1 nguồn `_mwScopedTasks`. Đổi team → reset nhân sự; User thường không thấy droplist.
- **Files changed:** *(commit `dbc84ce`, main)* `assets/js/views/my-work.js` (constants state Kanban + `_mwCanFilterPeople`/`_mwPersonMatch`/`_mwTeamPeople`/`_mwEffectivePersonFilter`, `_mwScopedTasks` +param personFilter, `_mwKanbanColumns` dùng constant, `_mwBuildKanban` scroll cả 3 cột, `_mwPersonFilterHtml`+`mwSetPersonFilter`, reset person khi đổi team), `assets/css/my-work.css` (comment scroll dùng-chung + `.mw-person-filter{max-width:180px}`), `assets/js/i18n.js` (+`mw.person.all`/`mw.person.filter` VI/EN), `assets/js/config.js` (APP_VERSION v6.52), `index.html` (cache-bust `?v=20260822`, 65 refs), `verify_my_work.mjs` (+KB8/KB9/PF1–PF5). PNG `test-results/my_work` **không stage** (EVD tái tạo được — theo tiền lệ S77).
- **Decision made:** (1) To-do giữ **negative-filter** (`!inProc && !done`) để không mất task trạng thái lạ, chỉ **tường minh hoá** bằng `MW_KB_TODO_STATES` (4 state CR) cho dễ đọc/test — KHÔNG chuyển sang whitelist cứng (tránh ẩn task). (2) Person filter đặt ở **`_mwScopedTasks`** (1 nguồn) để cả List lẫn Kanban đồng nhất, thay vì chỉ lọc trong build Kanban. (3) Droplist nhân sự lấy **distinct từ pic của task trong scope** (không cần load User_Master) — hiển thị đúng người đang có việc. (4) Person filter **in-memory** (không persist localStorage) — tránh chọn người đã rời team bị kẹt; reset khi Admin đổi team.
- **Blocker:** không. Thuần FE — **KHÔNG cần redeploy GAS**, chỉ hard-reload. *(Nợ cũ độc lập vẫn treo: S77 nghiệm thu kỳ email tới; S76/S75 redeploy GAS cho suppress digest + send-report — không liên quan phiên này.)*
- **Next step:** [TT] hard-reload PRD → badge `v6.52`; smoke: cột "Cần thực hiện" gồm task Tạm dừng/Blocked/HT chuẩn bị/Chưa bắt đầu; kéo nhiều task ở To-do/In-process → cuộn trong khung; (Teamlead/Admin) chọn 1 nhân sự ở droplist → board thu về đúng người. [CC] (tuỳ chọn) nếu muốn thứ tự "đóng gần nhất" chính xác → thêm cột Closed Date (TD-MW-02); cân nhắc persist person filter theo phiên nếu [TT] thấy tiện.
- **Regression risk:** **Thấp.** Thuần FE additive: To-do đổi từ negative-filter sang cùng kết quả + constant (hành vi KHÔNG đổi — KB8 xác nhận đủ 4 state, không lẫn); scroll + person filter là thêm mới; hành vi Teamlead/Admin cũ giữ nguyên khi không chọn nhân sự. Đã verify: `verify_my_work` **91/91** (từ 82/82, +9 test: KB8×3 To-do-4-state/no-leak/split, KB9 scroll-3-cột, PF1–PF5 droplist/options/filter/reset/member-no-droplist qua Playwright DOM thật); `node --check` sạch 3 file JS.

### PRJ-AIUS — ai-usecase-platform
*Quản trị AI use-case (SPTD)*

**Session: 2026-08-18 (Part 3) — Dọn rác: nguồn user DUY NHẤT = User_Master (SHTD)**
- **Scope:** Rà soát toàn bộ, gỡ tính năng rác trỏ data cũ (sheet USERS nội bộ), gỡ quản lý user khỏi AI US, chốt nguồn user duy nhất = `User_Master` trên SHTD.
- **Status:** ✅ Code xong + test local PASS: **Playwright 88/88** (đã xóa spec 02 users-page ~10 test) · SPTD 34/34 · KPI 38/38 · ID 14/14. **⚠️ CẦN redeploy GAS.**

### PRJ-LOG — Logistics-Dashboard
*Báo cáo chi phí logistics (CEO)*

**2026-08-07 (CHỐT PHIÊN) — Tổng kết phiên (3 việc; chi tiết ở 3 block dưới)**
- **✅ Task completed:**
- 1. **Khôi phục data thật** — user rotate GAS, đã dán URL mới `config/env.js`, verify live (ping/meta/facts/pob). *(đã commit `e558271`)*
- 2. **Overhead safety-net** — `stageOverhead_` mặc định `FWD='Overhead FWD'` + `Standard Cost`=tên gốc cho khoản CHƯA map (sheet 19 = kho overhead) → khoản overhead thêm tay (Evergreen) không bị loại khỏi khối. Chốt root cause qua PQ gốc. Test **55/55 PASS**.
- 3. **Đối chiếu Excel↔GAS** — lệch $659 = **DATA out-of-sync** (rate 26452 vs 26462 · DHL Sheets thiếu 4 lô · FedEx Import lệch amount · VVMV +1 dòng $0), KHÔNG phải bug code. User đồng bộ Sheets←Excel → **khớp cent $45.061,40 / 1495 dòng / rate 26462**.
- **📁 Files changed:** `config/env.js` *(commit trước)*; `backend/Transform.gs` (stageOverhead_); `test/run_tests.cjs` (+fixture Evergreen +5 assert); docs `SESSION_HANDOVER`/`PROJECT_STATE`/`TODO_NEXT`/`TECH_DEBT`/`CHANGE_LOG`; EVD regen.
- **🧭 Decision made:** (a) sheet 19 auto-phân loại Overhead cho khoản chưa map + đăng ký chuẩn ở `22_Map_Cost` (best-of-both); (b) **Excel là nguồn tham chiếu** → luôn đồng bộ Sheets←Excel (raw+rate) trước rebuildFact; (c) khi tổng Excel≠GAS → nghi DATA-sync TRƯỚC code.

### PRJ-NOXH — NOXH
*Legal Knowledge Graph NOXH (sản phẩm)*

**🔴 HANDOVER HIỆN TẠI (2026-07-31, phiên 3 — nối backend LIVE + push git)**
- **Task completed:**
- Điền `Config.gs`: `SPREADSHEET_ID` + `DRIVE_FOLDER_ID` thật (OQ-01/02); `GAS_WEBAPP_URL` vào `config.js`.
- Backend GAS khớp hợp đồng frontend: `SheetService` parse mảng/JSON/bool + chuẩn hoá Date→`yyyy-MM-dd`;
- `QaService.answer` đúng shape (`vaiTro`/`noiDung`/`citations.nhan`/`canhBaoThieuCanCu`);
- `StatsService` gộp `tong-quan` 4 call → 1 (kèm KPI); đồng bộ field `trichDan`/`dieuKhoanLienQuan`.
- `SeedData.gs` (sinh từ `seed-data.js`) + `Setup.gs::setupSheets()` tạo 8 sheet + đổ seed (thay import

### PRJ-SG — Smart Guarantee
*PoC AI xử lý & sinh thư bảo lãnh (TPBank)*

**⭐ Tổng kết phiên 2026-08-18 #10 (Claude Code) — 🎉 THÔNG LUỒNG end-to-end**
- **Task completed:** Debug UAT thật (PDF `Test/IB2600452376.pdf` qua FE localhost:8765 → GAS live → Dify live) qua chuỗi lỗi, **thông toàn luồng**: FE upload → GAS OCR-extract → **Dify 4 LLM** → GAS suy route + parse + assemble → FE 5 tab → generate DOCX. 3 fix nối tiếp: (a) `Drive is not defined` → **Drive REST** (`Convert.gs`, phiên #9); (b) `DIFY_TIMEOUT 404` do `DIFY_BASE_URL` chứa `/v1/workflows/run` → **chuẩn hoá về host** (`Config.gs`); (c) `sandbox 429` (Dify Cloud giới hạn code node) → **workflow LLM-only 6 node** (bỏ route+assemble code node), chuyển route/parse/assemble sang GAS. [TT] xác nhận luồng thông; sẽ **tuning chất lượng** sau.
- **Files changed:** `gas/Config.gs` (normalize DIFY_BASE_URL), `gas/Dify.gs` (`normalizeDify_` parse 4 output text + `routeFromClassification_`), `gas/Convert.gs` (mới, Drive REST), `gas/Text.gs`/`gas/Generate.gs` (dùng Convert), `gas/appsscript.json` (bỏ advanced service), `dify/smart-guarantee.workflow.yml` (rewrite LLM-only), `dify/WORKFLOW_SPEC.md`. Commits `fc1775f`→`b37793c`.
- **Decision:** (1) **Dify = LLM-only**; route (deterministic) + parse JSON + assemble ở **GAS** — tránh sandbox 429, ổn định hơn. (2) Convert PDF/Word→Doc qua **Drive REST (UrlFetch)** thay Advanced Drive Service. (3) `DIFY_BASE_URL` = **host gốc** (`https://api.dify.ai`), code tự strip `/v1[/workflows/run]`. (4) Model **GPT-5.4-mini** ([TT] cấu hình 4 node LLM trong Dify). (5) Extract tự suy hệ biến `$ND` vs `[...]` từ classification trong prompt.
- **Blocker:** **Hết blocker luồng.** Còn phần chất lượng (chưa đo): độ chính xác classification/segmentation/mapping; route `ONLINE_B8ZB` chưa test template thật (`$ND` field-code — TD-SG-06); tuning prompt/alias/placeholder.
- **Next step:** [TT] **tuning** (prompt trong Dify, alias/placeholder/registry trong Sheet, model) + chạy `docs/UAT.md` (T1–T6) đo KPI. [CC] hỗ trợ theo kết quả: fix `$ND` OOXML nếu route ONLINE lỗi; tinh chỉnh schema/prompt; DOCX format.
- **Regression risk:** trung bình — đổi cơ chế Dify output (object→4 text) + GAS parse/route; **luồng đã chạy thông** nhưng **chưa đo chất lượng/độ chính xác** trên bộ test.

### PRJ-BM — BeneMatch
*API xác minh tên pháp nhân bên thụ hưởng trước giải ngân (PoC/Demo TPBank)*

**Delta phiên (2026-08-22) — Mở scope Batch Reconciliation + dựng end-to-end + tối ưu Dify**
- **Task completed:** Phỏng vấn tổng thể 2 vòng chốt **scope mới**: đối chiếu lô đa hóa đơn ↔ đa lệnh CT (OCR hybrid → gộp theo người thụ hưởng/MST → tổng nhóm + grand total, dung sai, over/under, duplicate, khớp tên qua V2 → cảnh báo). Dựng trọn: (1) **context/design** — `RECONCILIATION_SPEC.md`, `OCR_SPEC.md`, `DIFY_OPTIMIZATION.md`, cập nhật `API_CONTRACT`(batch)/`SYSTEM_ARCHITECTURE`/`PROJECT_STATE`. (2) **recon engine** `src/recon/` (normalize·csv·reconcile·verify_client) + config `thresholds.json`. (3) **dataset synthetic** 9 nhóm + **harness `test/recon.test.mjs` 14/14 pass**. (4) **tối ưu Dify yml** — Warning Route 4 nhánh, node mới `Build Deterministic Review Warning`, route deterministic qua `review_mode is DETERMINISTIC_WARNING`, LLM chỉ else; trả **TD-BM-01/02** + phát hiện & vá **TD-BM-03** (`contains`→`is`); validate YAML + chạy code node OK. (5) **GAS** `gas/Code.gs`+`Recon.gs`+`OcrService.gs` + **parity `verify_recon.mjs` (Recon.gs ≡ src/recon, byte-identical)** + `verify_ocr.mjs` (parse 5/5). (6) **FE** `fe/index.html` (verify render trình duyệt thật) + (7) **artifact** publish private (`present.html`).
- **Files changed:** MỚI `AI_CONTEXT/{RECONCILIATION_SPEC,OCR_SPEC,DIFY_OPTIMIZATION}.md`, `src/recon/*`, `src/config/thresholds.json`, `data/synthetic/*`, `test/recon.test.mjs`, `gas/*`, `fe/*`. SỬA `AI_CONTEXT/{API_CONTRACT,SYSTEM_ARCHITECTURE,PROJECT_STATE,TODO_NEXT,TECH_DEBT}.md` + `Beneficiary Legal Entity Verification V2.yml` (backup `*.BACKUP-20260822.yml`). **Chưa commit** (chờ [TT]).
- **Decision made:** OCR **hybrid** (GAS+Vision thật + synthetic fallback); mapping **gộp theo người thụ hưởng (MST)**; validate đủ 4; output **FE + artifact**; Dify **rule-first** (LLM chỉ REVIEW&ai_eligible=true); recon **engine JS riêng** (test offline) + Dify verify tên; lệnh CT **CSV**; OCR fields **tên+MST·tổng tiền·số HĐ+ngày**. Route deterministic qua `review_mode` (string) thay vì boolean `ai_eligible` cho an toàn DSL. Recon = **1 nguồn logic** (src/recon) + bản port GAS parity-tested; FE/artifact engine sinh từ Recon.gs (không copy tay).
- **Blocker:** **Chờ [TT] cung cấp** (xem TODO_NEXT delta 2026-08-22): import yml Dify Cloud + DIFY_API_URL/KEY; Vision API key + ảnh hóa đơn mẫu; deploy GAS; Sheet ID. Toàn bộ đã dựng để "cắm vào là chạy".
- **Next step:** [TT] cung cấp 4 mục trên. [CC] khi có: nối FE Live→GAS, smoke-test OCR ảnh thật, hiệu chỉnh regex (TD-BM-05). Kết việc spoke → về hub AIOS chạy `/handover` (Sync-hub).
- **Regression risk:** **Thấp** cho phần offline (engine có regression gate 14/14 + parity gate; yml validate + LLM giữ đúng 1 edge vào; lõi verify 1-cặp KHÔNG đổi hành vi, chỉ sửa routing + type). **Chưa xác thực trên Dify Cloud thật** (chờ import) — rủi ro chính nằm ở khác biệt DSL Dify khi import (đã giảm bằng validate cấu trúc + dùng string condition có tiền lệ). OCR đường thật chưa chạy ảnh thật.
