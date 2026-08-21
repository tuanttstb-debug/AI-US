# BRD — <Tên sản phẩm / tính năng>
**Đơn vị:** <Khối/Trung tâm> · **Mã tài liệu:** BRD-<MÃ>-v0.1 · **Trạng thái:** Nháp

> Copy file này thành `BRD_<sản phẩm>_v0.1.md` rồi điền. Xoá mọi dòng `<...>` và ghi chú `>`.
> Nguyên tắc viết: `04_Knowledge/references/REF-BRD-WRITING.md`. Rà trước phát hành: `CHECKLIST.md`.

## Lịch sử tài liệu
| Phiên bản | Ngày | Người | Nội dung thay đổi |
|---|---|---|---|
| 0.1 | <yyyy-mm-dd> | <tên> | Bản nháp đầu |

## Mục lục
<tự sinh khi xuất .docx; giữ chỗ ở bản .md>

---

# 1. TỔNG QUAN

## 1.1 Thông tin người yêu cầu
| Người yêu cầu | Đơn vị | Ngày yêu cầu | Người soạn (BA) |
|---|---|---|---|
| <...> | <...> | <...> | <...> |

## 1.2 Nội dung yêu cầu
> 1 đoạn: làm **gì**, cho **ai**, phạm vi Phase này tới đâu.

## 1.3 Hiện trạng & lý do thực hiện
> Mô tả hiện trạng + **neo pháp lý/chính sách** (dẫn số hiệu văn bản/thông tư/quy định nội bộ).

## 1.4 Đánh giá lợi ích triển khai
| Tiêu chí | Chi tiết hiệu quả |
|---|---|
| <Tự động hoá / giảm thời gian> | <...> |
| <Kiểm soát rủi ro / tuân thủ> | <...> |
| <Trải nghiệm khách hàng> | <...> |
| <Doanh thu / chi phí> | <...> |

---

# 2. QUY TRÌNH NGHIỆP VỤ

## 2.1 Quy trình hiện tại (AS-IS)
### 2.1.1 Lưu đồ quy trình
> <chèn sơ đồ> — kèm chú thích actor/lane.

### 2.1.2 Mô tả quy trình
| STT | Bước | Người thực hiện | Hệ thống thực hiện | Mô tả nghiệp vụ |
|---|---|---|---|---|
| 1 | <...> | <...> | <...> | <...> |

### 2.1.3 Các Pain Point hiện tại
- **PP-01:** <điểm đau + hệ quả>
- **PP-02:** <...>

## 2.2 Quy trình mong muốn (TO-BE)
> Mỗi luồng = 1 tiểu mục: sơ đồ + đoạn mô tả. Mỗi luồng truy vết về ≥1 Pain Point.

### 2.2.1 Luồng <tên luồng> (giải quyết PP-0x)
> <sơ đồ> + <mô tả>

---

# 3. CHI TIẾT YÊU CẦU
> Nhóm theo tính năng/module. US đánh số **liên tục, không trùng** trong mỗi module.

## 3.1 <Tên tính năng / module>

### US-01 – <Actor> <hành động>
**Mô tả:** Là **<vai trò>**, tôi muốn **<chức năng>**, để **<mục đích>**.

**Acceptance Criteria:**
- **AC1:** <điều kiện chuẩn — kiểm thử được>
- **AC2:** <chuyển trạng thái: từ … → …, ai kích hoạt>
- **AC3 (ngoại lệ):** <timeout / validate lỗi / vượt ngưỡng / retry / từ chối quyền>

**Đặc tả trường** *(nếu có màn hình):*
| STT | Tên trường | Bắt buộc | Cho sửa | Mô tả nghiệp vụ |
|---|---|---|---|---|
| 1 | <...> | Có/Không | Có/Không | <...> |

**Phân quyền** *(nếu có RBAC):*
| Vai trò | Quyền xem | Quyền sửa/xóa | Phạm vi dữ liệu |
|---|---|---|---|
| <...> | <...> | <...> | <...> |

### US-02 – <Actor> <hành động>
> …

> **Maker-checker:** với luồng tạo/sửa hồ sơ, đảm bảo có **Tay 1 (Maker)** và **Tay 2 (KSV duyệt)** + trạng thái *Nháp / Chờ duyệt / Duyệt / Từ chối*.

## 3.n Yêu cầu phi chức năng (NFR)
| Nhóm yêu cầu | Chi tiết | Diễn giải ý nghĩa |
|---|---|---|
| Hiệu năng | <ngưỡng cụ thể: vd phản hồi ≤ Ns> | <...> |
| Bảo mật | <...> | <...> |
| Nhật ký/Audit | <...> | <...> |
| Khả dụng | <...> | <...> |

---

# PHỤ LỤC

## A. Roadmap phát triển theo giai đoạn
**Mục tiêu:** <...>

| Giai đoạn | Phạm vi | Kết quả kỳ vọng |
|---|---|---|
| Phase 1 | <...> | <...> |
| Phase 2 | <...> | <...> |

**Lưu ý:** <giả định, phụ thuộc, ngoài phạm vi>

## B. Thuật ngữ (Glossary)
| Thuật ngữ | Giải nghĩa |
|---|---|
| <VA> | <Virtual Account — …> |

## C. Tài liệu tham chiếu
- <văn bản pháp lý, chính sách nội bộ, BRD liên quan>
