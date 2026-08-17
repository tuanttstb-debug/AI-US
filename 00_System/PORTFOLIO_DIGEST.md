# PORTFOLIO DIGEST — trạng thái dự án (tự sinh)

> ⚙️ **File tự sinh bởi `03_Skills/portfolio-digest/digest.js` — KHÔNG sửa tay.** Điểm vào & phần quy hoạch curated: `00_System/PORTFOLIO.md`.
>
> Sinh lúc: 2026-08-17T07:24:40.645Z · Nguồn: `AI_CONTEXT/SESSION_HANDOVER.md` + git mỗi repo (đọc-only).

## Bảng nhanh

| Dự án | Nhánh | Commit gần nhất | Dirty | Delta handover mới nhất |
|---|---|---|---|---|
| PRJ-SHTD · SHTD-Dashboard | main | 2026-08-16 `2a520f4` docs(S74): stamp commit hash 006ed60 vào handover | sạch | S74 — Fix nhắc việc task đã đóng: cơ chế RETRACT 3 tầng · v6.49 (GAS — ĐÃ redeploy, link không đổi) |
| PRJ-AIUS · ai-usecase-platform | docs/v3.15.0-deployed | 2026-08-17 `e377098` @ docs: đổi thư mục ai_context/ -> AI_CONTEXT/ (chuẩn khung AI OS registry) | 12 file | Session: 2026-08-02 |
| PRJ-LOG · Logistics-Dashboard | main | 2026-08-07 `ff8be68` feat(overhead): khoản CHƯA map vẫn phân loại Overhead (safety-net) + chốt baseline $45.061,40 | sạch | 2026-08-07 (CHỐT PHIÊN) — Tổng kết phiên (3 việc; chi tiết ở 3 block dưới) |
| PRJ-NOXH · NOXH | main | 2026-08-17 `bf81743` @ docs(AI_CONTEXT): thêm PROJECT_STATE.md (chuẩn khung AI OS registry) | 1 file | 🔴 HANDOVER HIỆN TẠI (2026-07-31, phiên 3 — nối backend LIVE + push git) |

## Chi tiết delta mới nhất mỗi dự án

### PRJ-SHTD — SHTD-Dashboard
*Hệ tác nghiệp Khối KHDN (AIOS đọc từ đây)*

**S74 — Fix nhắc việc task đã đóng: cơ chế RETRACT 3 tầng · v6.49 (GAS — ĐÃ redeploy, link không đổi)**
- **✅ Task**: thu hồi (mark-read) nhắc `due-3d/due-1d/due-today/overdue` khi entity done HOẶC biến mất, ở 3 tầng: (1) **real-time** `notifOnWrite` — `nowDone` → `_notifRetractEntity_()` gỡ ngay nhắc treo của entity (mọi recipient); (2) **daily self-heal** `notifScan` — `_notifLiveState_()` (tập `exist`/`done` mọi entity) + `_notifRetractStale_()` gỡ mọi nhắc due/overdue mà entity nay done/mất, chạy **TRƯỚC** `_notifSendDigests_` nên email cũng sạch → **tự chữa tồn kho lịch sử + task đóng ngoài app** (sửa Sheet tay/migration); (3) **dry-run** `notifRetractStalePreview()` soi backlog.
- **✅ Files (1 source + 1 test + 3 wiring)**: `backend/NotificationService.gs` (NEW const `_NOTIF_DUE_TYPES`; NEW `_notifRetractEntity_`/`_notifLiveState_`/`_notifRetractStale_`/`notifRetractStalePreview`; MOD `notifOnWrite` retract-on-done, `notifScan` retract pass + bump `DATA_VER` khi thu hồi + log/return `retracted`). NEW `verify_notif_retract.mjs`. MOD `run_tests.mjs`, `config.js` v6.49, `index.html` `?v=20260816` (65 refs).
- **✅ Decision**: (a) chỉ thu hồi **due-types** — `created`/`closed` là sự kiện 1 lần, giữ nguyên. (b) **retract = mark-read** (set ReadTs), KHÔNG xóa dòng → giữ dấu vết; `_notifPurge_` dọn sau 30 ngày như cũ. (c) KHÔNG lọc live-state trong `notifRead` (mỗi poll 15' → tránh đọc lại toàn bộ entity, nghịch tuning S72); 2 tầng real-time + daily đã phủ. Gap nhỏ: task đóng NGOÀI app chỉ sạch ở lần scan kế (chấp nhận). (d) bump `DATA_VER` khi có thu hồi → chuông client lấy bản sạch ở batch kế.
- **✅ Test**: `verify_notif_retract.mjs` **19/19** — nạp **NGUYÊN VĂN** `NotificationService.gs` vào sandbox Node (`new Function` + stub SpreadsheetApp/Utilities/MailApp/entity-readers + fake sheet) → chạy **hàm GAS THẬT** (không port tay → không drift): live-state phân loại task/dev/milestone, retract done/missing, giữ task mở, bỏ created/read-sẵn, real-time onWrite close, tích hợp `notifScan` (retracted=2 + bump). `verify_notifications` (UI) **21/21** không đổi. GAS parse OK (qua sandbox eval).
- **⛔ Blocker**: Không. ✅ **GAS đã redeploy (user, link KHÔNG đổi).** Tầng scan chỉ cần Save code; tầng real-time (`notifOnWrite` trong `doPost`) cần redeploy — đã xong.
- **➡️ Next step**: (1) (GAS editor) `notifRetractStalePreview()` soi số nhắc stale → `notifScan()` chạy tay 1 lần dọn backlog ngay (không chờ trigger 8h). (2) Hard-reload → badge `v6.49`; đóng 1 task đang có nhắc overdue → chuông + digest kế **hết** nhắc task đó. (3) (nợ) điền Email `User_Master` cho digest.

### PRJ-AIUS — ai-usecase-platform
*Quản trị AI use-case (SPTD)*

**Session: 2026-08-02**
- **Scope:** (1) Đồng bộ duyệt milestone với duyệt US — xem chi tiết toàn cảnh trước khi duyệt; (2) Link demo bấm được trong mọi popup duyệt/chi tiết US; (3) Fix triệt để lỗi link demo dài (ổ chung) làm hỏng tạo US.
- **Version:** 3.15.0
- **Status:** ✅ **LIVE** — GAS deployed (URL không đổi), FE pushed `main` (`fc894b5`), feature branch merged + deleted. Đúng thứ tự GAS→FE. Chờ smoke test live.

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
