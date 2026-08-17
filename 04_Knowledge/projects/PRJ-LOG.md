---
id: PRJ-LOG
type: project-card
title: Logistics-Dashboard — Báo cáo chi phí logistics (CEO)
status: active
owner: PER-TTT
tags: [dashboard, logistics, cost, reporting]
related: [PRJ-LGD, PER-TTT]
created: 2026-08-17
updated: 2026-08-17
version: 1
source: https://github.com/tuanttstb-debug/Logistics-Dashboard.git
---

## Một dòng
Web app nội bộ trình bày **báo cáo chi phí logistics** cho Tổng Giám đốc. Là **tầng dashboard**, chỉ đọc kho đã chuẩn hoá `fact_CostLines`; engine gom/chuẩn hoá vẫn ở Excel + Power Query (`data\Logistics_System.xlsx`).

## Con trỏ (nguồn sự thật nằm ở repo)
- **Local:** `D:\Workspace\Production\Logistics-Dashboard`
- **Context (2 tầng — CỐ Ý, không phải lỗi):**
  - `AI_CONTEXT/` — **context làm việc** (OVERVIEW, DATA_CONTRACT, PROJECT_STATE, SESSION_HANDOVER, SOP_DEPLOY, CHANGE_LOG…). 10 file ở đây **trỏ tới** `context/`.
  - `context/` — **kho tri thức sâu** 15 file đánh số (01_PROJECT_CONTEXT, 10_MODEL_SPEC, 11_BUSINESS_RULES, 12_DATA_DICTIONARY, 30_DECISIONS_LOG, 32_ROADMAP…).
- **Nhánh/last:** `main` · 2026-08-07 `feat(overhead): safety-net phân loại Overhead`.

## Stack
FE tĩnh (index.html) + backend + config; nguồn dữ liệu Excel/Power Query (ngoài repo web).

## Quan hệ
- Bản thay thế của **PRJ-LGD** (LG Dashboard, đã loại 2026-08-17).

## Chuẩn hoá
- ✅ Thư mục `AI_CONTEXT/` đúng chuẩn. **KHÔNG gộp** `context/` vào — đó là kho tri thức 2 tầng có chủ đích; gộp sẽ phá 10 tham chiếu chéo. Chấp nhận như một mở rộng hợp lệ của khung.
