// build_report.js — Dựng .docx BÁO CÁO TUẦN TRUNG TÂM từ report_data.json + 2 chart PNG.
// Data-driven, 5 mảng nghiệp vụ. Chạy pipeline: run.js (fetch→aggregate→charts→build).
// Chỉ metadata; mảng 3 (case) ĐÃ ẨN tên KH ở bước aggregate (chỉ ĐVKD + giá trị + stage).

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, ImageRun, LevelFormat,
} = require('docx');
const { makeCharts } = require('./make_charts');

const REPO = path.resolve(__dirname, '..', '..');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'report_data.json'), 'utf8'));

const PRIMARY = '4B1FAF', ACCENT = 'FF7A00', G = '16A34A', A = 'D97706', R = 'DC2626';
const TEXT = '0F172A', MUT = '475569', LIGHT = 'F0F2F8', LINE = 'E2E8F0';
const FONT = 'Calibri', CW = 9746;
const ragHex = (rag) => rag === 'Red' ? R : rag === 'Amber' ? A : G;
const noBorder = { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };
const thin = (c = LINE) => ({ style: BorderStyle.SINGLE, size: 4, color: c });

function t(x, { b = false, c = TEXT, sz = 22, i = false } = {}) { return new TextRun({ text: String(x == null ? '' : x), bold: b, italics: i, color: c, size: sz, font: FONT }); }
function p(ch, o = {}) { return new Paragraph({ children: Array.isArray(ch) ? ch : [ch], ...o }); }
function label(l, v) { return p([t(l + ' ', { b: true, c: PRIMARY }), t(v)], { spacing: { after: 80 } }); }
function hcell(x, w) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: PRIMARY, color: 'auto' }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [p(t(x, { b: true, c: 'FFFFFF', sz: 20 }))] }); }
function cell(ch, w, fill) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: fill ? { type: ShadingType.CLEAR, fill, color: 'auto' } : undefined, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: Array.isArray(ch) ? ch : [ch] }); }
function ragCell(x, color, w) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: color, color: 'auto' }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [p(t(x, { b: true, c: 'FFFFFF', sz: 18 }), { alignment: AlignmentType.CENTER })] }); }
const short = (title) => title.replace(/^\d+\.\s*/, '');
const fmtTy = (n) => { if (n >= 1000) return (n / 1000).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' nghìn tỷ'; return n.toLocaleString('vi-VN') + ' tỷ'; };
function fmtTs(iso) { try { return new Date(iso).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }); } catch (e) { return iso; } }

const charts = makeCharts(DATA, __dirname);

// ── Tình hình 1 dòng cho mỗi mảng ──
function situationLine(a) {
  if (a.kind === 'case') {
    const stages = Object.entries(a.byStage).sort((x, y) => y[1] - x[1]).slice(0, 3).map(([s, n]) => `${s}: ${n}`).join(' · ');
    return `${a.nActive} hồ sơ lớn đang theo dõi · ~${fmtTy(a.totalValue)} · ${stages}`;
  }
  const parts = [`${a.nActive} việc đang chạy`];
  if (a.nThisWeek) parts.push(`${a.nThisWeek} phát sinh tuần này`);
  if (a.teams && a.teams.length) parts.push('Team: ' + a.teams.join(', '));
  if (a.needBLD.length) parts.push(`${a.needBLD.length} cần BLĐ`);
  if (a.blockers.length) parts.push(`${a.blockers.length} vướng mắc`);
  return parts.join(' · ') + '.';
}

