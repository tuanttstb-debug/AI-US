# AI_CONTEXT — Khung chuẩn (mẫu)

Sao thư mục này thành `AI_CONTEXT/` ở gốc mỗi repo dự án. **5 file bắt buộc** (khung tối thiểu):

| File | Vai trò |
|---|---|
| `PROJECT_OVERVIEW.md` | Thẻ dự án + front-matter `PRJ-<MÃ>`; tóm tắt, phạm vi, quan hệ. |
| `SESSION_HANDOVER.md` | Bàn giao giữa phiên; mỗi phiên thêm 1 "Delta phiên" lên đầu. |
| `PROJECT_STATE.md` | Ảnh chụp trạng thái hiện tại (đã có / đang treo / rủi ro). |
| `TODO_NEXT.md` | Việc kế tiếp theo ưu tiên. |
| `TECH_DEBT.md` | Nợ kỹ thuật, mới nhất trên cùng. |

**File mở rộng tuỳ chọn** (đặt cùng `AI_CONTEXT/`, không rải rác): `BUSINESS_FLOW.md`, `DATA_MODEL.md` / `DATA_CONTRACT.md`, `SYSTEM_ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `DECISIONS_LOG.md`, `OPEN_QUESTION.md`, `CHANGE_LOG.md`…

## Quy ước
- Thư mục **in hoa `AI_CONTEXT/`** (thống nhất toàn danh mục).
- Kèm **`CLAUDE.md`** ở gốc repo (mẫu `00_System/templates/CLAUDE.md`) — để Claude Code tự nạp chuẩn mỗi phiên.
- Front-matter theo `02_Rules/naming-convention.md`.

## Cách nhanh nhất
Đừng copy tay — chạy **`03_Skills/init-project/`** để tự scaffold khung + `CLAUDE.md` **và** đăng ký vào registry (thẻ PRJ + PORTFOLIO + INDEX + projects.json) trong 1 lệnh.
