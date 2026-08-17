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
- **Context:** `AI_CONTEXT/` *(đúng hoa)* **+ `context/`** *(2 nơi — cần gom về 1)* — OVERVIEW, DATA_CONTRACT, SYSTEM_ARCHITECTURE, SOP_DEPLOY, CHANGE_LOG, DECISIONS_LOG…
- **Nhánh/last:** `main` · 2026-08-07 `feat(overhead): safety-net phân loại Overhead`.

## Stack
FE tĩnh (index.html) + backend + config; nguồn dữ liệu Excel/Power Query (ngoài repo web).

## Quan hệ
- **Nghi trùng với PRJ-LGD ("LG Dashboard")** — nhiều khả năng LG là bản cũ, đây là bản hiện hành. Chờ [TT] chốt.

## Mở
- Context nằm 2 chỗ (`AI_CONTEXT/` và `context/`) → gom về `AI_CONTEXT/`.
