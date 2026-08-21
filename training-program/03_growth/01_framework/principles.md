# 10 Nguyên tắc cốt lõi

> In ra. Dán chỗ nào nhìn thấy mỗi ngày. Đây là "hiến pháp" tư duy của team.

---

### 01 — Problem is not the enemy. Unlearned problem is.
Vấn đề không phải kẻ thù. Vấn đề *không được học* mới là kẻ thù.
Một lỗi production dạy được team một điều thì nó có giá trị. Cùng lỗi đó lặp lần 3 mà không ai học được gì — đó mới là thất bại.

### 02 — Không đổ lỗi trước khi hiểu root cause.
"Dev chậm", "Business đổi ý", "Risk khó tính" — có thể đúng, nhưng nói ra *trước khi* đào root cause là đang đóng cửa học hỏi. Root cause trước, kết luận sau.

### 03 — Không chỉ báo vấn đề — luôn đưa phương án.
Báo "có lỗi rồi" là chuyển việc cho người khác. Báo "có lỗi, đây là 2 hướng xử lý, mình đề xuất hướng A vì…" là làm việc của một PO. Không bao giờ báo trần trụi.

### 04 — Chủ động không đồng nghĩa tự ý.
Chủ động = giải quyết trong phạm vi quyền của mình. Tự ý = đổi scope/logic/commitment mà không báo. Ranh giới là Decision Rights. Vượt ranh giới không phải là "năng động", là rủi ro.

### 05 — Escalate sớm tốt hơn chữa cháy muộn.
Báo sớm khi mới thấy tín hiệu risk không phải là yếu kém — là chuyên nghiệp. Giấu đến sát deadline rồi mới báo mới là vấn đề. Escalate sớm = cho Leader/team thời gian để còn xoay.

### 06 — Workaround không phải permanent solution.
Fix nhanh để không chảy máu là đúng. Nhưng đóng issue ngay sau workaround là gài một quả bom hẹn giờ. Workaround → RCA → permanent fix → standard hóa.

### 07 — Feedback là dữ liệu để cải thiện.
Feedback tiêu cực không phải để phòng thủ. Hỏi: "Feedback này cho mình biết điều gì về cách mình đang làm?" Feedback → Signal → Learning → Action.

### 08 — Ai quyết định → người đó ownership.
Nếu bạn ra quyết định trong phạm vi của mình, bạn own kết quả — cả tốt lẫn xấu. Nếu bạn xin ý kiến và Leader quyết, thì đó là quyết định chung. Không có chuyện "quyết xong rồi đổ cho người khác".

### 09 — Sai một lần là learning; lặp lại cùng một sai lầm là vấn đề hệ thống/hành vi.
Lỗi lần đầu: bình thường, học đi. Cùng lỗi lần 2-3: không còn là "chuyện không may" — hoặc process thiếu, hoặc hành vi cần đổi. Đừng để learning nằm trong đầu 1 người.

### 10 — Mục tiêu của Growth không phải trở thành người không cần hỗ trợ.
Mà là biết **khi nào tự làm, khi nào cần hỗ trợ**, và sau mỗi lần được hỗ trợ phải **trưởng thành hơn**. Xin hỗ trợ đúng lúc là kỹ năng, không phải điểm yếu. Xin đi xin lại cùng một thứ mới là vấn đề.

---

## Cách dùng 10 nguyên tắc này

- **Khi bí trong 1 tình huống:** đọc lướt 10 dòng, thường có 1-2 dòng đúng ngay tình huống của bạn.
- **Khi review task với Leader:** dùng nó làm ngôn ngữ chung ("cái này đang vi phạm nguyên tắc 06 — mới workaround chứ chưa RCA").
- **Khi onboard member mới:** đây là thứ đọc trong tuần đầu.

Mỗi nguyên tắc đều có case minh hoạ trong [`../03_cases/`](../03_cases/).
