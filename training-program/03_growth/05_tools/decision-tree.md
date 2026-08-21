# Decision Tree — Khi nào tự làm / báo Lead / xin ý kiến

> Đây là công cụ neo Growth vào **Decision Rights** của Team Số hóa Tín dụng.
> Growth không phá governance. Growth giúp member trưởng thành *trong* governance.

---

## 3 Level của Decision Rights

| Level | Tên | Growth nghĩa là gì ở level này |
|---|---|---|
| **1** | **Tự chủ** | Tự giải quyết. Growth = xử lý gọn, ghi learning. |
| **2** | **Chủ động + Báo Lead** | Tự phân tích + đề xuất phương án + báo đúng lúc. |
| **3** | **Xin ý kiến** | Chuẩn bị đầy đủ thông tin để Leader ra quyết định nhanh. |

Điểm mấu chốt: ở **cả 3 level**, member vẫn phải suy nghĩ như một PO — phân tích, đưa options. Khác biệt chỉ là **ai bấm nút quyết định cuối**.

---

## Cây quyết định

```
Gặp một quyết định cần ra
        │
        ▼
Nó có chạm bất kỳ điều nào sau đây không?
  • Thay đổi SCOPE
  • Thay đổi LOGIC quan trọng
  • Có PRODUCTION impact
  • Có CUSTOMER impact
  • Chạm RISK / COMPLIANCE / LEGAL
  • Chạm một COMMITMENT đã cam kết
        │
   ┌────┴─────┐
   │          │
  KHÔNG       CÓ
   │          │
   ▼          ▼
Trong phạm    Mức tác động?
vi định nghĩa  ┌──────────┴──────────┐
sẵn của tôi?   │                     │
   │        Vừa/có thể            Lớn / không
 ┌─┴──┐     đảo ngược,           chắc chắn /
 │    │     đã có tiền lệ         rủi ro cao /
CÓ   KHÔNG      │                 nhiều bên
 │    │         ▼                     │
 ▼    ▼      LEVEL 2                  ▼
LEVEL 1  (hỏi hoặc  Chủ động làm    LEVEL 3
Tự làm    làm rồi   + BÁO Lead      Xin ý kiến
+ ghi     báo?)     kịp thời        TRƯỚC khi làm
learning  → Level 2/3
```

---

## Bảng tra nhanh cho công việc PO/BA

| Tình huống | Level | Vì sao |
|---|---|---|
| Tái hiện lỗi, viết step, phân tích | 1 | Trong phạm vi PO |
| Trao đổi trực tiếp Dev để hiểu issue | 1 | Được trao quyền |
| Confirm UI/logic trong phạm vi đã định nghĩa | 1 | Không đổi bản chất |
| Đề xuất solution cho một lỗi | 2 | Nên cho Lead biết hướng đi |
| Chỉnh một cấu hình nhỏ, có tiền lệ, không chạm Risk | 2 | Làm nhưng báo |
| Đổi một logic có ràng buộc Risk/Compliance | 3 | Rủi ro compliance |
| Thêm/bớt scope giữa chặng | 3 | Chạm commitment |
| Thay đổi có production/customer impact | 3 | Rủi ro cao |
| Deploy fix cho incident tích hợp Core | 3 | Production impact lớn |
| Nội dung giải trình Audit | 3 | Compliance |
| Cam kết deadline/nội dung với bên ngoài | 3 | Commitment |

> Nguyên tắc an toàn khi phân vân: **không rõ level → coi là Level cao hơn.** Hỏi sớm rẻ hơn sửa sai muộn.

---

## Ba câu tự hỏi trước khi hành động

1. **Việc này nếu sai, có đảo ngược được không?** Không đảo ngược → level cao hơn.
2. **Nó ảnh hưởng ai ngoài tôi?** Càng nhiều bên → level cao hơn.
3. **Tôi có chắc mình hiểu hết ràng buộc không?** Không chắc → verify / hỏi trước.

---

## Growth trong governance — nói rõ một lần

- Level 1 KHÔNG có nghĩa "làm bừa cho nhanh". Vẫn phải đúng và ghi learning.
- Level 3 KHÔNG có nghĩa "đẩy hết cho Leader". Bạn vẫn phải mang **phân tích + options + đề xuất**, để Leader quyết trong 5 phút thay vì phải tự đi điều tra.
- Vượt level (tự ý) không phải "năng động" — là rủi ro. Xem [`../03_cases/case-po-dev.md`](../03_cases/case-po-dev.md) và [`../03_cases/case-scope-change.md`](../03_cases/case-scope-change.md).