// ── Section 1: bảng tổng quan ──
const cols = [2650, 1300, 900, 4896];
const overviewRows = DATA.areas.map((a, idx) => new TableRow({ children: [
  cell(p(t((a.no + '. ' + short(a.title)), { b: true })), cols[0], idx % 2 ? 'FFFFFF' : LIGHT),
  ragCell(a.statusText, ragHex(a.rag), cols[1]),
  cell(p(t(String(a.nActive), { b: true }), { alignment: AlignmentType.CENTER }), cols[2], idx % 2 ? 'FFFFFF' : LIGHT),
  cell(p(t(situationLine(a))), cols[3], idx % 2 ? 'FFFFFF' : LIGHT),
]}));
const overviewTable = new Table({ columnWidths: cols, width: { size: CW, type: WidthType.DXA },
  borders: { top: thin(), bottom: thin(), left: thin(), right: thin(), insideHorizontal: thin(), insideVertical: thin() },
  rows: [new TableRow({ tableHeader: true, children: [hcell('Mảng', cols[0]), hcell('Sức khỏe', cols[1]), hcell('Đang chạy', cols[2]), hcell('Tình hình', cols[3])] }), ...overviewRows] });

// ── Charts ──
const imgRow = new Table({ columnWidths: [5846, 3900], width: { size: CW, type: WidthType.DXA }, borders: noBorder,
  rows: [new TableRow({ children: [
    new TableCell({ width: { size: 5846, type: WidthType.DXA }, borders: noBorder, children: [
      p(t('Khối lượng đang chạy theo mảng', { b: true, c: MUT, sz: 18 })),
      p(new ImageRun({ type: 'png', data: fs.readFileSync(charts.prog), transformation: { width: 405, height: 166 } }))] }),
    new TableCell({ width: { size: 3900, type: WidthType.DXA }, borders: noBorder, children: [
      p(t('Sức khỏe tổng thể (RAG)', { b: true, c: MUT, sz: 18 })),
      p(new ImageRun({ type: 'png', data: fs.readFileSync(charts.donut), transformation: { width: 172, height: 172 } }), { alignment: AlignmentType.CENTER })] }),
  ]})] });

