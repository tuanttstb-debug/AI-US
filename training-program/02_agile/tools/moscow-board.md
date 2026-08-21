# Công cụ — MoSCoW Board & Value/Effort

## MoSCoW board
```
┌─────────────── MUST (thiếu → không go-live / vi phạm pháp lý) ──────────────┐
│                                                                              │
├─────────────── SHOULD (quan trọng, hoãn ngắn được) ─────────────────────────┤
│                                                                              │
├─────────────── COULD (tốt nếu có, bỏ được) ─────────────────────────────────┤
│                                                                              │
├─────────────── WON'T NOW (lần này không làm — ghi lại cho sau) ─────────────┤
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```
**Quy tắc chống lạm phát Must:** nếu > ~50% mục là Must → chưa thực sự ưu tiên. Ép lại: Must chỉ là thứ **thiếu nó thì không go-live được**.

## Ma trận Value / Effort (dùng cho Should + Could)
```
             Effort THẤP        Effort CAO
Value CAO  │ LÀM NGAY        │ LÊN KẾ HOẠCH  │
           │ (quick win)     │ (big bet)     │
Value THẤP │ LÀM SAU         │ BỎ / hoãn     │
           │ (fill-in)       │ (money pit)   │
```

## Lát cắt MVP
> MVP = tất cả **Must** + vài **Should** value-cao/effort-thấp, sao cho **một người dùng thật hoàn thành việc thật**.

Ghi rõ khi trình Leader/Business:
- Lát MVP gồm gì (đủ dùng thật).
- Cái gì hoãn sang phase 2 + ảnh hưởng.
- Trade-off của mỗi lựa chọn.

> Quyết cắt scope = **Level 3**. PO chuẩn bị + đề xuất; Leader/Business chốt; ghi Decision Log.
