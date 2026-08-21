# GROWTH LOG — biến kinh nghiệm cá nhân thành knowledge của team

> Đề xuất một module/section trong **SHTD Dashboard**.
> Mục tiêu: mỗi task quan trọng đi qua để lại một learning ghi lại được — không nằm trong đầu 1 người.

---

## 1. Ghi cái gì (6 trường)

| Trường | Nội dung |
|---|---|
| **Situation** | Bối cảnh ngắn: task/dòng công việc, thời điểm |
| **Problem** | Vấn đề thực sự gặp phải (không phải triệu chứng) |
| **Action** | Đã làm gì (chạy qua GROWTH thế nào) |
| **Result** | Kết quả thật — đo được nếu có (outcome đạt chưa, có rework/issue mới) |
| **Learning** | Học được gì — what worked / what didn't / why |
| **Next improvement** | Lần sau làm khác gì + có gì cần standardize cho team |

---

## 2. Mẫu điền nhanh

```
─────────────────────────────────────────────
GROWTH LOG #___        Ngày: ______  Người: ______
Dòng công việc: [GNOL / BLOL / SCF / Digital Lending / ...]

SITUATION:
  ______________________________________________

PROBLEM (vấn đề thật, không phải triệu chứng):
  ______________________________________________

ACTION (đã chạy GROWTH thế nào):
  G: ____  R: ____  O: ____  W: ____  T: ____
  Decision Rights: Level ___

RESULT (đo được):
  ______________________________________________

LEARNING:
  What worked:  ________________________________
  What didn't:  ________________________________
  Why:          ________________________________

NEXT IMPROVEMENT:
  Lần sau tôi sẽ: ______________________________
  Cần standardize cho team? [ ] Không  [ ] Có → gì: ___
─────────────────────────────────────────────
```

---

## 3. Ví dụ đã điền (mẫu)

```
GROWTH LOG #12        Ngày: 2026-08-15   Người: [PO BLOL]
Dòng công việc: BLOL

SITUATION: Hồ sơ kẹt ở bước phê duyệt, Ops báo lỗi.
PROBLEM:  Trạng thái không được map đúng — cùng class lỗi đã gặp 2 tuần trước.
ACTION:
  G: class lỗi mapping không lặp ở luồng nào
  R: cùng root cause, 2 luồng, lần trước không record
  O: fix riêng / fix cả class + validation / + RCA + regression test
  W: rà luồng chung + validation + RCA;  Decision Rights: Level 2 (báo Lead trước deploy)
RESULT:  Deploy fix + validation. Theo dõi 2 tuần: class lỗi không tái diễn.
LEARNING:
  What worked: đào cả class thay vì 1 luồng
  What didn't: lần đầu đóng issue quá sớm, không record
  Why: Goal ban đầu đặt ở mức "cho hồ sơ chạy lại"
NEXT: Mọi fix production BLOL kèm RCA + check "lỗi này còn ở luồng nào khác"
  Standardize? [x] Có → thêm bước RCA + rà luồng vào định nghĩa "resolved"
```

---

## 4. Vì sao đáng làm (giá trị dài hạn)

Dữ liệu GROWTH LOG tích lũy dùng được cho:
- **Coaching:** Leader thấy member đang mắc pattern gì, tiến bộ ở đâu.
- **Performance review:** dựa trên learning thật, không cảm tính.
- **Identify recurring problems:** lỗi/vấn đề nào lặp lại nhiều → cần fix ở tầng hệ thống/process.
- **Standardize process:** learning lặp lại nhiều lần → nâng thành checklist/rule chung.
- **AI assistant / knowledge base:** nguồn dữ liệu để sau này hỏi "team đã từng gặp lỗi này chưa, xử lý thế nào".

---

## 5. Nguyên tắc để LOG không chết
- **Ngắn.** 5 phút điền xong. Dài là bỏ.
- **Chỉ log task quan trọng** (incident, task khó, quyết định có rủi ro) — không log mọi thứ.
- **Learning phải cụ thể**, không viết "cần cẩn thận hơn".
- **Cột "standardize" là vàng:** đó là chỗ learning cá nhân biến thành tài sản team.

---

## 6. Gợi ý triển khai trên SHTD Dashboard
- Form nhập 6 trường + dropdown dòng công việc + Decision Rights level.
- Tag theo dòng công việc & loại vấn đề để lọc recurring problems.
- View "Standardize candidates" — lọc các log có cờ standardize = Có.
- Liên kết với review 30 ngày ([`../07_followup/30-day-plan.md`](../07_followup/30-day-plan.md)).
