# PORTFOLIO — Danh mục dự án (AI OS Registry)

> **Điểm vào duy nhất** cho toàn bộ dự án coding. Mô hình **Hub-and-Spoke**: context sống trong repo mỗi dự án (`AI_CONTEXT/`); AIOS giữ **thẻ mỏng** trỏ về (`04_Knowledge/projects/PRJ-*.md`) + bảng này. Không copy nội dung → một nguồn sự thật.
>
> Cập nhật: 2026-08-17 · ID: `PRJ-<MÃ>` (xem `02_Rules/naming-convention.md`).
>
> 🔄 **Trạng thái mới nhất mỗi dự án (tự sinh):** `00_System/PORTFOLIO_DIGEST.md` — chạy `node 03_Skills/portfolio-digest/digest.js` để làm mới (đọc handover + git mỗi repo).

## Bảng danh mục (đang hoạt động — 4)

| ID | Dự án | Vai trò | Trạng thái | Local (`D:\Workspace\Production\…`) | Context | Chuẩn hoá |
|---|---|---|---|---|---|---|
| [PRJ-SHTD](../04_Knowledge/projects/PRJ-SHTD.md) | SHTD-Dashboard | Hệ tác nghiệp Khối KHDN (AIOS đọc từ đây) | active | `SHTD-Dashboard` | `AI_CONTEXT/` | ✅ đạt |
| [PRJ-AIUS](../04_Knowledge/projects/PRJ-AIUS.md) | ai-usecase-platform | Quản trị AI use-case (SPTD) | active | `ai-usecase-platform` | `AI_CONTEXT/` | ✅ đạt (nhánh docs/v3.15.0) |
| [PRJ-LOG](../04_Knowledge/projects/PRJ-LOG.md) | Logistics-Dashboard | Báo cáo chi phí logistics (CEO) | active | `Logistics-Dashboard` | `AI_CONTEXT/` + `context/` | ✅ đạt (2 tầng cố ý) |
| [PRJ-NOXH](../04_Knowledge/projects/PRJ-NOXH.md) | NOXH | Legal Knowledge Graph NOXH (sản phẩm) | active | `NOXH` | `AI_CONTEXT/` | ✅ đạt (ROADMAP≈TODO) |
<!-- init-project:portfolio-active (script chèn dòng dự án mới NGAY TRÊN dòng này) -->

**Chú giải chuẩn hoá:** ✅ đạt khung · ⚠ gap nhỏ additive · ⏸ hoãn (repo đang làm dở).

## Đã loại — `D:\Workspace\Dự án lỗi` (2026-08-17)
| ID | Dự án | Lý do | Thay thế bởi |
|---|---|---|---|
| [PRJ-LGD](../04_Knowledge/projects/PRJ-LGD.md) | LG Dashboard | Bản cũ của Logistics-Dashboard | PRJ-LOG |
| [PRJ-NOXHHACK](../04_Knowledge/projects/PRJ-NOXHHACK.md) | NOXH Hackathon | Bản dự thi, đã sản phẩm hoá | PRJ-NOXH |

## Quan hệ chính
- **AIOS ⟵ đọc metadata ⟵ PRJ-SHTD** (skill `weekly-report`, qua GAS). PRJ-SHTD là *nguồn tác nghiệp* trong kiến trúc AIOS.
- **PRJ-AIUS ⇄ AIOS** — cùng chủ đề quản trị AI, có thể chia sẻ chuẩn.
- (lịch sử) PRJ-LGD→PRJ-LOG · PRJ-NOXHHACK→PRJ-NOXH — đã loại, xem mục trên.

## Chuẩn hoá — ✅ HOÀN TẤT (2026-08-17)
> P2 dedup: ✅ [TT] loại LG Dashboard & NOXH Hackathon sang `Dự án lỗi`.
> P3: cả 4 dự án active đạt khung — SHTD/LOG sẵn đạt (LOG 2 tầng cố ý, giữ) · NOXH +PROJECT_STATE (`bf81743`) · AIUS đổi `ai_context`→`AI_CONTEXT` (`e377098`, nhánh docs/v3.15.0).

- **P4 ✅ XONG (2026-08-17):** skill `03_Skills/portfolio-digest/` — đọc-only delta `SESSION_HANDOVER` + git từng repo → tự sinh `00_System/PORTFOLIO_DIGEST.md`. Chạy `node 03_Skills/portfolio-digest/digest.js`.

## Khung tối thiểu (mọi dự án)
Thư mục **`AI_CONTEXT/`** (in hoa), 5 file bắt buộc: `PROJECT_OVERVIEW.md` · `SESSION_HANDOVER.md` · `PROJECT_STATE.md` · `TODO_NEXT.md` · `TECH_DEBT.md`. File chuyên biệt (BUSINESS_FLOW, DATA_MODEL, DESIGN_SYSTEM, DECISIONS_LOG…) là mở rộng tuỳ chọn, đặt cùng chỗ. Mẫu: `00_System/templates/AI_CONTEXT_TEMPLATE/`.
