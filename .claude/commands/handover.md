---
description: Bàn giao phiên chuẩn cho AIOS — ghi delta 4 file AI_CONTEXT (6 trường) + push
argument-hint: [ghi chú tóm tắt phiên — tuỳ chọn]
---

# Bàn giao phiên — AIOS (chuẩn)

Chuẩn bị bàn giao phiên. **Chỉ ghi DELTA** (không viết lại toàn bộ), **delta mới nhất chèn LÊN TRÊN CÙNG** phần delta của mỗi file. Ghi chú phiên (nếu có): $ARGUMENTS

## Cập nhật 4 file `AI_CONTEXT/`

### 1. `AI_CONTEXT/SESSION_HANDOVER.md` — thêm 1 block delta đủ **6 trường**
Chèn ngay dưới dòng tiêu đề, phía trên delta cũ, theo đúng khuôn hiện có:

```
## Delta phiên (YYYY-MM-DD — <tựa ngắn>, Claude Code)
- **Task completed:** …
- **Files changed:** … (đường dẫn + commit hash nếu đã commit)
- **Decision made:** …
- **Blocker:** … (không có → ghi "không")
- **Next step:** … (kèm owner [TT]/[CC])
- **Regression risk:** … (mức + vì sao; đã verify gì)
```

### 2. `AI_CONTEXT/PROJECT_STATE.md` — thêm 1 mục `## Delta (YYYY-MM-DD, Claude Code)`
2–4 câu: thay đổi trạng thái/khả năng của hệ, commit hash, blocker chính. Cập nhật Version nếu đổi.

### 3. `AI_CONTEXT/TODO_NEXT.md` — thêm 1 mục `## Delta (YYYY-MM-DD, Claude Code)`
Đánh ✅ việc vừa xong; liệt kê việc kế tiếp theo owner `[TT]`/`[CC]`/`[CW]`, ưu tiên trên→xuống.

### 4. `AI_CONTEXT/TECH_DEBT.md` — chỉ khi có nợ mới/đã trả
Thêm dòng tóm ở đầu (`> **Delta phiên YYYY-MM-DD:** …`) và/hoặc block `## TD-<MÃ> — <mô tả> (YYYY-MM-DD)`. Đánh ✅ nợ đã giải quyết. Không có thay đổi nợ → bỏ qua file này.

## Sync-hub (nhịp 5 — khi phiên có chạm dự án spoke)
> Áp dụng `02_Rules/cross-repo-workflow.md`. Bỏ qua mục này nếu phiên chỉ làm trong AIOS.
1. **Ghi 1 dòng** vào `00_System/CROSS_REPO_LOG.md` (mới nhất trên cùng), đúng định dạng:
   `YYYY-MM-DD · <REPO> · <commit> · <tóm tắt> · gốc=<hub|spoke-data|spoke-backend|…> · cross-ref=<Y/N>`
2. **Chạy `portfolio-digest`** (`node 03_Skills/portfolio-digest/digest.js`) → cập nhật `00_System/PORTFOLIO_DIGEST.md` để hub nắm trạng thái spoke.
3. **Cross-ref bắt buộc:** nếu bug/feature có gốc ở spoke → xác nhận `AI_CONTEXT` của **cả** spoke lẫn AIOS đều có liên kết chéo (theo Definition of Done §4 của rule).
4. Nếu gốc ở spoke mà **chưa fix** cùng phiên → xác nhận đã mở `TECH_DEBT` + `TODO` **trong repo spoke** (không chỉ ghi ở hub).

## Quy ước bắt buộc
- **Ngày tuyệt đối** (YYYY-MM-DD), không dùng "hôm nay/tuần trước".
- Giọng ngắn, trực diện; tiếng Việt; owner rõ (`[TT]` Tuân · `[CC]` Claude Code · `[CW]` Cowork).
- **Data-boundary:** KHÔNG commit dữ liệu khách hàng/secret. Trước khi add: kiểm `git status` không lọt `.docx/.html` báo cáo, `report_data.json`, `.gas-secret.json`, `cache/`, `node_modules/`.

## Push Git
1. `git status` + `git diff --stat` — soát file sắp commit (loại artifact/secret ở trên).
2. Stage đúng file thay đổi (AI_CONTEXT + code/tài liệu của phiên).
3. Commit; kết message bằng trailer chuẩn:
   ```
   <mô tả ngắn, tiếng Việt>

   Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
   Claude-Session: <đường dẫn phiên hiện tại>
   ```
4. `git push` lên **origin/master** (quy ước repo hub — đẩy thẳng master). Nếu phiên tạo nhánh riêng thì push nhánh đó + nêu để mở PR.
5. Báo lại: commit hash + danh sách file đã đẩy + xác nhận không lọt secret/artifact.
