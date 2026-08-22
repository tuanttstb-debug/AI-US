# CROSS-REPO CHANGE LOG

> Nhật ký thay đổi xuyên repo — **1 dòng/phiên** cho mỗi thay đổi chạm dự án spoke, để **AIOS (hub) nắm đồng thời** mà không cần mở từng repo. Ghi bởi `/handover` (nhịp 5 Sync-hub). Mới nhất **trên cùng**.
>
> Định dạng: `YYYY-MM-DD · <REPO> · <commit> · <tóm tắt> · gốc=<hub|spoke-data|spoke-backend|…> · cross-ref=<Y/N>`

- 2026-08-22 · SHTD-Dashboard · `29369e4` · DateGuard.gs chống lệch định dạng ngày tận gốc (onEdit + daily) · gốc=spoke-data · cross-ref=Y (AIOS weekly-report `5b3b80b` freshness guard là guard phòng thủ hub cho cùng triệu chứng)
- 2026-08-21 · AIOS · `5b3b80b` · Freshness guard weekly-report (chặn gửi trên snapshot cũ) · gốc=hub-freshness (triệu chứng chung với spoke-data SHTD) · cross-ref=Y
