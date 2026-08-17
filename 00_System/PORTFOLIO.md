# PORTFOLIO — Danh mục dự án (AI OS Registry)

> **Điểm vào duy nhất** cho toàn bộ dự án coding. Mô hình **Hub-and-Spoke**: context sống trong repo mỗi dự án (`AI_CONTEXT/`); AIOS giữ **thẻ mỏng** trỏ về (`04_Knowledge/projects/PRJ-*.md`) + bảng này. Không copy nội dung → một nguồn sự thật.
>
> Cập nhật: 2026-08-17 · Chuẩn khung: `03_Skills/context-standard/` (đang dựng) · ID: `PRJ-<MÃ>` (xem `02_Rules/naming-convention.md`).

## Bảng danh mục (đang hoạt động — 4)

| ID | Dự án | Vai trò | Trạng thái | Local (`D:\Workspace\Production\…`) | Context | Chuẩn hoá |
|---|---|---|---|---|---|---|
| [PRJ-SHTD](../04_Knowledge/projects/PRJ-SHTD.md) | SHTD-Dashboard | Hệ tác nghiệp Khối KHDN (AIOS đọc từ đây) | active | `SHTD-Dashboard` | `AI_CONTEXT/` | ✅ đạt |
| [PRJ-AIUS](../04_Knowledge/projects/PRJ-AIUS.md) | ai-usecase-platform | Quản trị AI use-case (SPTD) | active | `ai-usecase-platform` | `ai_context/` | ⏸ đổi hoa (repo đang làm dở) |
| [PRJ-LOG](../04_Knowledge/projects/PRJ-LOG.md) | Logistics-Dashboard | Báo cáo chi phí logistics (CEO) | active | `Logistics-Dashboard` | `AI_CONTEXT/` + `context/` | ✅ đạt (2 tầng cố ý) |
| [PRJ-NOXH](../04_Knowledge/projects/PRJ-NOXH.md) | NOXH | Legal Knowledge Graph NOXH (sản phẩm) | active | `NOXH` | `AI_CONTEXT/` | ✅ đạt (ROADMAP≈TODO) |

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

## Việc chuẩn hoá còn treo (P3)
> P2 dedup: ✅ XONG (2026-08-17) — [TT] loại LG Dashboard & NOXH Hackathon sang `Dự án lỗi`.
> Khảo sát P3 (2026-08-17) đã điều chỉnh phạm vi: LOG là 2 tầng **cố ý** (không gộp); NOXH dùng ROADMAP≈TODO (chỉ thiếu STATE); AIUS đang làm dở.

- **PRJ-AIUS** — đổi `ai_context/`→`AI_CONTEXT/` (an toàn về code). **Hoãn** tới khi [TT] gom xong việc dở trên nhánh `docs/v3.15.0-deployed` (12 png dirty + `H2/`), tránh trộn commit. **(việc P3 duy nhất còn lại)**
- **PRJ-NOXH** — ✅ XONG (2026-08-17): thêm `AI_CONTEXT/PROJECT_STATE.md` (commit NOXH `bf81743`).
- **PRJ-LOG / PRJ-SHTD** — ✅ đạt, không cần làm.
- **P4 (tuỳ chọn):** skill AIOS gom "portfolio digest" — đọc delta mới nhất `SESSION_HANDOVER` từng repo → cập nhật bảng này tự động.

## Khung tối thiểu (mọi dự án)
Thư mục **`AI_CONTEXT/`** (in hoa), 5 file bắt buộc: `PROJECT_OVERVIEW.md` · `SESSION_HANDOVER.md` · `PROJECT_STATE.md` · `TODO_NEXT.md` · `TECH_DEBT.md`. File chuyên biệt (BUSINESS_FLOW, DATA_MODEL, DESIGN_SYSTEM, DECISIONS_LOG…) là mở rộng tuỳ chọn, đặt cùng chỗ. Mẫu: `00_System/templates/AI_CONTEXT_TEMPLATE/`.
