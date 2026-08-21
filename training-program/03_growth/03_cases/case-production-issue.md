# Case E (production) — Lỗi production: fix nhanh nhưng cần giải pháp dài hạn

> Neo nguyên tắc: **06 (workaround ≠ solution)** · **01 (unlearned problem is the enemy)**
> Dòng công việc: BPM/Core/Integration

---

## Tình huống

3h chiều, production báo lỗi: một batch giao dịch tích hợp giữa hệ thống cho vay và Core bị treo, khách không nhận được kết quả. Áp lực cao, phải xử lý ngay. Team restart service, batch chạy lại, giao dịch thông. Issue đóng "resolved".

3 ngày sau, lỗi tái diễn cùng khung giờ.

---

## Nguyên tắc xử lý production: 2 nhịp, đừng gộp làm 1

**Nhịp 1 — Stop the bleeding (workaround).**
Đúng và cần thiết. Restart để khách không bị treo tiếp = hành động đúng. KHÔNG có gì sai ở đây.

**Nhịp 2 — RCA + permanent fix.**
Sai lầm là **đóng issue sau nhịp 1**. Workaround không phải solution. Lỗi chưa hiểu root cause = lỗi sẽ quay lại.

> Issue → Workaround (dừng chảy máu) → RCA → Permanent Fix → Standard hóa.
> KHÔNG: Workaround = Solution.

---

## Chạy GROWTH

**G — Goal**
Không phải: "cho batch chạy lại."
Mà: "lỗi treo batch này không còn xảy ra, và nếu có sự cố tương tự team phát hiện được sớm."

**R — Reality**
- Fact: lỗi lặp cùng khung giờ → có pattern (tải cao? job trùng? timeout Core?).
- Assumption cần kiểm chứng: "chỉ là trục trặc nhất thời." Lặp lại = không nhất thời.
- Cần data: log, thời điểm, volume, trạng thái Core lúc đó.

**O — Options**
- A: Tiếp tục restart mỗi lần lỗi (workaround vĩnh viễn — nợ kỹ thuật, rủi ro khách).
- B: RCA tìm nguyên nhân (vd timeout khi volume cao) → fix cấu hình/logic retry.
- C: B + thêm alert chủ động (phát hiện treo trước khi khách phản ánh) + runbook xử lý.

Đề xuất: **C**.

**W — Will**
- Ngay: đảm bảo có workaround an toàn + theo dõi sát khung giờ rủi ro.
- Tiếp: PO phối hợp Dev/vận hành làm RCA — có owner, có deadline.
- *Decision Rights:* fix chạm logic tích hợp Core = production impact cao → Level 3, báo Leader, có thể cần phối hợp nhiều đơn vị.

**T — Track**
- Sau permanent fix: theo dõi qua đủ số chu kỳ (nhiều lần khung giờ đó) mới xác nhận hết.
- Đóng issue chỉ khi có bằng chứng không tái diễn, KHÔNG phải khi batch chạy lại lần đầu.

**H — Harvest**
- Learning: production incident phải tách nhịp; đóng issue = có RCA + fix + xác nhận, không phải "hết chảy máu".
- Standard: template RCA cho incident; định nghĩa "resolved" mới cho team.

---

## Câu hỏi thảo luận
1. Vì sao "issue đóng resolved" sau restart là điểm sai chí mạng?
2. Định nghĩa "resolved" của team nên là gì để không lặp lại tình huống này?
3. Alert chủ động (option C) thuộc "phòng ngừa" — vì sao Growth luôn kéo tới phòng ngừa, không dừng ở chữa cháy?
