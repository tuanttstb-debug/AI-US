# Công cụ — User Story & Acceptance Criteria template

```
─────────────────────────────────────────────
STORY #___

Là [vai cụ thể] ________________________________
tôi muốn [hành động] ___________________________
để [giá trị / vì sao] __________________________   ← quan trọng nhất

INVEST check:
 [ ] Independent  [ ] Negotiable  [ ] Valuable
 [ ] Estimable    [ ] Small       [ ] Testable

ACCEPTANCE CRITERIA (Given / When / Then — đo được):
 1. Given ______ / When ______ / Then ______ (≤ ? giây / rõ ràng)
 2. Given ______ / When ______ / Then ______
 CASE LỖI:
 3. Given [thiếu/timeout/không đủ điều kiện] / Then ______
 RÀNG BUỘC Risk/Compliance:
 4. Given [trường hợp bị hạn chế] / Then ______

Definition of Ready đạt chưa? [ ]  (xem dor-dod.md)
─────────────────────────────────────────────
```

## Checklist chất lượng story
- [ ] Có **vai thật** (không phải "PO muốn").
- [ ] Có **"để…"** (giá trị), không chỉ hành động.
- [ ] AC **đo được** (số/điều kiện rõ), không "nhanh/đẹp".
- [ ] Có **case lỗi** (thiếu dữ liệu, timeout…).
- [ ] Có **ràng buộc Risk/Compliance** nếu áp dụng.
- [ ] Đủ **nhỏ** để làm trong 1 iteration.

> AC = bước Reality của Growth áp vào requirement. Không để chỗ cho "đoán".