// ── BLĐ box: gom cần BLĐ toàn 5 mảng ──
const bldItems = [];
DATA.areas.forEach((a) => {
  if (a.kind === 'case') a.needBLD.forEach((b) => bldItems.push({ area: 'Hồ sơ', text: `${b.khach || b.dvkd || 'KH'}${b.dvkd ? ' (' + b.dvkd + ')' : ''} · ${b.loai} · ${fmtTy(b.giaTri)} — ${b.stage}${b.vuong ? ' (' + b.vuong + ')' : ''}` }));
  else a.needBLD.forEach((b) => bldItems.push({ area: short(a.title).split('&')[0].trim(), text: b.noiDung }));
});
const bldChildren = [p([t('⚑ Cần BLĐ quyết / cho ý kiến tuần này', { b: true, c: '854F0B' })], { spacing: { after: 60 } })];
if (!bldItems.length) bldChildren.push(p(t('Không có việc cần BLĐ quyết trong tuần.', { i: true, c: MUT })));
else bldItems.slice(0, 12).forEach((b) => bldChildren.push(p([t(b.area + ' — ', { b: true }), t(b.text)], { spacing: { after: 40 } })));
if (bldItems.length > 12) bldChildren.push(p(t(`… và ${bldItems.length - 12} mục khác.`, { i: true, c: MUT, sz: 18 })));
const bldBox = new Table({ columnWidths: [CW], width: { size: CW, type: WidthType.DXA },
  borders: { top: thin(ACCENT), bottom: thin(ACCENT), left: { style: BorderStyle.SINGLE, size: 24, color: ACCENT }, right: thin(ACCENT) },
  rows: [new TableRow({ children: [new TableCell({ width: { size: CW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FBEEDA', color: 'auto' }, margins: { top: 120, bottom: 120, left: 160, right: 160 }, children: bldChildren })] })] });

// ── Section 2: chi tiết theo mảng ──
function areaHeading(a) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 220, after: 80 },
    children: [t(a.no + '. ' + short(a.title) + '  ', { b: true, c: PRIMARY, sz: 26 }), t('● ' + a.statusText, { b: true, c: ragHex(a.rag), sz: 20 })] });
}
function caseTable(a) {
  const cw = [2350, 900, 1150, 1050, 1900, 2396];
  const rows = [new TableRow({ tableHeader: true, children: [hcell('Khách hàng', cw[0]), hcell('ĐVKD', cw[1]), hcell('Loại hình', cw[2]), hcell('Giá trị', cw[3]), hcell('Giai đoạn', cw[4]), hcell('Bước tiếp theo', cw[5])] })];
  a.top.forEach((r, i) => rows.push(new TableRow({ children: [
    cell(p(t(r.khach || '—', { b: true })), cw[0], i % 2 ? 'FFFFFF' : LIGHT),
    cell(p(t(r.dvkd || '—')), cw[1], i % 2 ? 'FFFFFF' : LIGHT),
    cell(p(t(r.loai + (r.complexity ? ` · ${r.complexity}` : ''))), cw[2], i % 2 ? 'FFFFFF' : LIGHT),
    cell(p(t(fmtTy(r.giaTri), { b: true }), { alignment: AlignmentType.CENTER }), cw[3], i % 2 ? 'FFFFFF' : LIGHT),
    cell(p(t(r.stage)), cw[4], i % 2 ? 'FFFFFF' : LIGHT),
    cell(p(t(r.next || '—')), cw[5], i % 2 ? 'FFFFFF' : LIGHT),
  ]})));
  return new Table({ columnWidths: cw, width: { size: CW, type: WidthType.DXA }, borders: { top: thin(), bottom: thin(), left: thin(), right: thin(), insideHorizontal: thin(), insideVertical: thin() }, rows });
}
function areaBlock(a) {
  const out = [areaHeading(a)];
  if (a.kind === 'case') {
    const stages = Object.entries(a.byStage).sort((x, y) => y[1] - x[1]).map(([s, n]) => `${s} (${n})`).join(' · ');
    out.push(label('Quy mô:', `${a.nActive} hồ sơ lớn đang theo dõi, tổng giá trị ~${fmtTy(a.totalValue)}. Sức khỏe: ${a.ragCounts.Green} xanh · ${a.ragCounts.Amber} vàng · ${a.ragCounts.Red} đỏ.`));
    out.push(label('Phân bố giai đoạn:', stages));
    if (a.teams && a.teams.length) out.push(label('Đơn vị chủ trì:', a.teams.join(', ')));
    out.push(p(t('Top hồ sơ theo giá trị:', { b: true, c: MUT, sz: 20 }), { spacing: { before: 80, after: 60 } }));
    out.push(caseTable(a));
    return out;
  }
  out.push(label('Tình hình:', situationLine(a)));
  if (a.highlights && a.highlights.length) {
    out.push(p(t('Việc trọng tâm:', { b: true, c: MUT, sz: 20 }), { spacing: { before: 60, after: 40 } }));
    a.highlights.slice(0, 5).forEach((h) => out.push(p([t('• ', { b: true, c: PRIMARY }), t(`${h.name} `, { b: true }), t(`— ${h.pct} · ${h.team}${h.next ? ' · KH tuần tới: ' + h.next : ''}`, { c: MUT })], { spacing: { after: 40 } })));
  }
  if (a.thisWeek && a.thisWeek.length) {
    out.push(p([t('Phát sinh tuần này ', { b: true, c: ACCENT, sz: 20 }), t(`(${a.nThisWeek})`, { c: MUT, sz: 20 })], { spacing: { before: 80, after: 40 } }));
    a.thisWeek.slice(0, 6).forEach((h) => out.push(p([t('› ', { b: true, c: ACCENT }), t(`${h.name} `), t(`— ${h.pct} · ${h.team}${h.ketQua ? ' · ' + h.ketQua : ''}`, { c: MUT })], { spacing: { after: 30 } })));
  }
  if (a.blockers && a.blockers.length) out.push(label('Vướng mắc nổi bật:', a.blockers.slice(0, 3).map((b) => b.vuong).filter(Boolean).join(' · ') || '—'));
  return out;
}

// ── Section 3: kế hoạch tuần tới ──
const bullet = (x) => new Paragraph({ numbering: { reference: 'plan', level: 0 }, children: [t(x)] });
function planBullets() {
  return DATA.areas.map((a) => {
    const nm = short(a.title).split('&')[0].trim();
    if (a.kind === 'case') return bullet(`${nm}: đẩy các hồ sơ chờ thẩm định/bổ sung hồ sơ; xử lý ${a.needBLD.length} hồ sơ cần BLĐ.`);
    let s = `tiếp tục ${a.nActive} việc đang chạy`;
    if (a.needBLD.length) s += `; trình BLĐ ${a.needBLD.length} việc`;
    if (a.blockers.length) s += `; tháo ${a.blockers.length} vướng mắc`;
    return bullet(`${nm}: ${s}.`);
  });
}

const doc = new Document({
  numbering: { config: [{ reference: 'plan', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { run: { color: PRIMARY } } }] }] },
  styles: { default: { document: { run: { font: FONT, size: 22, color: TEXT } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 28, bold: true, color: PRIMARY }, paragraph: { spacing: { before: 240, after: 120 } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 26, bold: true, color: PRIMARY } },
    ] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
    children: [
      new Table({ columnWidths: [CW], width: { size: CW, type: WidthType.DXA }, borders: noBorder, rows: [new TableRow({ children: [
        new TableCell({ width: { size: CW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: PRIMARY, color: 'auto' }, margins: { top: 160, bottom: 160, left: 200, right: 200 }, children: [
          p(t('BÁO CÁO TUẦN — TRUNG TÂM SẢN PHẨM & GIẢI PHÁP TÍN DỤNG', { b: true, c: 'FFFFFF', sz: 28 })),
          p(t('Khối Khách hàng Doanh nghiệp · TPBank', { c: 'E9E4FB', sz: 18 }), { spacing: { before: 40 } }),
        ] })] })] }),
      p([t('Kỳ: ', { b: true }), t(`${DATA.weekLabel} · số liệu LIVE đến ${fmtTs(DATA.source.fetchedAt)}    `), t('Nơi nhận: ', { b: true }), t('Giám đốc Trung tâm (cc: đầu mối liên quan)')], { spacing: { before: 160, after: 120 } }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [t('1. Tổng quan điều hành', { b: true, c: PRIMARY, sz: 28 })] }),
      overviewTable,
      p(t(' ', { sz: 8 })),
      imgRow,
      p(t(' ', { sz: 8 })),
      bldBox,

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 280 }, children: [t('2. Chi tiết theo mảng', { b: true, c: PRIMARY, sz: 28 })] }),
      ...DATA.areas.flatMap(areaBlock),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 280 }, children: [t('3. Trọng tâm tuần tới', { b: true, c: PRIMARY, sz: 28 })] }),
      ...planBullets(),

      p(t(`— Nguồn: SHTD Dashboard (Google Sheets) đọc LIVE: ${DATA.totals.tasksAll} task (${DATA.totals.tasksActive} đang chạy) · ${DATA.totals.casesAll} hồ sơ. Chỉ metadata công việc; hồ sơ đã ẩn tên khách hàng. —`, { i: true, c: MUT, sz: 18 }), { spacing: { before: 280 }, alignment: AlignmentType.CENTER }),
    ],
  }],
});

const wk = DATA.weekLabel.match(/Tuần\s*(\d+)\/(\d+)/);
const wnn = wk ? `${wk[2]}-W${String(wk[1]).padStart(2, '0')}` : 'kydacthu';
const outDir = path.join(REPO, '05_Journal', 'reports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = process.env.OUT_DOCX || path.join(outDir, `RPT-${wnn}_bao-cao-tuan.docx`);
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(outPath, b); console.log('DOCX OK', b.length, '→', outPath); });
