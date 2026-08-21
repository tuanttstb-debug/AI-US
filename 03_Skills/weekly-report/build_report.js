// build_report.js — Dựng .docx BÁO CÁO TUẦN KHỐI (điều hành-first) từ report_data.json + 2 chart.
// Cấu trúc: Trang điều hành (cần quyết / cảnh báo quá hạn / thắng lợi / milestone) → Ưu tiên 1 (core)
// → Ưu tiên 2 (AI + phát triển năng lực) → Trọng tâm tuần tới. Data-driven, chỉ metadata (nội bộ).

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
const ragHex = (r) => r === 'Red' ? R : r === 'Amber' ? A : G;
const noBorder = { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };
const thin = (c = LINE) => ({ style: BorderStyle.SINGLE, size: 4, color: c });

function t(x, { b = false, c = TEXT, sz = 22, i = false } = {}) { return new TextRun({ text: String(x == null ? '' : x), bold: b, italics: i, color: c, size: sz, font: FONT }); }
function p(ch, o = {}) { return new Paragraph({ children: Array.isArray(ch) ? ch : [ch], ...o }); }
function label(l, v) { return p([t(l + ' ', { b: true, c: PRIMARY }), t(v)], { spacing: { after: 60 } }); }
function hcell(x, w) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: PRIMARY, color: 'auto' }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [p(t(x, { b: true, c: 'FFFFFF', sz: 20 }))] }); }
function cell(ch, w, fill) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: fill ? { type: ShadingType.CLEAR, fill, color: 'auto' } : undefined, margins: { top: 50, bottom: 50, left: 100, right: 100 }, children: Array.isArray(ch) ? ch : [ch] }); }
function ragCell(x, color, w) { return new TableCell({ width: { size: w, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: color, color: 'auto' }, margins: { top: 50, bottom: 50, left: 100, right: 100 }, children: [p(t(x, { b: true, c: 'FFFFFF', sz: 18 }), { alignment: AlignmentType.CENTER })] }); }
const short = (title) => title.replace(/^\d+\.\s*/, '');
const shortT = (title) => short(title).split('—')[0].split('&')[0].split('/')[0].trim();
const fmtTy = (n) => n >= 1000 ? (n / 1000).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' nghìn tỷ' : (n || 0).toLocaleString('vi-VN') + ' tỷ';
function fmtTs(iso) { try { return new Date(iso).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }); } catch (e) { return iso; } }

const charts = makeCharts(DATA, __dirname);
const EX = DATA.exec;
const P1 = DATA.areas.filter((a) => a.priority === 1);
const P2 = DATA.areas.filter((a) => a.priority === 2);

// ── Stat tiles (KPI điều hành) ──
function tile(num, lbl, color) {
  return new TableCell({ width: { size: CW / 5, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: LIGHT, color: 'auto' }, margins: { top: 90, bottom: 90, left: 80, right: 80 }, children: [
    p(t(num, { b: true, c: color, sz: 40 }), { alignment: AlignmentType.CENTER }),
    p(t(lbl, { c: MUT, sz: 16 }), { alignment: AlignmentType.CENTER }),
  ] });
}
const tiles = new Table({ columnWidths: [CW / 5, CW / 5, CW / 5, CW / 5, CW / 5], width: { size: CW, type: WidthType.DXA },
  borders: { top: thin('FFFFFF'), bottom: thin('FFFFFF'), left: thin('FFFFFF'), right: thin('FFFFFF'), insideHorizontal: thin('FFFFFF'), insideVertical: thin('FFFFFF') },
  rows: [new TableRow({ children: [
    tile(String(EX.nDecisions), 'Cần BLĐ quyết', ACCENT),
    tile(String(EX.alerts.nOverdue), 'Việc quá hạn', R),
    tile(String(EX.alerts.blockedCases), 'Hồ sơ blocked', A),
    tile(fmtTy(EX.alerts.blockedValue), 'Giá trị đang treo', A),
    tile(String(EX.milestones.length), 'Milestone ≤14 ngày', PRIMARY),
  ] })] });

