# PORTFOLIO — Danh mục dự án (AI OS Registry)

> **Điểm vào duy nhất** cho toàn bộ dự án coding. Mô hình **Hub-and-Spoke**: context sống trong repo mỗi dự án (`AI_CONTEXT/`); AIOS giữ **thẻ mỏng** trỏ về (`04_Knowledge/projects/PRJ-*.md`) + bảng này. Không copy nội dung → một nguồn sự thật.
>
> Cập nhật: 2026-08-17 · Chuẩn khung: `03_Skills/context-standard/` (đang dựng) · ID: `PRJ-<MÃ>` (xem `02_Rules/naming-convention.md`).

## Bảng danh mục

| ID | Dự án | Vai trò | Trạng thái | Local (`D:\Workspace\Production\…`) | Context | Chuẩn hoá |
|---|---|---|---|---|---|---|
| [PRJ-SHTD](../04_Knowledge/projects/PRJ-SHTD.md) | SHTD-Dashboard | Hệ tác nghiệp Khối KHDN (AIOS đọc từ đây) | active | `SHTD-Dashboard` | `AI_CONTEXT/` | ✅ đạt |
| [PRJ-AIUS](../04_Knowledge/projects/PRJ-AIUS.md) | ai-usecase-platform | Quản trị AI use-case (SPTD) | active | `ai-usecase-platform` | `ai_context/` | ⚠ đổi hoa + gom root .md |
| [PRJ-LOG](../04_Knowledge/projects/PRJ-LOG.md) | Logistics-Dashboard | Báo cáo chi phí logistics (CEO) | active | `Logistics-Dashboard` | `AI_CONTEXT/` + `context/` | ⚠ gom 2 nơi |
| [PRJ-LGD](../04_Knowledge/projects/PRJ-LGD.md) | LG Dashboard | Dashboard logistics (**nghi bản cũ**) | draft | `LG Dashboard` | `ai_context/` | ⛔ chờ dedup |
| [PRJ-NOXH](../04_Knowledge/projects/PRJ-NOXH.md) | NOXH | Legal Knowledge Graph NOXH (sản phẩm) | active | `NOXH` | `AI_CONTEXT/` | ⚠ thiếu STATE/TODO |
| [PRJ-NOXHHACK](../04_Knowledge/projects/PRJ-NOXHHACK.md) | NOXH Hackathon | Bản dự thi AI Challenge 2026 | active | `NOXH Hackathon` | `ai_context/` + `docs/` + `knowledge/` | ⚠ 3 nơi |

**Chú giải chuẩn hoá:** ✅ đạt khung · ⚠ cần chuẩn hoá (làm dần khi chạm repo) · ⛔ chờ [TT] quyết.

## Quan hệ chính
- **AIOS ⟵ đọc metadata ⟵ PRJ-SHTD** (skill `weekly-report`, qua GAS). PRJ-SHTD là *nguồn tác nghiệp* trong kiến trúc AIOS.
- **PRJ-LGD ⇄ PRJ-LOG** — nghi trùng (LG là bản cũ). Cần chốt.
- **PRJ-NOXHHACK ⇄ PRJ-NOXH** — bản thi ⇄ sản phẩm hoá. Cần chốt.
- **PRJ-AIUS ⇄ AIOS** — cùng chủ đề quản trị AI, có thể chia sẻ chuẩn.

## Việc chuẩn hoá còn treo (P2–P3)
- **P2 dedup:** [TT] chốt PRJ-LGD (vs PRJ-LOG) và PRJ-NOXHHACK (vs PRJ-NOXH) → archive/gộp.
- **P3 chuẩn khung từng repo** (làm khi có phiên chạm repo, không ép một lượt):
  - `ai_context/` → `AI_CONTEXT/`: PRJ-AIUS, PRJ-LGD, PRJ-NOXHHACK.
  - Gom context về 1 nơi: PRJ-AIUS (root .md), PRJ-LOG (2 nơi), PRJ-NOXHHACK (3 nơi).
  - Bổ sung file khung tối thiểu còn thiếu: PRJ-NOXH (STATE/TODO).
- **P4 (tuỳ chọn):** skill AIOS gom "portfolio digest" — đọc delta mới nhất `SESSION_HANDOVER` từng repo → cập nhật bảng này tự động.

## Khung tối thiểu (mọi dự án)
Thư mục **`AI_CONTEXT/`** (in hoa), 5 file bắt buộc: `PROJECT_OVERVIEW.md` · `SESSION_HANDOVER.md` · `PROJECT_STATE.md` · `TODO_NEXT.md` · `TECH_DEBT.md`. File chuyên biệt (BUSINESS_FLOW, DATA_MODEL, DESIGN_SYSTEM, DECISIONS_LOG…) là mở rộng tuỳ chọn, đặt cùng chỗ. Mẫu: `00_System/templates/AI_CONTEXT_TEMPLATE/`.
