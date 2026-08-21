# Growth Mindset — cho Team Số hóa Tín dụng

## 1. Bắt đầu từ một tình huống thật

Bạn nhận task chỉnh luồng phê duyệt BLOL. Đến ngày thứ 3 mới phát hiện logic điều kiện không khớp với nghiệp vụ Risk. Bạn có 2 cách nghĩ:

**Cách 1 (Fixed):**
> "Requirement ban đầu Risk viết không rõ. Không phải lỗi của mình."

**Cách 2 (Growth):**
> "Mình phát hiện muộn 3 ngày. Lần sau mình cần confirm điều kiện với Risk ngay ở bước phân tích, trước khi bắt tay làm. Giờ mình đưa 2 phương án xử lý cho Leader."

Cả hai đều đúng một phần về *fact*. Nhưng chỉ cách 2 làm bạn **giỏi hơn sau task này**.

Đó là toàn bộ Growth Mindset. Không có gì huyền bí.

---

## 2. Growth Mindset thực chất là gì (bỏ hết lý thuyết)

Định nghĩa gốc (Carol Dweck) nói: năng lực có thể phát triển qua nỗ lực, chứ không cố định. Với team mình, dịch ra ngôn ngữ công việc:

> **Growth Mindset = niềm tin rằng cách mình xử lý vấn đề có thể tốt lên, cộng với hành vi thực tế để làm nó tốt lên sau mỗi lần.**

Hai vế đều bắt buộc:
- **Niềm tin** mà không có **hành vi** → chỉ là câu nói động viên.
- **Hành vi** (rút learning, đổi cách làm) mới là thứ tạo ra kết quả.

---

## 3. Growth KHÔNG phải cái gì (đọc kỹ phần này)

Đây là những hiểu nhầm nguy hiểm nhất trong môi trường PO/BA ngân hàng:

| Hiểu nhầm | Vì sao sai | Đúng ra là |
|---|---|---|
| "Growth = cứ chủ động làm" | Đổi scope/logic không báo → phá governance, tạo rủi ro production | Chủ động **trong** Decision Rights |
| "Growth = làm nhiều, làm nhanh hơn" | Nhanh mà lặp lỗi thì không phải growth | Làm **tốt hơn lần trước**, kể cả chậm hơn chút |
| "Growth = luôn tích cực" | Che giấu risk vì "phải tích cực" là nguy hiểm | Báo risk sớm, nhìn thẳng fact |
| "Growth = không được mắc lỗi" | Sợ lỗi → không dám thử → không học được | Sai 1 lần = learning; **lặp lại** mới là vấn đề |
| "Growth = đồng ý với Leader" | Growth cần phản biện có evidence | Disagree → Commit → Execute |
| "Growth = không cần ai hỗ trợ" | Ôm việc quá sức → task chậm → hại team | Biết **khi nào** tự làm, khi nào cần hỗ trợ |

Nguyên tắc số 10 tóm lại tất cả:

> **Mục tiêu của Growth không phải trở thành người không cần hỗ trợ; mà là biết khi nào tự làm, khi nào cần hỗ trợ, và sau mỗi lần hỗ trợ phải trưởng thành hơn.**

---

## 4. Vì sao team mình *đặc biệt* cần Growth Mindset

Đặc thù công việc của team:
- Task phát sinh đột xuất, deadline thay đổi.
- Requirement chưa hoàn chỉnh khi bắt đầu.
- Nhiều dependency: Business, Dev, QA, Risk, Compliance, Legal, Ops, Audit, Vendor.
- Lỗi production/UAT phải xử lý nhanh nhưng vẫn cần giải pháp dài hạn.
- Member được kỳ vọng tự chủ cao — Leader không micromanage.

Trong môi trường này, người có **Fixed Mindset** sẽ:
- Chờ requirement hoàn hảo mới làm (không bao giờ có).
- Đổ lỗi dependency khi task chậm.
- Fix workaround rồi đóng issue → lỗi quay lại.
- Im lặng khi gặp khó → báo muộn.

Người có **Growth Mindset** biến chính sự hỗn loạn đó thành lợi thế: mỗi task khó là một lần nâng năng lực.

---

## 5. Ba phản xạ Growth cần luyện

1. **Dừng lại trước khi phản ứng.** Khi gặp vấn đề, đừng nhảy vào fix hoặc đổ lỗi. Hỏi: "Outcome thật sự cần đạt là gì?"
2. **Tách fact khỏi cảm xúc & assumption.** "Dev chậm" là cảm xúc. "Task API đang chờ Dev, block từ thứ 3, chưa có ETA" là fact.
3. **Luôn hỏi 'lần sau khác gì'.** Không có task nào đóng lại mà không để lại một learning.

---

## 6. Ngày mai áp dụng thế nào?

- Trước khi bắt đầu 1 task: viết 1 dòng **Goal (outcome)**, không phải mô tả task.
- Khi gặp khó: trước khi báo Leader, chuẩn bị **Reality + 2 Options**.
- Khi đóng 1 task quan trọng: viết 3 dòng **Harvest** vào GROWTH LOG.

→ Chi tiết framework: [`growth-framework.md`](growth-framework.md)
→ 10 nguyên tắc: [`principles.md`](principles.md)
