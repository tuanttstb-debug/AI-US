# PORTFOLIO DIGEST — trạng thái dự án (tự sinh)

> ⚙️ **File tự sinh bởi `03_Skills/portfolio-digest/digest.js` — KHÔNG sửa tay.** Điểm vào & phần quy hoạch curated: `00_System/PORTFOLIO.md`.
>
> Sinh lúc: 2026-08-22T06:50:09.798Z · Nguồn: `AI_CONTEXT/SESSION_HANDOVER.md` + git mỗi repo (đọc-only).

## Bảng nhanh

| Dự án | Nhánh | Commit gần nhất | Dirty | Delta handover mới nhất |
|---|---|---|---|---|
| PRJ-SHTD · SHTD-Dashboard | main | 2026-08-22 `29369e4` feat(date-guard): S77 chống lệch định dạng ngày tận gốc (onEdit + daily) | 82 file | S77 — DateGuard: chống lệch định dạng ngày TẬN GỐC (backend + test) |
| PRJ-AIUS · ai-usecase-platform | main | 2026-08-18 `dee94e6` @ docs: session handover 2026-08-18 — TECH_DEBT delta (đóng USERS-LEGACY-01, giảm USERMASTER-CONCURRENCY-01) | 14 file | Session: 2026-08-18 (Part 3) — Dọn rác: nguồn user DUY NHẤT = User_Master (SHTD) |
| PRJ-LOG · Logistics-Dashboard | main | 2026-08-07 `ff8be68` feat(overhead): khoản CHƯA map vẫn phân loại Overhead (safety-net) + chốt baseline $45.061,40 | sạch | 2026-08-07 (CHỐT PHIÊN) — Tổng kết phiên (3 việc; chi tiết ở 3 block dưới) |
| PRJ-NOXH · NOXH | main | 2026-08-17 `bf81743` @ docs(AI_CONTEXT): thêm PROJECT_STATE.md (chuẩn khung AI OS registry) | 1 file | 🔴 HANDOVER HIỆN TẠI (2026-07-31, phiên 3 — nối backend LIVE + push git) |
| PRJ-SG · Smart Guarantee | main | 2026-08-18 `bafe44a` docs(context): session handover — thông luồng end-to-end + nợ tích hợp | 4 file | ⭐ Tổng kết phiên 2026-08-18 #10 (Claude Code) — 🎉 THÔNG LUỒNG end-to-end |
| PRJ-BM · BeneMatch | main | 2026-08-22 `865a826` feat(reconcile): Batch Reconciliation da hoa don - da lenh CT + toi uu Dify rule-first | sạch | Delta phiên (2026-08-22) — Mở scope Batch Reconciliation + dựng end-to-end + tối ưu Dify |

## Chi tiết delta mới nhất mỗi dự án

### PRJ-SHTD — SHTD-Dashboard
*Hệ tác nghiệp Khối KHDN (AIOS đọc từ đây)*

**S77 — DateGuard: chống lệch định dạng ngày TẬN GỐC (backend + test)**
- **Task completed**: Truy vết nghi vấn "sửa nhầm file / thiếu deploy GAS" của vụ báo cáo tuần AIOS hiện deadline sai (`BL1-026` email 31/07 vs DB 31/08). **Kết luận có bằng chứng**: (1) deadline trong email **100% do AIOS dựng** (`aggregate.js parseVNDate+fmtDMY` → `build_email.js` HTML); GAS SHTD `ReportEmailService.sendWeeklyReport_` chỉ **relay** (`htmlBody: html` param "đã dựng ở AIOS", dòng 156/179) — KHÔNG parse/format ngày → sửa ở AIOS là **đúng file**, không cần deploy GAS là **đúng chủ đích** (không file GAS nào đổi). (2) parser AIOS đã verify đúng (`"31-thg 8-26"`→`Date.UTC(2026,7,31)`→`31/08/2026`, UTC nhất quán). (3) Gốc = **snapshot cũ** (đã guard bên AIOS hôm trước). **Việc phiên này**: bịt **rủi ro nền** — dữ liệu ngày trong Sheet có thể bị Google localise lại sau sửa tay/paste; `DateNormalizeMigration.gs` chỉ dọn 1 lần → dựng **DateGuard 2 tầng** chống tái phát.
- **Files changed**: NEW `backend/DateGuard.gs` (onEdit real-time + daily scan + install/uninstall/selftest; tái dùng `_dnToISO`/`_DN_TARGETS`), NEW `verify_date_guard.mjs` (29/29), `run_tests.mjs` (+đăng ký). AI_CONTEXT (4 file). **KHÔNG đụng FE source** (audit `assets/js` xác nhận writer→`fmtDateExport`, reader→`toISODate` đã chuẩn từ S67.2; các `new Date()` là tính toán trên memory ISO). Không commit ~85 PNG `test-results` dirty (leftover cũ).
- **Decision made**: (1) Fix ở **tầng dữ liệu (GAS trigger)** để cả dashboard lẫn báo cáo AIOS hưởng lợi, thay vì chỉ vá từng consumer. (2) **CHỈ rewrite** chuỗi locale/serial lệch & parse được; Date hợp lệ/ISO/rỗng bỏ qua (ít churn); không parse được → **giữ + log** (không phá dữ liệu ngân hàng). (3) `setNumberFormat('@')` **best-effort try/catch** — né lỗi "cột kiểu đã nhập" đã khiến S67.2 bỏ khoá plain-text. (4) daily @7h **trước** `notifScan`@8h để digest/báo cáo đọc dữ liệu sạch. (5) Không bump APP_VERSION (backend thuần).
- **Blocker**: không. **✅ [TT] đã hoàn tất phía GAS** (dán DateGuard.gs + `commitNormalizeDates()` + `installDateGuardTriggers()` + `dailyDateGuard()` chạy tay).
- **Next step**: [TT] nghiệm thu vào **kỳ gửi email tới** — deadline trong email khớp DB; thử sửa 1 ô ngày kiểu `31-thg 8-26` trên Sheet → reload → thành `2026-08-31` (real-time). [CC] (tuỳ chọn) mở rộng guard cho **8 sheet H2_*** nếu KPI cũng nhập ngày tay; gộp `_dnToISO` thành 1 nguồn nếu tách module chung.
- **Regression risk**: **Thấp/không**. Toàn file MỚI, độc lập — 0 đổi FE, 0 đổi route/handler GAS đang chạy. Guard chỉ chuẩn hoá ĐÚNG các cột ngày đã quản lý; programmatic write không kích onEdit (không vòng lặp); idempotent (verify DG9). `verify_date_guard` 29/29; guard **không** chạy tự động trong test suite trình duyệt nên không ảnh hưởng suite cũ.

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
