---
description: Nạp context một dự án spoke (đọc 4 file AI_CONTEXT, không quét repo) — nhịp 2 của quy trình xuyên repo
argument-hint: <đường dẫn spoke, vd D:\Workspace\Production\SHTD-Dashboard>
---

# Enter Spoke — nạp context dự án (chuẩn Hub⇄Spoke)

Chuyển ngữ cảnh sang dự án spoke tại: **$ARGUMENTS**

> Áp dụng `02_Rules/cross-repo-workflow.md`. Đây là **nhịp 2** (Enter-spoke). Mục tiêu: nạp đúng context spoke **nhẹ và không quét toàn repo**.

## Thực hiện tuần tự

1. **Xác định repo** tại `$ARGUMENTS`. Nếu trống → hỏi đường dẫn. `git -C "$ARGUMENTS" status` + `git log --oneline -5` để biết nhánh + HEAD + working tree.

2. **Đọc 4 file context — chỉ DELTA TRÊN CÙNG (mới nhất), KHÔNG quét repo:**
   - `AI_CONTEXT/PROJECT_STATE.md` — trạng thái + version + delta trên cùng.
   - `AI_CONTEXT/SESSION_HANDOVER.md` — **đọc block delta trên cùng trước** (6 trường). File có thể rất lớn → chỉ đọc phần đầu, đừng nạp toàn bộ.
   - `AI_CONTEXT/TODO_NEXT.md` — ưu tiên đang chờ + owner.
   - `AI_CONTEXT/TECH_DEBT.md` — nợ đang mở (mới nhất trên cùng).
   - (Chỉ khi cần bức tranh kiến trúc) `AI_CONTEXT/SYSTEM_ARCHITECTURE_CURRENT.md` — **cảnh giác doc lỗi thời**, đối chiếu với thực tế code.

3. **CHỈ mở thêm module khi việc chạm tới** — không quét toàn repo, không đọc file lớn nếu delta đã đủ.

4. **Tóm tắt cho [TT] 3–5 dòng:** (a) trạng thái hiện tại, (b) việc chưa xong + owner, (c) thay đổi gần nhất, (d) đề xuất việc nên làm. Rồi **chờ xác nhận** — không tự chạy nếu ưu tiên #1 thuộc `[TT]`.

## Nhắc luật xuyên repo (khi phát sinh bug)
- Trước khi vá: chạy **checklist truy vết** trong `02_Rules/cross-repo-workflow.md §2` — định vị **tầng sai sớm nhất** + **repo sở hữu gốc**. Đừng vá ở repo đang đứng nếu gốc ở nơi khác.
- Fix ở **repo sở hữu gốc**; hub chỉ vá phòng thủ + mở debt-ticket nếu gốc chưa fix.
- Kết việc spoke → cập nhật `AI_CONTEXT` spoke + **cross-ref**; về hub chạy `/handover` (nhịp 5 Sync-hub).

## Data-boundary
KHÔNG đưa dữ liệu khách hàng/secret của spoke lên cloud/GitHub. GAS live (gửi email/batch-read) chạy ở máy thật.
