# TECH DEBT — AI OS

Nợ kỹ thuật & hiện tượng lặp lại. Mới nhất trên cùng.

> **Delta phiên 2026-08-21 #3:** ✅ **Đóng gap "báo cáo gửi trên dữ liệu cũ"** bằng **Freshness guard** (mới **TD-WR-08**). DEBUG `BL1-026` (email 31/07 vs DB 31/08): parser đúng, gốc = snapshot tĩnh cũ → thêm cảnh báo/từ chối khi stale + footer báo thời điểm chốt. Không nợ code mới ở phần chạy (verify tay 4 kịch bản, `node --check` OK). Nợ **dữ liệu** cũ (Email teamlead) vẫn treo — xem delta 08-20.
> **Delta phiên 2026-08-21:** Nợ mới nhẹ **TD-TR-01** (deck M3 Growth chưa đồng bộ nhận diện TPBank — teal, trong khi M1/M2/M4 đã chuẩn TPBank qua skill `tpbank-deck`). Skill tpbank-deck **chưa gói bộ icon** (template gốc không nhúng icon raster). Không nợ code ở phần chạy (thư viện thuần dựng file, verify render 6/6 layout). Bản in member/summary còn ở dạng HTML (chưa PDF).
> **Delta phiên 2026-08-20:** ✅ **TD-WR-07 (phần người nhận hardcode) GIẢI QUYẾT** — chuyển sang sheet cấu hình `Report_Config` (đọc động, fallback hằng số), đổi người nhận không cần deploy. Còn lại của TD-WR-07: chỉ phần **định kỳ dựa scheduled task local** (chưa always-on cloud). Không nợ code mới (verify 10/10 hàm GAS thật). Nợ **dữ liệu** (không phải code): User_Master thiếu Email cho vài teamlead — xem SESSION_HANDOVER.
> **Delta phiên 2026-08-19 #2:** Feature gửi báo cáo email (SHTD) — nợ mới nhẹ **TD-WR-07** (định kỳ dựa vào scheduled task local, chưa always-on server-side; cấu hình người nhận hardcode trong `ReportEmailService.gs`). Không nợ ở phần code (verify 7/7 hàm GAS thật).
> **Delta phiên 2026-08-19:** Không phát sinh nợ kỹ thuật mới (phiên thuần tài liệu/tri thức). Nợ tài liệu nhẹ: **TD-KB-01** — tri thức TPBank có mục **[OPEN]** chờ dữ liệu thực; SYS-GNOL/SYS-BLOL còn "chờ bổ sung".
> **Delta phiên 2026-08-17:** ✅ **TD-WR-02 GIẢI QUYẾT** (map cột `aggregate.js` theo header-name). Nợ mới nhẹ: **TD-PD-01** (portfolio-digest chạy tay + heuristic) · **TD-IP-01** (init-project không tự tạo git/remote & không auto-commit — chủ ý an toàn, thao tác thủ công còn lại).

## TD-TR-01 — Deck Growth lệch nhận diện + tpbank-deck thiếu icon (2026-08-21)
Chương trình `training-program/`: deck **M1/M2/M4** đã dựng chuẩn TPBank qua skill `tpbank-deck`, nhưng **deck M3 Growth** (`03_growth/06_slides/GROWTH-Mindset-Workshop.pptx`) vẫn màu **teal** cũ → lệch nhận diện khi trình chiếu cả chương trình. Skill `tpbank-deck` **chưa gói bộ icon** (template gốc chỉ dùng shape vector/SmartArt, không nhúng icon raster). Bản in member + tóm tắt còn ở **HTML** (chưa PDF sẵn). **Hướng (tuỳ chọn):** rebrand deck Growth bằng `tpbank-deck`; thêm bộ icon (shape/emoji/vector) vào skill; export PDF bản in. Ưu tiên thấp — không chặn việc dạy.

