# Case A — Lỗi tự xử lý với Dev nhưng không record → lỗi lặp lại

> Neo nguyên tắc: **06 (Workaround ≠ solution)** · **09 (lặp lỗi = vấn đề hệ thống)**
> Dòng công việc: BLOL

---

## Tình huống

PO phụ trách BLOL nhận báo từ Ops: một số hồ sơ bị kẹt ở bước phê duyệt, không chuyển tiếp được. PO trao đổi trực tiếp với Dev, Dev phát hiện một trạng thái không được map đúng, chỉnh config, hồ sơ chạy lại. PO đóng issue. Không ghi lại gì.

2 tuần sau, lỗi tương tự xuất hiện ở một luồng sản phẩm khác. Không ai nhớ lần trước đã xử lý thế nào. Dev phải debug lại từ đầu. Ops phàn nàn "sao lỗi cũ quay lại".

---

## Fixed Thinking (bẫy hay mắc)
> "Lần trước fix rồi mà, chắc Dev làm sót. Lỗi mới thôi, xử lý tiếp."

Bỏ qua sự thật: đây **không phải lỗi mới** — cùng một class lỗi (mapping trạng thái), và learning lần trước đã bốc hơi.

---

## Chạy GROWTH

**G — Goal**
Không phải: "cho hồ sơ chạy lại".
Mà: "class lỗi mapping trạng thái này không còn lặp ở bất kỳ luồng BLOL nào."

**R — Reality**
- Fact: cùng nguyên nhân gốc (trạng thái không được map) xuất hiện ở 2 luồng, cách nhau 2 tuần.
- Fact: lần 1 fix bằng chỉnh config, không record, không kiểm tra các luồng khác có cùng vấn đề.
- Assumption cần bỏ: "đây là 2 lỗi riêng biệt."

**O — Options**
- A: Fix riêng luồng đang lỗi (workaround, nhanh, nhưng lỗi sẽ quay lại ở luồng thứ 3).
- B: Rà toàn bộ các luồng dùng cùng cơ chế mapping, fix đồng loạt + thêm validation chặn trạng thái không map được.
- C: B + ghi lại RCA vào knowledge base + thêm test case regression.

Đề xuất: **C**. Effort lớn hơn A một chút nhưng chặn cả class lỗi.

**W — Will**
- PO + Dev rà danh sách luồng dùng chung mapping — trong tuần.
- Dev thêm validation + test case — có ETA.
- PO ghi RCA vào GROWTH LOG / knowledge base — ngay khi fix xong.
- *Kiểm tra Decision Rights:* thêm validation chạm logic → nếu ảnh hưởng nhiều luồng production, PO báo Leader trước khi deploy (Level 2/3).

**T — Track**
- Sau deploy: theo dõi log 1-2 tuần, class lỗi này còn xuất hiện không.
- Không đóng issue ngay sau khi hồ sơ chạy lại.

**H — Harvest**
- Learning: "workaround không record = trả nợ có lãi."
- Standard hóa: mọi fix cho lỗi production BLOL phải kèm 1 dòng RCA + kiểm tra 'lỗi này còn ở luồng nào khác không'.

---

## Câu hỏi thảo luận
1. Ở bước nào lần đầu tiên đã đi chệch? (gợi ý: Goal đặt sai từ đầu)
2. Nếu không có thời gian làm option C ngay, tối thiểu phải giữ lại cái gì? (gợi ý: RCA + danh sách luồng rủi ro)
3. Làm sao để learning này không nằm trong đầu 1 người?
