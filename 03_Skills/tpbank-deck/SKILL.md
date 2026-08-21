---
name: tpbank-deck
type: skill
description: Dựng file PowerPoint (.pptx) theo chuẩn nhận diện TPBank — màu, logo, dải accent, font, layout lấy từ template gốc "Báo cáo dự án Biz Anchor Lending". Tái sử dụng asset brand thật (logo, nền tím, dải gold→magenta). 6 layout dựng sẵn: Title · Section · Content · KPI · Table · Closing. Kích hoạt khi cần tạo báo cáo/thuyết trình PPTX gửi nội bộ hoặc trình lãnh đạo theo nhận diện TPBank.
owner: PER-TTT
version: 1
updated: 2026-08-21
---

## Mục tiêu
Sinh nhanh slide PowerPoint đúng nhận diện TPBank bằng code (python-pptx), không phải căn chỉnh tay. Mọi màu/font/vị trí/logo đã chuẩn hóa từ template thật — chỉ cần đổ nội dung.

## Nguồn chuẩn
Trích **chỉ phần thiết kế** (không lấy nội dung) từ:
`D:\Workspace\SCF\00_PM_Hub\01_Báo cáo & Trình duyệt\Báo cáo dự án Biz Anchor Lending_updated SPTD.pptx`
→ SCF là dự án tham khảo (xem memory `scf-reference-project`).

## Khổ slide
**33.87 × 19.05 cm** (13.33 × 7.5 in) — 16:9 widescreen.

## Brand tokens (màu)
| Token | Hex | Dùng cho |
|---|---|---|
| `PURPLE` | `#5E2E86` | Tím chủ đạo — tiêu đề, header bảng, marker |
| `PURPLE_DARK` | `#2C1E61` | Tím đậm/navy — nền gradient sâu |
| `PURPLE_MID` | `#8077B2` | Tím trung |
| `PURPLE_SOFT` | `#9D99B6` | Tím xám nhạt |
| `LAVENDER` | `#F1E9F7` | Nền panel / hàng bảng xen kẽ / KPI tile |
| `GOLD` | `#FFC000` | Accent chính — dải, viền trên KPI, footer |
| `ORANGE` | `#F7941D` | Cam — logo, đường kẻ header |
| `MAGENTA` | `#C000C0` | Hồng accent (trong dải gradient) |
| `INK` | `#212121` | Text body |
| `RED` | `#FF0000` | Nhấn / cảnh báo |
| `CREAM` | `#FDFCF6` | Nền slide content (sáng ấm) |

> Lưu ý: theme Office trong file gốc là mặc định (Calibri/xanh) — **KHÔNG dùng**. Màu brand thật nằm ở shape fills & run colors ở trên.

## Font
- **Chính: Roboto** (body + tiêu đề). File gốc dùng Roboto (nhiều nhất) + Tahoma.
- Fallback: Arial/Calibri (PowerPoint tự thay nếu máy chưa cài Roboto). ✅ Máy làm việc hiện tại **đã cài Roboto** (Roboto / Roboto Condensed) — render đúng chuẩn. Máy khác nhận file cần cài Roboto để không bị thay font.
- Cỡ chuẩn: body 12–16pt · bullet 16–17pt · tiêu đề content 24pt · title bìa 40pt · section 34pt.

## Layout & vị trí (từ template gốc)
| Thành phần | Vị trí (cm) | Kích thước (cm) |
|---|---|---|
| Logo top-left (content) | (1.16, 0.58) | 4.97 × 1.11 |
| Dải accent gold→magenta | (0, ~1.95) full width | cao ~0.5 |
| Tiêu đề content | (1.16, 2.7) | — |
| Vùng nội dung | (1.16, 4.4) | 31.5 × 13.5 |
| Nền title/section | full slide | 33.87 × 19.05 (logo trắng + tagline baked góc dưới-phải) |

## Assets (bản brand thật, trong `assets/`)
| File | Nguồn | Dùng cho |
|---|---|---|
| `logo-color.png` | logo tím + biểu tượng cam, nền trong suốt | góc trên-trái slide content |
| `logo-color-alt.png` | biến thể logo 2 | dự phòng |
| `accent-bar.png` | dải gradient gold→cam→magenta, trong suốt | divider dưới header |
| `bg-title.jpg` | nền tím gradient (logo trắng + tagline + accent baked) | slide Title / Section / Closing |

