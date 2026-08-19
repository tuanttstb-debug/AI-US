---
id: PRJ-SG
type: project-card
title: Smart Guarantee — Nền tảng AI xử lý & sinh thư bảo lãnh (PoC/Demo TPBank)
status: active
owner: PER-TTT
tags: [guarantee, bao-lanh, ai, dify, document-understanding, poc, gas]
related: [SYS-BLOL, SYS-TPBANK, REF-TPBANK-DELIVERY, PRJ-SHTD, PER-TTT]
created: 2026-08-17
updated: 2026-08-17
version: 4
source: https://github.com/tuanttstb-debug/Smart-Guarantee.git
---

## Một dòng
**PoC/Demo cho TPBank.** Trọng tâm: nhận **thư bảo lãnh KH tự upload** → **bóc tách khung mẫu vs biến** → **trả thư soạn sát thư KH** (biến nhận diện/điền được). Không chỉ chọn 1 template TPBank. Kế thừa nghiệp vụ `SYS-BLOL`. Chưa production.

## Con trỏ (nguồn sự thật nằm ở repo)
- **Local:** `D:\Workspace\Production\Smart Guarantee` (nhánh `main`, git init local — **remote chưa tạo**).
- **Context:** `AI_CONTEXT/` — 5 lõi + **DESIGN_SYSTEM** + 9 doc thiết kế: `SYSTEM_ARCHITECTURE`, `DATA_MODEL`, `TEMPLATE_SELECTION`, `VARIABLE_SEGMENTATION`, `TPB_VARIABLES`, `DIFY_WORKFLOW`, `API_CONTRACT`, `DRIVE_STRUCTURE`, `DOCX_GENERATOR`. Nguồn tham khảo: `Tham khao/` (Logic hiển thị.xlsx + 96 mẫu offline + `B8ZB/` 221 mẫu online). Brief: `Prompt mo dau.MD`/`Tổng quan.MD`. + `CLAUDE.md` bootstrap.
- **Repo (dự kiến):** https://github.com/tuanttstb-debug/Smart-Guarantee.git

## Phạm vi & kiến trúc (đã chốt 2026-08-17)
- **Phạm vi:** nghiệp vụ **Phát hành**; **6 loại BL** (BLDT/BLBH/BLTH/BLTU/BLTT/BLKH); bộ mẫu TPB/**TT22**/**TT07/TT40**/EVN/VIT/MK. **BLDT online (B8ZB)** theo vòng đời thông tư TT06-07→TT22→TT40→**TT79** *(TT79 chỉ áp BLDT, Bộ KH&ĐT → Bộ Tài chính; classify cả 4, sinh chỉ TT79)*. Nhận diện **9 chiều** (+circular/quy trình cho BLDT).
- **Hai hệ biến:** online B8ZB dùng `$ND` (MERGEFIELD, `TPB_VARIABLES.md`); offline/KH dùng `[...]` + segmentation. PoC hỗ trợ cả hai theo route.
- **Kiến trúc:** FE HTML+Bootstrap (5-tab) · **GAS gateway** · **Dify Workflow** (classify → **segment khung/biến** → extract → normalize → map biến → validate) · Google Sheet (config, TEMPLATE_REGISTRY từ offline+B8ZB) · Google Drive. Configuration-driven.

## Quan hệ
- **UI/UX** giữ nhận diện `PRJ-SHTD` ("TPBank BIZ" tím-first) nhưng Bootstrap 5-tab, bỏ dashboard — xem `AI_CONTEXT/DESIGN_SYSTEM.md`.
- **Nghiệp vụ** tham chiếu `SYS-BLOL` (Bảo lãnh online).

## Chuẩn hoá
- ✅ Khởi tạo + **chốt phạm vi/kiến trúc**, dựng đủ bộ context thiết kế (2026-08-17).
- ⏳ Tạo GitHub remote. **[CHỜ NỘI DUNG]** dữ liệu thực: danh mục biến ND, rule thời hạn, tập template chính thức, bộ test.
