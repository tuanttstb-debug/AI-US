# Design Thinking — 5 bước khám phá đúng vấn đề

> Không phải quy trình sáng tạo cho designer. Đây là cách một PO/BA **tránh build sai thứ** — vì lỗi đắt nhất không phải code sai, mà là code đúng một thứ không ai cần.

```
EMPATHIZE → DEFINE → IDEATE → PROTOTYPE → TEST
(hiểu người dùng) (chốt vấn đề) (nhiều ý tưởng) (làm thử rẻ) (học từ phản hồi)
```

---

## Bắt đầu từ một tình huống thật

Business nói: *"Thêm cho tôi nút xuất báo cáo Excel ở màn hình phê duyệt BLOL."* Bạn có 2 cách:

**Cách 1 (build ngay):** viết BRD "thêm nút export Excel", chuyển Dev. 3 tuần sau giao xong, Business dùng vài lần rồi thôi — hoá ra họ cần *theo dõi hồ sơ quá hạn hằng ngày*, không phải export.

**Cách 2 (Design Thinking):** hỏi "chị export ra để làm gì?" → hiểu nhu cầu thật là *cảnh báo hồ sơ sắp trễ* → giải pháp đúng có thể chỉ là một cảnh báo tự động, rẻ hơn và trúng hơn.

> Cùng một yêu cầu. Cách 2 tiết kiệm 3 tuần và giải đúng vấn đề. Đó là toàn bộ Design Thinking.

---

## 1. EMPATHIZE — hiểu người dùng thật

**Câu hỏi:** người dùng thật là ai, họ đang khổ vì cái gì?

- Người dùng của luồng tín dụng số không chỉ là "khách hàng" — còn là **RM/CVQHKH, teller, cán bộ phê duyệt, Ops**. Mỗi vai có pain khác nhau.
- Đi hỏi, đừng đoán. Quan sát họ làm việc thật. Nghe cả cái họ *không* nói.
- Công cụ: **Empathy Map** (Nói / Nghĩ / Làm / Cảm nhận), phỏng vấn mở.

**Ngày mai áp dụng:** trước khi viết BRD, nói chuyện với **ít nhất 1 người dùng thật** của luồng đó.

## 2. DEFINE — chốt đúng vấn đề

**Câu hỏi:** vấn đề thật sự cần giải là gì? (không phải giải pháp)

- Viết **Problem Statement**: "[Người dùng] cần [nhu cầu] vì [insight], nhưng hiện tại [rào cản]."
- Chuyển thành **"How Might We…"** (Làm thế nào để mình có thể…) — mở ra không gian giải pháp.
- Bẫy lớn nhất: nhận một *giải pháp* từ Business và tưởng đó là *vấn đề*.

**Ngày mai áp dụng:** với mỗi yêu cầu, viết 1 câu Problem Statement trước khi nghĩ giải pháp.

## 3. IDEATE — nhiều phương án (= Options của Growth)

**Câu hỏi:** có những cách nào để giải?

- Bung nhiều ý tưởng, **hoãn phán xét**. Số lượng trước, chất lượng sau.
- Đây chính là bước **Options** trong GROWTH — đừng dừng ở ý tưởng đầu tiên.
- So sánh sau: giá trị người dùng / nỗ lực / rủi ro / ràng buộc (Risk, compliance).

**Ngày mai áp dụng:** ép ra tối thiểu 3 hướng giải cho mỗi vấn đề, kể cả hướng "rẻ tiền".

## 4. PROTOTYPE — làm thử rẻ trước khi build

**Câu hỏi:** làm sao thử ý tưởng mà chưa tốn công Dev?

- Wireframe trên giấy, mockup low-fi, storyboard luồng. Mục tiêu: **đủ để người khác phản ứng**, không cần đẹp.
- Rẻ để sai — sai trên giấy tốn 10 phút, sai sau khi build tốn 3 tuần.

**Ngày mai áp dụng:** vẽ tay 1 màn hình / luồng trước khi mô tả cho Dev.

## 5. TEST — học từ phản hồi (= Harvest của Growth)

**Câu hỏi:** người dùng thật phản ứng thế nào?

- Đưa prototype cho người dùng, **quan sát họ dùng**, đừng thuyết phục họ.
- Phản hồi tiêu cực ở đây là **quà** — nó rẻ và đúng lúc.
- Vòng lại: học được → sửa Define/Ideate → thử lại.

**Ngày mai áp dụng:** trước khi chốt BRD, cho ít nhất 1 người dùng "bấm thử" prototype.

---

## Điểm mấu chốt cho PO/BA ngân hàng
- Design Thinking **không thay** phân tích nghiệp vụ — nó đứng *trước*, để đảm bảo bạn phân tích **đúng thứ**.
- Trong ràng buộc Risk/Compliance: prototype & test giúp phát hiện xung đột quy định **sớm**, trên giấy, thay vì sau go-live.
- Nối sang Growth: Empathize/Define = **Reality**, Ideate = **Options**, Test = **Harvest**.

→ Double Diamond: [`double-diamond.md`](double-diamond.md) · Nguyên tắc: [`principles.md`](principles.md)
