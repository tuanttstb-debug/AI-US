# Agile Mindset — cho PO/BA ngân hàng

> Không phải "làm Scrum cho đúng sách". Agile ở đây là: **giao giá trị tăng dần, học từ thực tế, thích ứng — kể cả trong ràng buộc compliance.**

## Vì sao ngân hàng vẫn cần Agile (dù không thể "move fast and break things")

Ngân hàng có compliance, Risk, audit — không thể phá vỡ. Nhưng đó chính là lý do cần Agile *đúng cách*:
- Requirement không bao giờ hoàn hảo từ đầu → giao từng phần, học, điều chỉnh.
- Rủi ro lớn nhất là build 6 tháng rồi mới biết sai → chia nhỏ để phát hiện sớm.
- Nhiều bên phụ thuộc (Business/Dev/QA/Risk) → cần nhịp đồng bộ, minh bạch.

> Agile trong ngân hàng = **thích ứng nhanh trong khuôn khổ**, không phải bỏ khuôn khổ.

## Agile vs Waterfall (qua công việc team)

| | Waterfall | Agile |
|---|---|---|
| Requirement | Chốt hết từ đầu | Làm rõ dần theo iteration |
| Giao hàng | 1 lần cuối dự án | Từng phần, sớm và thường xuyên |
| Phát hiện sai | Cuối (đắt) | Sớm (rẻ) |
| Thay đổi | Chống lại | Đón nhận có kiểm soát |
| Rủi ro | Dồn về cuối | Rải đều, giảm dần |

Không phải waterfall luôn sai — với phần ràng buộc pháp lý cứng, tuần tự là đúng. Điểm là: **đừng waterfall những thứ lẽ ra nên học dần.**

## 4 giá trị Agile, dịch ra ngôn ngữ team
1. **Con người & tương tác** > quy trình cứng nhắc → nói chuyện trực tiếp Dev/Business thay vì ném tài liệu qua lại.
2. **Sản phẩm chạy được** > tài liệu đồ sộ → giao được thứ dùng được, không chỉ BRD dày.
3. **Hợp tác với Business** > đàm phán hợp đồng → Business là đối tác trong suốt, không chỉ ký nhận đầu-cuối.
4. **Thích ứng thay đổi** > bám kế hoạch cứng → kế hoạch là để điều chỉnh, không phải để thờ.

## Ranh giới quan trọng: Agile ≠ tuỳ tiện
- Agile **không** có nghĩa "không cần kế hoạch/tài liệu" — ngân hàng vẫn cần đủ tài liệu cho audit.
- Agile **không** phá **Decision Rights** — thay đổi scope/logic vẫn qua đúng cấp (nối [dependency-stakeholder.md](dependency-stakeholder.md) & Growth).
- "Thích ứng thay đổi" ≠ "nhận mọi thay đổi vô điều kiện" — thay đổi vẫn qua đánh giá tác động.

## Ngày mai áp dụng
- Với một dự án đang waterfall-hoá: tách ra 1 phần có thể giao sớm để học.
- Thay 1 vòng "ném tài liệu" bằng 1 cuộc nói chuyện trực tiếp với Dev.
