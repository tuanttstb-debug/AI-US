---
id: RULE-cross-repo-workflow
type: rule
title: Quy trình làm việc xuyên repo (Hub AIOS ⇄ Spoke dự án)
owner: PER-TTT
version: 1
updated: 2026-08-22
related: [RULE-collaboration, RULE-data-boundary, PRJ-SHTD]
---

Mục tiêu: khi làm việc bắt đầu từ **AIOS (hub)** rồi `cd` sang các **dự án spoke** (SHTD, SG…), mọi thay đổi được fix **đúng repo sở hữu gốc**, AIOS **nắm đồng thời** mọi thay đổi, và **không tái diễn** lỗi "vá hub nhưng quên dự án chính".

> **Bối cảnh sự cố (2026-08-21):** báo cáo tuần AIOS hiện deadline sai (`BL1-026`). Truy vết dừng ở tầng hub → chỉ thêm freshness guard trong AIOS, **bỏ sót gốc dữ liệu ở SHTD** (cột ngày Sheet bị localise lại). Gốc thật chỉ được fix hôm sau (`DateGuard.gs`). Luật này sinh ra để chặn kiểu bỏ sót đó.

---

## 1. Nguyên tắc sở hữu (ai fix cái gì)

| Tầng | Repo SỞ HỮU | Được phép làm |
|---|---|---|
| Registry, skill, tri thức chung, orchestrate báo cáo, luật, session protocol | **AIOS (hub)** | Vá **phòng thủ** (guard, honest footer, cảnh báo) — KHÔNG thay gốc của spoke |
| Code app, schema, GAS backend, **dữ liệu nguồn**, nghiệp vụ | **Spoke** (SHTD/SG…) | Fix **gốc thật** ở đây |

> **⚖ Luật vàng:** *Một fix thuộc về repo sở hữu GỐC.* Hub được thêm guard, nhưng nếu gốc nằm ở spoke thì **spoke PHẢI được fix — hoặc mở `TECH_DEBT` + `TODO` trong spoke ngay phiên đó.** "Đã vá hub" **KHÔNG** được tính là xong.

---

## 2. Giao thức truy vết bug xuyên repo (bước bắt buộc trước khi vá)

Khi triệu chứng nổi ở **đầu ra của hub** (báo cáo / email / digest / dashboard):

1. **Vẽ chuỗi dữ liệu (data lineage)** từ đầu ra ngược về nguồn — mỗi mắt xích là 1 tầng có thể sai.
2. **Định vị tầng SAI SỚM NHẤT** — *không dừng ở nguyên nhân hợp lý đầu tiên.* Hỏi tiếp: "giá trị này sinh ra tận cùng ở đâu?"
3. **Phân loại gốc:** `hub-logic` · `hub-freshness` · `spoke-backend` · `spoke-data` · `spoke-frontend`.
4. **Fix tại tầng sở hữu.** Nếu là spoke → `cd` sang spoke, fix + test **ở đó**.
5. Hub **vẫn nên** thêm guard phòng thủ, nhưng **mở TECH_DEBT + TODO trong spoke** nếu gốc chưa fix cùng phiên.
6. **Ghi liên kết chéo** vào `AI_CONTEXT` của **CẢ HAI** repo (hub ghi "gốc ở spoke X"; spoke ghi "triệu chứng phát hiện qua hub").

### 📋 Checklist truy vết (dán vào phiên khi gặp bug xuyên repo)

```
BUG: <triệu chứng, ở đâu thấy>
[1] Data lineage (đầu ra → nguồn):
    <ví dụ weekly-report>
    email ← build_email(AIOS) ← aggregate(AIOS) ← snapshot(AIOS cache)
          ← GAS read(SPOKE) ← Sheet(SPOKE)   |  gửi qua: send-report RELAY (SPOKE GAS)
[2] Tầng sai sớm nhất: __________  Phân loại: hub-logic|hub-freshness|spoke-backend|spoke-data|spoke-frontend
[3] Repo sở hữu gốc: __________
[4] Fix ở repo sở hữu? (Y/N) ____   | Guard phòng thủ ở hub? (Y/N) ____
[5] Nếu gốc chưa fix → TECH_DEBT + TODO trong SPOKE: (link) ______
[6] Cross-ref AI_CONTEXT cả 2 repo: (Y/N) ____   | Test ở repo sở hữu logic: (Y/N) ____
```

> **Bài học chuẩn:** vụ `BL1-026` — deadline do **AIOS dựng**, GAS spoke chỉ **relay HTML** (không parse) → gốc là **spoke-data** (Sheet). Nếu chạy checklist này hôm 08-21, ô [2]/[3] đã chỉ thẳng SHTD.

---

## 3. Vòng đời phiên 5 nhịp (đa dự án)

| Nhịp | Hành động | Mục tiêu |
|---|---|---|
| **1. Start-hub** | `/start` ở AIOS | Nạp portfolio + luật chung |
| **2. Enter-spoke** | `/enter <đường-dẫn-spoke>` — đọc **4 file AI_CONTEXT** của spoke (chỉ delta trên cùng, **KHÔNG quét repo**) | Nạp context spoke đúng, nhẹ |
| **3. Work** | Fix tại **repo sở hữu gốc** (theo §1–§2) | Đúng chỗ |
| **4. Exit-spoke** | Cập nhật AI_CONTEXT spoke + commit + cross-ref | Spoke tự ghi vết |
| **5. Sync-hub** | `/handover` chạy `portfolio-digest` + ghi 1 dòng vào `00_System/CROSS_REPO_LOG.md` | **AIOS nắm đồng thời** |

---

## 4. Definition of Done — bug/feature xuyên repo
- [ ] Repo sở hữu gốc đã xác định (qua data lineage §2).
- [ ] Gốc đã fix ở repo đó **HOẶC** debt-ticket + TODO trong repo đó.
- [ ] Test nằm ở **repo sở hữu logic** (không port tay sang hub).
- [ ] `AI_CONTEXT` **cả hai** repo có cross-ref.
- [ ] `CROSS_REPO_LOG.md` (hub) cập nhật + `portfolio-digest` chạy.
- [ ] Data-boundary giữ nguyên (không commit tên KH/secret — xem `RULE-data-boundary`).

---

## 5. Ranh giới với các luật khác
- **`RULE-collaboration`** phân vai *người* (Cowork/CC/TT) — luật này phân *repo* (hub/spoke). Bổ trợ, không thay thế.
- **`RULE-data-boundary`** vẫn tối thượng: hub đọc dữ liệu spoke nhưng KHÔNG đẩy dữ liệu KH/secret lên cloud/GitHub.
