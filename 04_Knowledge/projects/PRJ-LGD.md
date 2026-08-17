---
id: PRJ-LGD
type: project-card
title: LG Dashboard — Dashboard logistics (nghi bản cũ)
status: draft
owner: PER-TTT
tags: [dashboard, logistics, legacy-candidate]
related: [PRJ-LOG, PER-TTT]
created: 2026-08-17
updated: 2026-08-17
version: 1
source: https://github.com/tuanttstb-debug/LG-Dashboard.git
---

## Một dòng
"Dashboard Logistic" — Next.js + GAS + OCR service. **Nghi là bản tiền thân của PRJ-LOG (Logistics-Dashboard).**

## Con trỏ (nguồn sự thật nằm ở repo)
- **Local:** `D:\Workspace\Production\LG Dashboard`
- **Context:** `ai_context/` *(cần đổi → `AI_CONTEXT/` nếu giữ)* + `docs/{architecture,flows}` — PROJECT_STATE, SESSION_HANDOVER, TECH_DEBT, TODO_NEXT.
- **Nhánh/last:** `main` · **2026-06-21** (cũ nhất trong danh mục) · 3 file dirty.

## Stack
Next.js + Tailwind + Playwright + `gas/` + `ocr-service/`.

## Quan hệ / Cần chốt (dedup)
- **[TT] xác nhận:** LG Dashboard có phải bản cũ của Logistics-Dashboard? Nếu đúng → **archive** (đổi `status: superseded`, ghi rõ bản thay thế = PRJ-LOG) hoặc gộp phần còn giá trị (OCR service?) sang PRJ-LOG.

## Mở
- Trạng thái sống/chết chưa rõ → giữ `status: draft` tới khi [TT] chốt.