// ── Box helper (viền màu) ──
function box(titleRun, children, edge) {
  return new Table({ columnWidths: [CW], width: { size: CW, type: WidthType.DXA },
    borders: { top: thin(edge), bottom: thin(edge), left: { style: BorderStyle.SINGLE, size: 24, color: edge }, right: thin(edge) },
    rows: [new TableRow({ children: [new TableCell({ width: { size: CW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FFFFFF', color: 'auto' }, margins: { top: 110, bottom: 110, left: 160, right: 160 }, children: [p(titleRun, { spacing: { after: 70 } }), ...children] })] })] });
}

// ① Cần BLĐ quyết
const decChildren = EX.decisions.length
  ? EX.decisions.map((d, i) => p([t(`${i + 1}. `, { b: true, c: ACCENT }), t(`[${d.type}] `, { b: true, c: PRIMARY }), t(d.label + (d.value ? ` — ${fmtTy(d.value)}` : '') + '  ', { b: true }), t(d.sub, { c: MUT })], { spacing: { after: 50 } }))
  : [p(t('Không có việc cần BLĐ quyết tuần này.', { i: true, c: MUT }))];
if (EX.nDecisions > EX.decisions.length) decChildren.push(p(t(`… và ${EX.nDecisions - EX.decisions.length} đề xuất khác.`, { i: true, c: MUT, sz: 18 })));
const boxDecisions = box([t('① CẦN BAN LÃNH ĐẠO QUYẾT / CHO Ý KIẾN', { b: true, c: '854F0B', sz: 22 })], decChildren, ACCENT);

// ② Cảnh báo
const al = EX.alerts;
const alertChildren = [
  p([t('Quá hạn: ', { b: true, c: R }), t(`${al.nOverdue} việc `), t('— ' + Object.entries(al.overdueByArea).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(' · '), { c: MUT })], { spacing: { after: 45 } }),
  p([t('Hồ sơ tắc: ', { b: true, c: A }), t(`${al.blockedCases} hồ sơ lớn đang Tạm dừng/Blocked, giá trị treo ~${fmtTy(al.blockedValue)}.`)], { spacing: { after: 45 } }),
];
if (al.redItems.length) alertChildren.push(p([t('Điểm đỏ: ', { b: true, c: R }), t(al.redItems.slice(0, 4).map((x) => `${x.name} (${x.team})`).join(' · '))]));
const boxAlerts = box([t('② CẢNH BÁO — RỦI RO & CHẬM TIẾN ĐỘ', { b: true, c: R, sz: 22 })], alertChildren, R);

// ③ + ④ Thắng lợi & Milestone (2 cột)
function listCol(titleRun, items) {
  return new TableCell({ width: { size: CW / 2, type: WidthType.DXA }, borders: { top: thin(), bottom: thin(), left: thin(), right: thin() }, margins: { top: 90, bottom: 90, left: 140, right: 140 },
    children: [p(titleRun, { spacing: { after: 60 } }), ...(items.length ? items : [p(t('—', { c: MUT }))])] });
}
const winItems = EX.wins.slice(0, 6).map((w) => p([t('✓ ', { b: true, c: G }), t(w.name + ' '), t('· ' + w.team, { c: MUT, sz: 18 })], { spacing: { after: 35 } }));
const msItems = EX.milestones.slice(0, 6).map((m) => p([t('◷ ', { b: true, c: PRIMARY }), t(m.name + ' '), t(`· ${m.init} · ${m.deadline}`, { c: MUT, sz: 18 })], { spacing: { after: 35 } }));
const winMs = new Table({ columnWidths: [CW / 2, CW / 2], width: { size: CW, type: WidthType.DXA }, borders: { top: thin(), bottom: thin(), left: thin(), right: thin(), insideVertical: thin() },
  rows: [new TableRow({ children: [
    listCol(t(`③ THẮNG LỢI 2 TUẦN (${EX.wins.length})`, { b: true, c: G, sz: 22 }), winItems),
    listCol(t(`④ MILESTONE TỚI HẠN ≤14 NGÀY (${EX.milestones.length})`, { b: true, c: PRIMARY, sz: 22 }), msItems),
  ] })] });

// ── Bảng tổng quan sức khỏe (real health) ──
const ocols = [2900, 1450, 900, 1150, 3346];
const overviewRows = DATA.areas.map((a, idx) => new TableRow({ children: [
  cell(p([t(`${a.no}. `, { b: true, c: MUT }), t(short(a.title), { b: true }), t(a.priority === 2 ? '  (ưu tiên 2)' : '', { c: MUT, sz: 16 })]), ocols[0], idx % 2 ? 'FFFFFF' : LIGHT),
  ragCell(a.statusText, ragHex(a.rag), ocols[1]),
  cell(p(t(String(a.nActive), { b: true }), { alignment: AlignmentType.CENTER }), ocols[2], idx % 2 ? 'FFFFFF' : LIGHT),
  cell(p(t(a.nOverdue ? String(a.nOverdue) : '—', { b: !!a.nOverdue, c: a.nOverdue ? R : MUT }), { alignment: AlignmentType.CENTER }), ocols[3], idx % 2 ? 'FFFFFF' : LIGHT),
  cell(p(t(overviewNote(a))), ocols[4], idx % 2 ? 'FFFFFF' : LIGHT),
]}));
const overviewTable = new Table({ columnWidths: ocols, width: { size: CW, type: WidthType.DXA },
  borders: { top: thin(), bottom: thin(), left: thin(), right: thin(), insideHorizontal: thin(), insideVertical: thin() },
  rows: [new TableRow({ tableHeader: true, children: [hcell('Mảng', ocols[0]), hcell('Sức khỏe thực', ocols[1]), hcell('Đang chạy', ocols[2]), hcell('Quá hạn', ocols[3]), hcell('Ghi chú', ocols[4])] }), ...overviewRows] });
function overviewNote(a) {
  if (a.kind === 'case') return `~${fmtTy(a.totalValue)} · ${a.nBlocked} blocked · ${a.needBLD.length} cần BLĐ`;
  if (a.kind === 'dev') { const th = Object.entries(a.byTheme || {}).sort((x, y) => y[1] - x[1]).map(([k, n]) => `${k} ${n}`).join(' · '); return `${a.nPeople} người · ${th}`; }
  const s = []; if (a.nThisWeek) s.push(`${a.nThisWeek} phát sinh tuần`); if (a.needBLD.length) s.push(`${a.needBLD.length} cần BLĐ`); if (a.blockers.length) s.push(`${a.blockers.length} vướng mắc`);
  return s.join(' · ') || 'Không phát sinh đáng chú ý.';
}

// ── Charts ──
const imgRow = new Table({ columnWidths: [5846, 3900], width: { size: CW, type: WidthType.DXA }, borders: noBorder,
  rows: [new TableRow({ children: [
    new TableCell({ width: { size: 5846, type: WidthType.DXA }, borders: noBorder, children: [
      p(t('Khối lượng đang chạy theo mảng', { b: true, c: MUT, sz: 18 })),
      p(new ImageRun({ type: 'png', data: fs.readFileSync(charts.prog), transformation: { width: 405, height: 190 } }))] }),
    new TableCell({ width: { size: 3900, type: WidthType.DXA }, borders: noBorder, children: [
      p(t('Đúng hạn (xanh) / Quá hạn (đỏ)', { b: true, c: MUT, sz: 18 })),
      p(new ImageRun({ type: 'png', data: fs.readFileSync(charts.donut), transformation: { width: 168, height: 168 } }), { alignment: AlignmentType.CENTER })] }),
  ]})] });

// ── Chi tiết mảng ──
function areaHeading(a) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 70 },
    children: [t(a.no + '. ' + short(a.title) + '  ', { b: true, c: PRIMARY, sz: 25 }), t('● ' + a.statusText, { b: true, c: ragHex(a.rag), sz: 19 }), t(a.nOverdue ? `  · ${a.nOverdue} quá hạn` : '', { b: true, c: R, sz: 18 })] });
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
    const stages = Object.entries(a.byStage).sort((x, y) => y[1] - x[1]).slice(0, 6).map(([s, n]) => `${s} (${n})`).join(' · ');
    out.push(label('Quy mô:', `${a.nActive} hồ sơ lớn đang theo dõi, ~${fmtTy(a.totalValue)}. ${a.nBlocked} tắc/blocked (~${fmtTy(a.blockedValue)}). Sức khỏe: ${a.ragCounts.Green} xanh · ${a.ragCounts.Amber} vàng.`));
    out.push(label('Giai đoạn:', stages));
    if (a.teams && a.teams.length) out.push(label('Đơn vị chủ trì:', a.teams.join(', ')));
    out.push(p(t('Top hồ sơ theo giá trị:', { b: true, c: MUT, sz: 20 }), { spacing: { before: 70, after: 50 } }));
    out.push(caseTable(a));
    return out;
  }
  if (a.kind === 'dev') {
    const th = Object.entries(a.byTheme || {}).sort((x, y) => y[1] - x[1]).map(([k, n]) => `${k}: ${n}`).join(' · ');
    out.push(label('Quy mô:', `${a.nActive} mục phát triển của ${a.nPeople} CBNV${a.pct != null ? `, tiến độ TB ${a.pct}%` : ''}.`));
    out.push(label('Theo chủ đề:', th));
    a.top.slice(0, 5).forEach((h) => out.push(p([t('• ', { b: true, c: PRIMARY }), t(`${h.noiDung} `), t(`— ${h.pct} · ${h.pic}`, { c: MUT })], { spacing: { after: 30 } })));
    return out;
  }
  const parts = [`${a.nActive} việc đang chạy`]; if (a.nThisWeek) parts.push(`${a.nThisWeek} phát sinh tuần này`); if (a.teams && a.teams.length) parts.push('Team: ' + a.teams.join(', '));
  out.push(label('Tình hình:', parts.join(' · ') + '.'));
  if (a.overdueList && a.overdueList.length) out.push(label('Quá hạn:', a.overdueList.slice(0, 4).map((x) => `${x.name} (${x.team}, hạn ${x.deadline})`).join(' · ')));
  if (a.highlights && a.highlights.length) {
    out.push(p(t('Việc trọng tâm:', { b: true, c: MUT, sz: 20 }), { spacing: { before: 50, after: 35 } }));
    a.highlights.slice(0, 4).forEach((h) => out.push(p([t('• ', { b: true, c: PRIMARY }), t(`${h.name} `, { b: true }), t(`— ${h.pct} · ${h.team}${h.next ? ' · KH tuần tới: ' + h.next : ''}`, { c: MUT })], { spacing: { after: 35 } })));
  }
  if (a.blockers && a.blockers.length) out.push(label('Vướng mắc:', a.blockers.slice(0, 2).map((b) => b.vuong).filter(Boolean).join(' · ') || '—'));
  return out;
}

// ── Trọng tâm tuần tới ──
const bullet = (x) => new Paragraph({ numbering: { reference: 'plan', level: 0 }, children: [t(x)] });
function planBullets() {
  return P1.concat(P2).map((a) => {
    const nm = shortT(a.title);
    if (a.kind === 'case') return bullet(`${nm}: gỡ ${a.nBlocked} hồ sơ blocked (~${fmtTy(a.blockedValue)}); xử lý ${a.needBLD.length} hồ sơ cần BLĐ.`);
    if (a.kind === 'dev') return bullet(`${nm}: duy trì ${a.nActive} mục học tập/nâng năng lực của ${a.nPeople} CBNV.`);
    let s = `tiếp tục ${a.nActive} việc`; if (a.nOverdue) s += `; xử lý ${a.nOverdue} việc quá hạn`; if (a.needBLD.length) s += `; trình BLĐ ${a.needBLD.length}`;
    return bullet(`${nm}: ${s}.`);
  });
}

const H1 = (txt) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 260 }, children: [t(txt, { b: true, c: PRIMARY, sz: 28 })] });

const doc = new Document({
  numbering: { config: [{ reference: 'plan', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { run: { color: PRIMARY } } }] }] },
  styles: { default: { document: { run: { font: FONT, size: 22, color: TEXT } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 28, bold: true, color: PRIMARY }, paragraph: { spacing: { before: 240, after: 120 } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 25, bold: true, color: PRIMARY } },
    ] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 } } },
    children: [
      new Table({ columnWidths: [CW], width: { size: CW, type: WidthType.DXA }, borders: noBorder, rows: [new TableRow({ children: [
        new TableCell({ width: { size: CW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: PRIMARY, color: 'auto' }, margins: { top: 150, bottom: 150, left: 200, right: 200 }, children: [
          p(t('BÁO CÁO TUẦN — KHỐI NGÂN HÀNG DOANH NGHIỆP', { b: true, c: 'FFFFFF', sz: 28 })),
          p(t('Trung tâm Sản phẩm & Giải pháp Tín dụng · TPBank', { c: 'E9E4FB', sz: 18 }), { spacing: { before: 40 } }),
        ] })] })] }),
      p([t('Kỳ: ', { b: true }), t(`${DATA.weekLabel} · số liệu LIVE đến ${fmtTs(DATA.source.fetchedAt)}    `), t('Nơi nhận: ', { b: true }), t('Giám đốc Trung tâm (cc: đầu mối liên quan)')], { spacing: { before: 140, after: 100 } }),

      H1('1. Điều hành — đọc trong 60 giây'),
      tiles,
      p(t(' ', { sz: 8 })),
      boxDecisions,
      p(t(' ', { sz: 8 })),
      boxAlerts,
      p(t(' ', { sz: 8 })),
      winMs,
      p(t(' ', { sz: 10 })),
      overviewTable,
      p(t(' ', { sz: 8 })),
      imgRow,

      H1('2. Ưu tiên 1 — Hoạt động core'),
      ...P1.flatMap(areaBlock),

      H1('3. Ưu tiên 2 — AI & Phát triển năng lực'),
      ...P2.flatMap(areaBlock),

      H1('4. Trọng tâm tuần tới'),
      ...planBullets(),

      p(t(`— Nguồn: SHTD Dashboard (Google Sheets), dữ liệu chốt lúc ${fmtTs(DATA.source.fetchedAt)}: ${DATA.totals.tasksAll} task (${DATA.totals.tasksActive} đang chạy, ${DATA.totals.tasksOverdue} quá hạn) · ${DATA.totals.casesAll} hồ sơ · ${DATA.totals.devActive} mục Dev_Plan. Sức khỏe "thực" đối chiếu deadline, không chỉ RAG tự đánh giá. Báo cáo nội bộ — chỉ metadata công việc. —`, { i: true, c: MUT, sz: 17 }), { spacing: { before: 260 }, alignment: AlignmentType.CENTER }),
    ],
  }],
});

const wk = DATA.weekLabel.match(/Tuần\s*(\d+)\/(\d+)/);
const wnn = wk ? `${wk[2]}-W${String(wk[1]).padStart(2, '0')}` : 'kydacthu';
const outDir = path.join(REPO, '05_Journal', 'reports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = process.env.OUT_DOCX || path.join(outDir, `RPT-${wnn}_bao-cao-tuan.docx`);
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(outPath, b); console.log('DOCX OK', b.length, '→', outPath); });
