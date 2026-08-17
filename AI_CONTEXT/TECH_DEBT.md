# TECH DEBT — AI OS

Nợ kỹ thuật & hiện tượng lặp lại. Mới nhất trên cùng.

> **Delta phiên 2026-08-17:** ✅ **TD-WR-02 GIẢI QUYẾT** (map cột `aggregate.js` theo header-name). Nợ mới nhẹ: **TD-PD-01** (portfolio-digest chạy tay + heuristic) · **TD-IP-01** (init-project không tự tạo git/remote & không auto-commit — chủ ý an toàn, thao tác thủ công còn lại).

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
