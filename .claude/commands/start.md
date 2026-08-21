---
description: Bắt đầu phiên trên AIOS (repo hub) — nạp đúng context theo cấu trúc đặc thù
argument-hint: (không cần tham số)
---

# Bắt đầu phiên — AIOS (repo HUB, cấu trúc đặc thù)

> AIOS **không phải** dự án spoke thường. Đây là **registry/hub**: có 8 lớp `0X_*` + `AI_CONTEXT/` riêng. `AI_CONTEXT/` ở đây **KHÔNG có `PROJECT_OVERVIEW.md`** (khác template spoke) — kiến trúc nằm ở `SYSTEM_ARCHITECTURE_CURRENT.md` + `PROJECT_STATE.md`. Đừng áp read-order của spoke.

Thực hiện tuần tự:

## 1. Đồng bộ
- `git pull` (nhánh mặc định **master**; remote GitHub tên `AI-US` — khác tên folder, không sửa).

## 2. Đọc context lõi — ĐÚNG THỨ TỰ (delta mới nhất nằm TRÊN CÙNG)
1. `AI_CONTEXT/PROJECT_STATE.md` — trạng thái + version + các Delta gần nhất.
2. `AI_CONTEXT/SESSION_HANDOVER.md` — **đọc delta trên cùng trước** (6 trường: task completed · files changed · decision · blocker · next step · regression risk).
3. `AI_CONTEXT/TODO_NEXT.md` — ưu tiên (mục **Cao** + Delta mới nhất). Owner: `[CC]`=Claude Code · `[TT]`=Tuân · `[CW]`=Cowork.
4. `AI_CONTEXT/TECH_DEBT.md` — nợ đang mở (mới nhất trên cùng, các `TD-*`).
5. `AI_CONTEXT/SYSTEM_ARCHITECTURE_CURRENT.md` — chỉ khi cần bức tranh kiến trúc.

## 3. Chỉ mở thêm khi việc chạm tới (KHÔNG quét toàn repo)
- **Registry / danh mục dự án:** `00_System/INDEX.md` (mục lục) · `00_System/PORTFOLIO.md` · `PORTFOLIO_DIGEST.md`.
- **Skill:** `03_Skills/<tên>/SKILL.md` (weekly-report · portfolio-digest · init-project · tpbank-deck · deadline/decision-brief · intake-triage).
- **Tri thức:** `04_Knowledge/` — `products/SYS-*` · `references/REF-*` · `projects/PRJ-*` · `people/PER-*`.
- **Quy tắc:** `02_Rules/` (data-boundary, naming-convention, collaboration-protocol, reporting-rules).
- **Kết nối GAS:** `06_Tools/connectors/gas.md`.

## 4. Luật bắt buộc của repo này
- **Data-boundary:** KHÔNG đưa dữ liệu khách hàng (tên KH, secret) lên cloud/GitHub. Báo cáo `.docx/.html`, `report_data.json`, `cache`, `.gas-secret.json` **đã gitignore** — không commit.
- **Commit chỉ khi được yêu cầu.** Không skip hook. Kết phiên → dùng `/handover`.
- **GAS live** (gửi email / batch-read) phải chạy ở **Claude Code/máy thật** (sandbox Cowork không POST URL ngoài).
- Nếu vướng `.git/index.lock` stale: xác minh chỉ có `fsmonitor--daemon` chạy → `rm -f .git/index.lock .git/HEAD.lock` (xem `TECH_DEBT.md` TD-GIT-01).

## 5. Kết
Tóm tắt cho tôi **3–5 dòng**: (a) trạng thái hiện tại, (b) **ưu tiên #1** đang chờ (kèm owner), (c) blocker nào đang chặn, (d) đề xuất việc nên làm trước. Rồi chờ tôi xác nhận (đừng tự chạy nếu ưu tiên #1 thuộc `[TT]`).
