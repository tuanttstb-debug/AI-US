---
id: SKILL-portfolio-digest
type: skill
title: Portfolio Digest — gom trạng thái đa dự án
owner: PER-TTT
version: 1
updated: 2026-08-17
---

# Portfolio Digest

Tự gom **trạng thái mới nhất** của các dự án active (Hub-and-Spoke registry) vào 1 chỗ để nhìn nhanh không phải mở từng repo. Phase 4 của quy hoạch tri thức đa dự án (xem `00_System/PORTFOLIO.md`).

## Làm gì
Với mỗi dự án trong `projects.json`, đọc **đọc-only**:
- `AI_CONTEXT/SESSION_HANDOVER.md` → trích **delta mới nhất** (heading đầu + vài dòng đầu).
- `git log -1` → commit gần nhất (ngày · hash · subject); `rev-parse` → nhánh; `status --porcelain` → số file dirty.

Xuất **`00_System/PORTFOLIO_DIGEST.md`** (tự sinh — KHÔNG sửa tay): bảng nhanh + chi tiết delta mỗi dự án.

## Chạy
```
node 03_Skills/portfolio-digest/digest.js
```

## An toàn
- **Chỉ đọc** trên repo Production (đọc file + `git` read-only). Không ghi, không commit, không đổi nhánh các repo đó.
- Chỉ file **duy nhất** bị ghi là `00_System/PORTFOLIO_DIGEST.md` trong AIOS.
- Không đưa dữ liệu khách hàng: nguồn là handover metadata dự án, không phải dữ liệu tác nghiệp (RULE-data-boundary).

## Cấu hình — `projects.json`
Mảng `projects[]`: `id` (PRJ-*), `name`, `folder` (dưới `../Production/`), `role`. Đường dẫn handover cố định `AI_CONTEXT/SESSION_HANDOVER.md` (đồng nhất sau chuẩn hoá 2026-08-17). Thêm dự án mới → thêm 1 mục ở đây.

## Giới hạn (nợ nhẹ)
- Trích delta bằng heuristic "heading cấp ≥2 đầu tiên + ≤6 dòng" — mỗi repo viết handover khác nhau nên đôi khi tách chưa gọn. Chấp nhận cho bản digest.
- Chạy thủ công; có thể lên lịch/hook sau nếu cần bảng luôn mới.
