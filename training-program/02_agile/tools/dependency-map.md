# Công cụ — Dependency Map

> Vẽ **trước** khi cam kết iteration. Dependency không thấy trước = dependency làm vỡ kế hoạch.

## Mẫu
```
Việc/Story của tôi   cần gì        từ ai/team    hạn      trạng thái   rủi ro
──────────────────────────────────────────────────────────────────────────────
[story A]         → API scoring → Core        → 15/07 → đang chờ  → CAO
[story B]         → duyệt Risk  → Risk        → 10/07 → OK        → thấp
[story C]         → (không PT)  → —           → —     → sẵn sàng  → —
```

## Với mỗi dependency rủi ro cao — trả lời 6 câu
1. Dependency là gì? (chính xác)
2. Ai owner thật sự?
3. Block ở đâu?
4. Tôi tác động được gì? (đổi thứ tự / mock-stub / gỡ block giúp họ)
5. Có alternative? (phân kỳ, đường vòng)
6. Ngưỡng escalate? (khi nào đẩy Leader — Level 3 nếu chạm cam kết)

## Nguyên tắc
- Kéo **story không phụ thuộc** lên làm trước khi bị block.
- Dùng **mock/stub** để chạy song song, ghép sau.
- **Escalate sớm** kèm đề xuất (Growth nguyên tắc 05), không đổ lỗi.
- Cập nhật map ở mỗi standup — trạng thái đổi thì kế hoạch đổi.

→ Case minh hoạ: [AG-C](../cases/case-ag-c-dependency.md) · nối Growth `03_growth/03_cases/case-dependency.md`.
