# Bài tập tình huống — Workshop

> Cách dùng: chia nhóm, mỗi nhóm 1 case, chạy đủ **Goal → Reality → Options → Will → Track → Harvest** trong 15', trình bày 4', phản biện 3'.
> Với mỗi bước, ép nhóm chỉ rõ: đâu là **fact**, đâu là **assumption**, bước Will có còn trong **Decision Rights** không.

---

## Bảng phân case cho nhóm

| Nhóm | Case | File | Nguyên tắc trọng tâm |
|---|---|---|---|
| 1 | Lỗi tự xử lý không record → lặp lại | [case-blol](../03_cases/case-blol.md) | 06, 09 |
| 2 | PO đổi logic có ràng buộc Risk | [case-po-dev](../03_cases/case-po-dev.md) | 04, 08 |
| 3 | Task trễ báo muộn | [case-task-delay](../03_cases/case-task-delay.md) | 05, 03 |
| 4 | Dev không kịp deadline | [case-dependency](../03_cases/case-dependency.md) | 02, 03 |
| 5 | Lỗi production lặp lại | [case-production-issue](../03_cases/case-production-issue.md) | 06, 01 |
| 6 | Audit yêu cầu giải trình | [case-audit](../03_cases/case-audit.md) | 08, 07 |
| 7 | Feedback QA/Business tiêu cực | [case-feedback](../03_cases/case-feedback.md) | 07, 02 |
| 8 | Business thêm scope giữa chặng | [case-scope-change](../03_cases/case-scope-change.md) | 04, 03, 08 |

(Chọn 3-4 case sát team lúc đó, không cần dùng hết.)

---

## Mẫu worksheet cho nhóm (in A0)

```
CASE: ____________________________

G — GOAL (outcome thật, không phải "task nào xong"):
_______________________________________________

R — REALITY
  Fact:        ___________________________________
  Assumption:  ___________________________________
  Root cause:  ___________________________________
  Constraint:  ___________________________________

O — OPTIONS (tối thiểu 3)
  A: ______________  Impact/Effort/Risk/Dep/Time: ___
  B: ______________  ___
  C: ______________  ___
  → Đề xuất của nhóm: ____ vì ____

W — WILL (Action / Owner / Deadline)
  ___________________________________
  ⚠ Bước này còn trong Decision Rights không? Level mấy? ___

T — TRACK (đo gì để biết outcome đạt):
  ___________________________________

H — HARVEST (learning + cần standardize gì cho team):
  ___________________________________
```

---

## Bài tập bổ sung 1 — "Chuyển câu Fixed thành Growth" (10', warm-up)

Chiếu từng câu, cả phòng chuyển hoá tại chỗ:

| Câu Fixed | (team tự chuyển) |
|---|---|
| "Nhiều việc quá nên trễ" | ? |
| "Dev chậm chứ em xong phần em rồi" | ? |
| "User chả biết mình muốn gì" | ? |
| "QA bắt bẻ mấy lỗi không quan trọng" | ? |
| "Anh không hiểu nên mới không duyệt" | ? |

Đáp án tham khảo: [`../01_framework/fixed-vs-growth.md`](../01_framework/fixed-vs-growth.md)

---

## Bài tập bổ sung 2 — "Không đồng ý với Leader" (Case 4, role-play 10')

**Tình huống:** Leader chốt đi theo phương án X. Member tin phương án Y tốt hơn và có lý do.

Chạy mô hình: **Disagree → Challenge → Discuss → Commit → Execute → Learn.**

- 2 người role-play: 1 member phản biện, 1 Leader.
- Member phải phản biện **bằng evidence**, không bằng cảm tính ("em thấy vậy").
- Sau khi Leader vẫn quyết X: member **commit và execute X**, KHÔNG âm thầm làm Y.
- Cả phòng thảo luận: phản biện thế nào là mạnh mà vẫn đúng mực? Và vì sao "commit sau khi quyết" là bắt buộc?

Điểm chốt: Growth Mindset **không** có nghĩa "Leader nói gì cũng đúng"; cũng **không** có nghĩa "tôi không đồng ý nên tôi làm theo ý tôi". Nó là: phản biện hết mình *trước* khi quyết, cam kết hết mình *sau* khi quyết.

---

## Bài tập bổ sung 3 — "Escalate đúng cách" (5')

Mỗi người viết 1 câu escalate cho tình huống của chính mình, đủ 3 phần:
1. Fact + risk (điều gì đang đe doạ outcome)
2. Đề xuất (tối thiểu 1 option, tốt hơn là 2)
3. Cần gì từ ai, trước khi nào

Câu KHÔNG đạt: "Em lo không kịp deadline."
Câu đạt: "Task X có nguy cơ trễ 2 ngày vì block ở dữ liệu Business (từ thứ Ba). Em đề xuất cắt phần Z giữ deadline, hoặc lùi 2 ngày giữ full scope. Em cần anh hỗ trợ đẩy Business phản hồi trước thứ Năm."