## Cách dùng
```python
import sys; sys.path.insert(0, r"D:\Workspace\AIOS\03_Skills\tpbank-deck")
from tpbank_deck import Deck, C   # C = bảng màu brand

d = Deck()
d.title_slide("BÁO CÁO DỰ ÁN", "Biz Anchor Lending", "SPTD · Q3/2026")
d.section_slide("Phần 1", "Tổng quan & tiến độ")

s = d.content_slide("Tình hình triển khai", kicker="Cập nhật tuần")
d.bullets(s, [
    "Điểm thường",
    ("Nhấn: ", "phần in đậm sau nhãn"),      # tuple = (nhãn đậm, phần thường)
])

d.kpi_slide("Chỉ số chính", [("12","Hồ sơ"), ("3","Chờ duyệt"), ("95%","Đúng hạn")])

d.table_slide("Kế hoạch", [
    ["Hạng mục","Chủ trì","Hạn"],          # hàng 0 = header (tự tô tím)
    ["Phân tích","PO","30/06"],
], col_widths=[3, 1.4, 1.2])               # tỉ lệ cột (tùy chọn)

d.closing_slide("Trân trọng cảm ơn", "Vì chúng tôi hiểu bạn")
d.save(r"đường-dẫn\bao-cao.pptx")
```
Chạy: `cd 03_Skills/tpbank-deck && PYTHONUTF8=1 python <script>.py`
Phụ thuộc: `python-pptx` (đã cài). Demo: `python demo_build.py` → `demo-tpbank-deck.pptx`.

## API 6 layout
| Hàm | Layout | Ghi chú |
|---|---|---|
| `title_slide(title, subtitle, meta)` | Bìa | nền tím, logo trắng baked |
| `section_slide(label, title)` | Phân đoạn | nền tím, label gold + tiêu đề trắng |
| `content_slide(title, kicker="")` | Nội dung | nền kem, logo top-left, accent bar, footer — **trả về slide** để đổ nội dung |
| `bullets(slide, items, size=16)` | — | item = str hoặc tuple `(nhãn_đậm, phần_thường)` |
| `kpi_slide(title, [(số, nhãn)…])` | KPI | thẻ lavender viền gold, số tím lớn |
| `table_slide(title, rows, col_widths=None)` | Bảng | header tím, hàng xen kẽ lavender |
| `closing_slide(message, sub="")` | Kết | nền tím, lời cảm ơn |
| `save(path)` | — | xuất .pptx |

Thêm nội dung tự do trên content slide: dùng `d.body_box()` lấy vùng (x,y,w,h) khả dụng, `d.panel(...)` vẽ khối nền, hằng số màu trong `C`.

## Render kiểm tra (Windows, PowerPoint COM)
```powershell
$pp = New-Object -ComObject PowerPoint.Application
$deck = $pp.Presentations.Open("<file>.pptx", $true, $false, $false)
$i=1; foreach ($sl in $deck.Slides) { $sl.Export("slide$i.png","PNG",1280,720); $i++ }
$deck.Close(); $pp.Quit()
```

## Kiểm tra chất lượng
- [ ] Khổ 16:9 (33.87 × 19.05 cm).
- [ ] Logo TPBank đúng vị trí (content: trên-trái; title/closing: baked góc dưới-phải).
- [ ] Dải accent gold→magenta dưới header slide content.
- [ ] Màu tím `#5E2E86` + gold `#FFC000`, KHÔNG dùng theme Office mặc định.
- [ ] Font Roboto (hoặc fallback sạch); tiếng Việt có dấu hiển thị đúng.
- [ ] Tiêu đề tím, bảng header tím + hàng lavender xen kẽ.
- [ ] Không rò rỉ nội dung khách hàng nếu deck gửi ra ngoài (RULE-data-boundary).

## Ghi chú quyết định
- **Tái sử dụng asset brand gốc** (logo/nền/dải) thay vì vẽ lại bằng shape — pixel-accurate với template TPBank (duyệt PER-TTT 2026-08-21).
- Nền title/section dùng **1 ảnh JPG** có logo trắng + tagline + accent baked sẵn → chỉ cần thêm text, không lệch brand.
- Slide content vẽ chrome bằng **asset thật** (logo PNG + accent-bar PNG) + shape (nền kem, footer) → crisp hơn ảnh nền JPG low-res của template.
- Icon: template gốc **không nhúng icon raster** (dùng shape vector/SmartArt + motif tam giác). Skill chưa gói bộ icon — nếu cần, thêm sau bằng shape hoặc emoji/vector.