## ✅ TD-WR-08 — Báo cáo có thể build/gửi trên snapshot cũ (2026-08-21 #3 → có Freshness guard)
Pipeline `weekly-report` đọc **snapshot tĩnh** `00_System/cache/gas_snapshot.json` (do `fetch_gas.js` chốt), KHÔNG live tại lúc aggregate → nếu snapshot cũ (hoặc chạy `--cache`), email/.docx phản ánh dữ liệu **quá khứ**. Đây là gốc vụ `BL1-026` hiện deadline **31/07** (lúc snapshot chốt) trong khi DB đã sửa **31/08** — *không phải lỗi parse* (đã chứng minh `parseVNDate`/`fmtDMY` đúng + fetch LIVE khớp DB). **Đã thêm guard (2026-08-21 #3):** `checkFreshness()` trong `aggregate.js` (stale nếu >`MAX_SNAPSHOT_AGE_HOURS`=12h **hoặc** `fetchedAt` trước Thứ 2 tuần BC) → **cảnh báo** khi chạy tay, **throw/exit 1** khi `REPORT_REQUIRE_FRESH=1`; `run.js --send` bật cờ đó + **cấm `--cache --send`**; footer email/.docx đổi "đọc LIVE" (giả) → **"dữ liệu chốt lúc <fetchedAt>"** + banner đỏ khi stale. **Residual (thấp):** ngưỡng 12h là heuristic (rebuild hợp lệ >12h cùng tuần vẫn warn — chấp nhận, chỉ chặn khi `--send`); pipeline vẫn snapshot-based (không live-per-read, theo tuning "1 nguồn"). Verify tay: fresh→pass; stale→warn; stale-strict→refuse; cache+send→block.

## TD-WR-07 — Gửi báo cáo email: định kỳ dựa scheduled task local (2026-08-19 → phần người nhận GIẢI QUYẾT 2026-08-20)
Tính năng `send-report` gửi qua GAS `MailApp` (server-side), nhưng **kích hoạt định kỳ** lại dựa vào **Windows scheduled task trên máy [TT]** chạy `run.js --send` (build HTML ở AIOS/Node) → không "always-on" như trigger GAS: máy tắt/không chạy task thì không gửi. **Hướng (tuỳ chọn):** nếu cần always-on cloud → port build sang GAS + `ScriptApp` time-trigger (đánh đổi: nhân đôi logic aggregate, xem quyết định phiên 2026-08-19 #2). Ưu tiên thấp — cadence thứ 6 hiện đủ dùng.
- ✅ **Người nhận hardcode — GIẢI QUYẾT (2026-08-20):** ~~To/CC-role hardcode trong `ReportEmailService.gs`, đổi phải sửa code + redeploy.~~ Đã đưa vào **sheet `Report_Config`** (`_reportConfig_()` đọc động; `setupReportConfig()` tạo sheet; fallback hằng số nếu sheet vắng nên không vỡ). Đổi To/Cc/Enabled/From_Name = chỉnh sheet, **không deploy**. Verify SR8–10 (10/10 tổng).

## TD-KB-01 — Tri thức TPBank còn mục [OPEN] + SYS-GNOL/BLOL chưa đầy đủ (2026-08-19)
`04_Knowledge/products/SYS-TPBANK.md` + `references/REF-TPBANK-DELIVERY.md` mới lập, còn nhiều **[OPEN]** chờ dữ liệu thực: đầu mối IT/OP (PER-*), cơ chế auth API, chiến lược môi trường/DR, go-live authority. Thẻ `SYS-GNOL`/`SYS-BLOL` vẫn phần lớn "chờ bổ sung" dù đã có tri thức nghiệp vụ dùng được. **Hướng:** làm giàu dần khi chạm dự án TPBank thật (dùng pre-flight checklist `REF-TPBANK-DELIVERY §8` để đóng [OPEN]); backfill SYS-GNOL/BLOL từ tri thức đã có. Ưu tiên thấp — không chặn việc.

## TD-IP-01 — init-project để lại git init/remote/commit cho thủ công (2026-08-17)
Skill `03_Skills/init-project/` scaffold file + đăng ký registry nhưng **không** `git init` repo đích, **không** tạo GitHub remote, **không** tự commit (chủ ý: an toàn, người dùng review). Hệ quả: onboard xong vẫn cần vài thao tác tay (git init nếu chưa; tạo remote; commit 2 repo). VD PRJ-SG hiện chỉ local, chưa remote. **Hướng (tuỳ chọn):** cờ `--git-init`/`--gh-create` để tự lo phần git khi [TT] muốn. Ưu tiên thấp — thủ công hiện chấp nhận được.

## TD-PD-01 — portfolio-digest chạy thủ công + tách delta bằng heuristic (2026-08-17)
Skill `03_Skills/portfolio-digest/digest.js` (Phase 4) sinh `PORTFOLIO_DIGEST.md` **chỉ khi chạy tay** `node digest.js` → bảng có thể cũ nếu quên chạy. Việc tách "delta mới nhất" dùng heuristic "heading cấp ≥2 đầu tiên + ≤6 dòng"; mỗi repo viết handover khác nhau nên đôi khi tách chưa gọn (vd AIUS chỉ ra "Session: 2026-08-02"). **Hướng:** (a) lên lịch/hook chạy định kỳ; (b) chuẩn hoá 1 dòng "delta mới nhất" đầu handover để tách chính xác. Ưu tiên thấp — bản digest chấp nhận được.

## TD-WR-06 — Trùng lặp logic dựng báo cáo giữa build_email.js và build_report.js (2026-08-16)
Hai builder (`build_email.js` → HTML, `build_report.js` → .docx) tự dựng lại `areaBlock`/format (helper `fmtTy`, `short`, `shortT`, note theo `kind`) từ cùng `report_data.json` theo 2 cách khác nhau. Sửa nội dung/thứ tự 1 mảng phải sửa **2 nơi** → dễ lệch giữa 2 bản. **Hướng:** tách helper/format & "shape" mảng thành module chung (vd `report_shape.js`) để 2 builder dùng chung, mỗi builder chỉ lo phần render. Ưu tiên thấp–trung bình.

## TD-WR-05 — HTML email chưa nghiệm thu trên email client thật (2026-08-16)
`build_email.js` dùng KPI tiles `inline-block` + media query `≤480px`. Đã render OK trên trình duyệt khổ hẹp, **chưa test client thật** (Gmail app, Outlook mobile/desktop, Apple Mail). Rủi ro đã biết: Outlook desktop (Word engine) bỏ `inline-block/min-width` → tiles rơi 1 cột (chấp nhận được); vài client lọc `<style>` → mất media query nhưng base layout vẫn 1 cột fluid. **Hướng:** gửi thử vài client, tinh chỉnh nếu vỡ; cân nhắc bố cục tiles bằng bảng 2 cột cho chắc trên Outlook. Trung bình tới khi nghiệm thu.

## TD-WR-04 — .docx bị khoá file khi đang mở trên Windows (EBUSY) (2026-08-16)
`build_report.js` ghi đè trực tiếp file `.docx`; nếu file đang mở trong Word/preview → `EBUSY: resource busy or locked`, pipeline lỗi ở bước build_report (build_email đã xong nên **HTML vẫn ra**). **Xử lý tạm:** đóng file rồi `node run.js --cache`. **Hướng trả nợ:** ghi ra file tạm rồi `rename` (atomic), hoặc bắt EBUSY và báo thân thiện "đóng .docx rồi chạy lại". Ưu tiên thấp.

## TD-WR-03 — Report artifacts không có lịch sử trên Git (2026-08-14)
`.docx` báo cáo + `report_data.json` chứa tên KH → gitignore, chỉ local. Hệ quả: không có lịch sử báo cáo các kỳ trên GitHub; máy khác phải dựng lại từ live. Nếu cần lưu vết → cân nhắc repo private riêng cho reports, hoặc bản redact tên KH để commit. Ưu tiên thấp.

## ✅ TD-WR-02 — aggregate.js hardcode index cột theo schema (2026-08-14 → GIẢI QUYẾT 2026-08-17)
~~`aggregate.js` map cột Task/Initiative/Case bằng CHỈ SỐ (C/I/K) theo schema Dashboard hiện tại.~~ **Đã sửa (2026-08-17):** thêm `buildCols(header, spec, fallback, label)` dò index cột theo **regex trên header row** cho cả Task/Initiative/Case/Dev (`*_SPEC`), gán C/I/K/DV trong `main()` từ header cache. Không khớp → **fallback index mặc định** (`*_DEFAULT`, = bản cứng cũ nên không bao giờ tệ hơn) + `console.warn`. Verify: chạy lại ra đúng số kỳ W34, 0 cảnh báo; giả lập chèn cột giữa → resolver remap đúng (index cứng cũ lệch +1). Còn lại: cột rác `[25]` timestamp trong Task_Master vẫn bị bỏ qua tự nhiên (không map tới).

## TD-WR-01 — Classifier phân 5 mảng bằng heuristic (2026-08-14)
Phân task vào 5 mảng bằng regex keyword + team + category (`classifyTask` trong `aggregate.js`), vì nguồn không có trường "mảng báo cáo" chuẩn. Rủi ro xếp nhầm task biên khi tên/category thay đổi. **Hướng trả nợ:** chốt taxonomy chuẩn tại Dashboard (thêm cột phân loại mảng, hoặc chuẩn hoá Category/Initiative) để phân loại xác định thay vì đoán. Đã rà tay kỳ W33; chấp nhận tạm. Trung bình.

## TD-GIT-01 — Lock git stale chặn commit (2026-08-03)
**Hiện tượng:** Commit vướng `.git/index.lock` rồi `.git/HEAD.lock` (`fatal: Unable to create ... lock: File exists`). Gặp cả từ Cowork sandbox lẫn Claude Code khi một lần commit trước bị gián đoạn giữa chừng.

**Nguyên nhân:** Lock stale để lại sau thao tác git bị ngắt; KHÔNG do tiến trình git đang chạy. Hai tiến trình `git.exe` thấy trong session chỉ là `fsmonitor--daemon` (theo dõi filesystem), không giữ lock.

**Cách xử lý an toàn:**
1. Kiểm tra tiến trình git thật đang chạy: `Get-CimInstance Win32_Process -Filter "Name='git.exe'" | Select ProcessId, CommandLine`.
2. Nếu chỉ có `fsmonitor--daemon` → lock là stale, an toàn xoá: `rm -f .git/index.lock .git/HEAD.lock`.
3. KHÔNG kill tiến trình git khi chưa xác minh; KHÔNG xoá lock nếu đang có commit/merge/rebase thật chạy.

**Nợ còn lại (chưa làm):** Cân nhắc tắt `core.fsmonitor` cho repo này nếu lock tái diễn, hoặc thêm script pre-commit dọn lock stale. Ưu tiên thấp — chỉ xử lý nếu lặp lại.
