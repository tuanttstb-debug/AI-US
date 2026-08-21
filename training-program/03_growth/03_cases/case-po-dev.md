# Case C — PO làm việc trực tiếp với Dev: chủ động ≠ tự ý

> Neo nguyên tắc: **04 (chủ động ≠ tự ý)** · **08 (ai quyết định → người đó ownership)**
> Dòng công việc: Digital Lending / Integration

---

## Tình huống

PO được trao quyền làm việc trực tiếp với Dev để xử lý issue nhanh. Trong lúc test luồng đăng ký khoản vay số, PO thấy một điều kiện hiển thị field chưa hợp lý với trải nghiệm khách. PO trao đổi Dev, Dev nói "chỉnh nhẹ thôi, 10 phút". PO OK, Dev deploy lên UAT.

Hoá ra field đó bị ẩn theo một quy định của Risk (không hiển thị hạn mức trong một số trường hợp). Việc "chỉnh nhẹ" vô tình để lộ thông tin không được phép. QA phát hiện, phải rollback, và phải giải trình vì sao có thay đổi không qua review.

---

## Vấn đề cốt lõi
PO **chủ động** — tốt. Nhưng đã **tự ý** vượt ranh giới: thay đổi một logic có ràng buộc Risk mà không kiểm tra và không báo.

Chủ động và tự ý nhìn giống nhau ở bề mặt. Ranh giới là **Decision Rights**.

---

## Đâu là việc PO ĐƯỢC chủ động (không cần hỏi)
- Trao đổi trực tiếp với Dev để phân tích lỗi.
- Đề xuất solution.
- Confirm UI/logic **trong phạm vi đã được định nghĩa**.
- Làm rõ requirement, tái hiện lỗi, viết step tái hiện.

## Đâu là việc PHẢI báo / xin ý kiến (Decision Rights Level 2-3)
- Thay đổi **scope**.
- Thay đổi **logic quan trọng** (nhất là logic có ràng buộc Risk/Compliance/Legal).
- Có **production impact**.
- Có **customer impact**.
- Chạm **risk** hoặc một **commitment** đã cam kết với bên khác.

> Field bị ẩn theo quy định Risk = logic quan trọng + có ràng buộc compliance → **phải xác minh và báo trước**, dù Dev nói "10 phút".

---

## Chạy GROWTH (cách PO nên làm)

**G** — Goal: cải thiện trải nghiệm hiển thị field *mà không vi phạm ràng buộc Risk*.
**R** — Reality: field này ẩn có chủ đích không? Mình có chắc không? → chưa chắc = phải verify.
**O** — Options: (A) chỉnh ngay như Dev nói; (B) verify với Risk/tài liệu trước rồi mới quyết; (C) ghi nhận đề xuất, đưa vào backlog review.
**W** — Will: chọn B/C — verify ràng buộc trước, nếu là thay đổi logic thì báo Leader/Risk. *Không* chọn A.
**T** — Track: sau khi có xác nhận, mới cho deploy; kiểm tra QA pass.
**H** — Harvest: rule cho bản thân — "field/logic mình không rõ vì sao tồn tại = có thể có ràng buộc mình chưa biết → verify trước khi đổi."

---

## Câu hỏi thảo luận
1. Dev nói "chỉnh nhẹ 10 phút" — vì sao đây là bẫy, không phải lý do để yên tâm?
2. Làm sao PO phân biệt nhanh "logic bình thường" và "logic có ràng buộc" khi không phải lúc nào cũng có tài liệu?
3. Nếu đã lỡ deploy rồi mới biết sai, bước Growth tiếp theo là gì? (gợi ý: báo ngay, không giấu — nguyên tắc 05)

→ Xem cây quyết định: [`../05_tools/decision-tree.md`](../05_tools/decision-tree.md)
