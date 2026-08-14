// aggregate.js — Gom dữ liệu tác nghiệp (cache GAS) thành số liệu BÁO CÁO TRUNG TÂM theo 5 mảng nghiệp vụ.
// Nguồn: 00_System/cache/gas_snapshot.json (chạy fetch_gas.js trước). Ra: report_data.json.
//
// 5 MẢNG (duyệt PER-TTT 2026-08-14, cấp Trung tâm):
//   1 Phát triển sản phẩm mới
//   2 Các line dự án chính đang chạy
//   3 Hồ sơ / case lớn đang theo dõi           (từ Case_Pipeline — ẨN TÊN KH)
//   4 Quản lý danh mục & giám sát nợ có vấn đề
//   5 Chương trình AI của Trung tâm
//
// Phạm vi = toàn bộ task ĐANG CHẠY (status ≠ Hoàn thành) của Trung tâm. Task phân vào 1 mảng bằng
// classifier ưu tiên (AI trước, rồi nợ/danh mục, sản phẩm, dự án). Case xử lý riêng từ bảng Case_Pipeline.
// Chỉ metadata; TUYỆT ĐỐI không xuất tên khách hàng (Case_Pipeline cột "Khách hàng / Case").

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const CACHE = path.join(REPO, '00_System', 'cache', 'gas_snapshot.json');
const OUT = path.join(__dirname, 'report_data.json');

// ── Cột Task_Master ──
const C = { id: 0, tuanBC: 1, initId: 2, category: 3, teamMain: 4, teamCo: 5, loai: 6, name: 7,
  picAcc: 8, picResp: 9, picSup: 10, start: 11, deadline: 12, pct: 13, status: 14, milestone: 15,
  ketQua: 16, keHoach: 17, vuongMac: 18, canBLD: 19, noiDungBLD: 20, crossTeam: 21, highlight: 22, ykienBLD: 23, rag: 24 };
// ── Cột Initiative_Master ──
const I = { id: 0, name: 1, cat: 2, acc: 3, start: 4, deadline: 5, pct: 6, msTrack: 7, msDeadline: 8, status: 9, type: 14 };
// ── Cột Case_Pipeline ──
const K = { id: 0, tuanBC: 1, team: 2, pic: 3, dvkd: 4, khach: 5, loaiHinh: 6, complexity: 7, phuongAn: 8,
  giaTri: 9, stage: 10, vuong: 11, nextStep: 12, start: 13, deadline: 14, rag: 15, canBLD: 16, highlight: 17 };

const norm = (s) => String(s == null ? '' : s).trim();
const DONE_RE = /hoàn thành$|^hoàn thành|done|xong/i;
const isDone = (s) => DONE_RE.test(norm(s));
const yn = (v) => /^y|^có|^true/i.test(norm(v));

// ── ISO week ──
function parseVNDate(s) {
  s = norm(s); let m;
  if ((m = s.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})/))) { let y = +m[3]; if (y < 100) y += 2000; return new Date(Date.UTC(y, +m[2] - 1, +m[1])); }
  if ((m = s.match(/^(\d{4})-(\d{2})-(\d{2})/))) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if ((m = s.match(/^(\d{1,2})[-\s]*(?:tháng|thg)\s*(\d{1,2})[-\s]*(\d{2,4})/i))) { let y = +m[3]; if (y < 100) y += 2000; return new Date(Date.UTC(y, +m[2] - 1, +m[1])); }
  return null;
}
function isoWeekParts(d) { const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())); const day = (t.getUTCDay() + 6) % 7; t.setUTCDate(t.getUTCDate() - day + 3); const y = t.getUTCFullYear(); const jan4 = new Date(Date.UTC(y, 0, 4)); const w = 1 + Math.round(((t - jan4) / 86400000 - 3 + ((jan4.getUTCDay() + 6) % 7)) / 7); return { y, w }; }
function isoWeekMonday(y, w) { const jan4 = new Date(Date.UTC(y, 0, 4)); const day = (jan4.getUTCDay() + 6) % 7; const mon = new Date(jan4); mon.setUTCDate(jan4.getUTCDate() - day + (w - 1) * 7); return mon; }
// "Hoạt động phát sinh trong tuần BC": pin tay đúng tuần, HOẶC Start/Deadline rơi trong tuần.
function isThisWeek(r, target) {
  const mon = isoWeekMonday(target.y, target.w); const sun = new Date(mon); sun.setUTCDate(mon.getUTCDate() + 6);
  const pins = norm(r[C.tuanBC]).split(/[;,]/).map((s) => s.trim()).filter(Boolean);
  if (pins.some((p) => { const pp = labelToParts(p); return pp && pp.y === target.y && pp.w === target.w; })) return true;
  const s = parseVNDate(r[C.start]), d = parseVNDate(r[C.deadline]);
  if (s && s >= mon && s <= sun) return true;
  if (d && d >= mon && d <= sun) return true;
  return false;
}
function fmtDMY(s) { const d = parseVNDate(s); if (!d) return norm(s); const p = (n) => String(n).padStart(2, '0'); return `${p(d.getUTCDate())}/${p(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`; }
function labelToParts(l) { const m = norm(l).match(/Tuần\s*(\d{1,2})\s*\/\s*(\d{4})/i); return m ? { w: +m[1], y: +m[2] } : null; }

function ragKey(rag) { const r = norm(rag).toLowerCase(); if (/red|đỏ|do$/.test(r)) return 'Red'; if (/amber|vàng|yellow|cam/.test(r)) return 'Amber'; if (/green|xanh/.test(r)) return 'Green'; return 'Green'; }
// Sức khỏe mảng theo TỶ TRỌNG (không để 1 điểm đỏ kéo cả mảng thành "rủi ro cao"):
//   Red  nếu tỷ lệ đỏ ≥ 15% hoặc ≥ 3 mục; Amber nếu có ≥1 đỏ/vàng nhưng thiểu số; ngược lại Green.
function areaRagFromCounts(c) {
  const total = (c.Green || 0) + (c.Amber || 0) + (c.Red || 0);
  if (!total) return 'Green';
  if (c.Red / total >= 0.15 || c.Red >= 3) return 'Red';
  if (c.Red >= 1 || c.Amber >= 1) return 'Amber';
  return 'Green';
}
function statusTextFromRag(r) { return r === 'Red' ? 'Rủi ro cao' : r === 'Amber' ? 'Cần lưu ý' : 'Đúng tiến độ'; }

// ── Classifier: task đang chạy → 1 trong 4 mảng task (case là mảng 3, tính riêng) ──
const AREA = { SANPHAM: 'SANPHAM', DUAN: 'DUAN', DANHMUC: 'DANHMUC', AI: 'AI' };
const RE_AI = /\bAI\b|GenAI|chatbot|\bbot\b|\bGem\b|use ?case ?ai|use ai|trợ lý ảo|\bLLM\b|copilot|tự động hóa.*(bot|ai)/i;
// Nợ có vấn đề / giám sát danh mục THỰC SỰ (giám sát 1 KH cụ thể, truy đòi, tái cấu trúc dư nợ, CIC, OD…).
const RE_DEBT = /truy đòi|nợ quá hạn|tái cấu trúc.*(nợ|dư nợ)|\bOD\d|\bCIC\b|nợ có vấn đề|giám sát.*(nợ|dư nợ|kh |khách)|rà soát.*(kh|case|dư nợ|truy đòi)|thu hồi nợ|xử lý nợ|cảnh báo sớm|early warning|chuyển dịch dư nợ|nợ xấu/i;
// Phát triển sản phẩm / xây quy trình / chính sách (mảng 1) — do BL/CV1/CV2 phụ trách chính.
const RE_PROCESS = /quy trình|chính sách|\bpolicy\b|cẩm nang|hướng dẫn|ban hành|sản phẩm|pricing|thấu chi|scorecard|bao thanh toán|biểu mẫu|khung (phân loại|tín dụng|rủi ro)|điều kiện phê duyệt|eiso|đề xuất sửa đổi|SP\b/i;
const RE_PRODUCT_INI = /^(SCF|BESS|TC[-\s]?0|TC-|DL\s?OTO|SCORECARD|BDS|SP[_\s-]?0|HSUT|BTT|HST)/i;
const RE_PROJECT_INI = /^(GNOL|BL[O0]L|ECONTRACT|SCF-MVP|CRM|ESMS|VHĐT|IDNES)/i;
const RE_PROJECT_KW = /\bdự án\b|initiative|branch\s?tour|branchtour|NOXH|bán mới|tệp lớn|rollout|triển khai kênh|go-?live|\bCRM\b|\bESMS\b|sale ?agent|\bapp\b|phase \d|sprint/i;

const isProductLike = (name, cat, init) => /Sản phẩm/i.test(cat) || RE_PRODUCT_INI.test(init) || RE_PROCESS.test(name);
const isDebtLike = (name, cat, team, init) => team === 'QLDM' || /Rủi ro\/QLDM|Room\/GHTD/i.test(cat) || /^RISK/i.test(init) || RE_DEBT.test(name);

function classifyTask(r) {
  const name = norm(r[C.name]), cat = norm(r[C.category]), team = norm(r[C.teamMain]), init = norm(r[C.initId]);
  // 1) AI — cross-cutting, ưu tiên cao nhất
  if (RE_AI.test(name) || /AI\/Năng suất/i.test(cat)) return AREA.AI;
  const prod = isProductLike(name, cat, init), debt = isDebtLike(name, cat, team, init);
  // 2) Danh mục & nợ có vấn đề — chỉ giữ giám sát nợ THỰC; việc SP/quy trình lẫn vào → đẩy sang mảng 1.
  if (debt && !prod) return AREA.DANHMUC;
  // 3) Phát triển sản phẩm / quy trình / chính sách (kể cả khi lẫn ở team QLDM)
  if (prod) return AREA.SANPHAM;
  // 4) Line dự án / initiative lớn đang chạy (số hóa + dự án KD)
  if (/Số hóa/i.test(cat) || RE_PROJECT_INI.test(init) || RE_PROJECT_KW.test(name)) return AREA.DUAN;
  return AREA.DUAN;
}

const AREA_META = [
  { key: AREA.SANPHAM, no: 1, title: 'Công tác phát triển sản phẩm mới' },
  { key: AREA.DUAN, no: 2, title: 'Các line dự án / initiative lớn đang chạy' },
  { key: '__CASE', no: 3, title: 'Hồ sơ / case lớn đang theo dõi' },
  { key: AREA.DANHMUC, no: 4, title: 'Quản lý danh mục & giám sát nợ có vấn đề' },
  { key: AREA.AI, no: 5, title: 'Chương trình AI của Trung tâm' },
];

function taskAreaSummary(key, tasks, target) {
  const mine = tasks.filter((r) => classifyTask(r) === key);
  const week = mine.filter((r) => isThisWeek(r, target));
  const thisWeek = week.slice(0, 8).map((r) => ({ name: r[C.name], pct: norm(r[C.pct]) || '—', team: norm(r[C.teamMain]), status: norm(r[C.status]), rag: ragKey(r[C.rag]), ketQua: norm(r[C.ketQua]) || norm(r[C.keHoach]) }));
  const rag = { Green: 0, Amber: 0, Red: 0 }; mine.forEach((r) => rag[ragKey(r[C.rag])]++);
  const areaRag = areaRagFromCounts(rag);
  const pcts = mine.map((r) => parseFloat(norm(r[C.pct]).replace('%', ''))).filter((x) => !isNaN(x));
  const pct = pcts.length ? Math.round(pcts.reduce((s, x) => s + x, 0) / pcts.length) : null;
  const bld = mine.filter((r) => yn(r[C.canBLD])).map((r) => ({ id: r[C.id], name: r[C.name], noiDung: norm(r[C.noiDungBLD]) || r[C.name], team: r[C.teamMain] }));
  const blockers = mine.filter((r) => norm(r[C.vuongMac])).map((r) => ({ name: r[C.name], vuong: r[C.vuongMac] }));
  // highlight: task gắn cờ Highlight hoặc %HT cao nhất
  const highlights = mine
    .filter((r) => yn(r[C.highlight]))
    .concat(mine.filter((r) => !yn(r[C.highlight])).sort((a, b) => (parseFloat(b[C.pct]) || 0) - (parseFloat(a[C.pct]) || 0)))
    .slice(0, 6)
    .map((r) => ({ name: r[C.name], pct: norm(r[C.pct]) || '—', team: norm(r[C.teamMain]), rag: ragKey(r[C.rag]), next: norm(r[C.keHoach]) }));
  // top teams tham gia
  const teamCount = {}; mine.forEach((r) => (teamCount[norm(r[C.teamMain]) || '—'] = (teamCount[norm(r[C.teamMain])] || 0) + 1));
  const teams = Object.entries(teamCount).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([t, n]) => `${t} (${n})`);
  return { nActive: mine.length, nThisWeek: week.length, rag: areaRag, statusText: statusTextFromRag(areaRag), ragCounts: rag, pct,
    needBLD: bld, blockers, highlights, thisWeek, teams };
}

// ── Mảng 3: Case lớn đang theo dõi ──
// "đang theo dõi" = chưa qua phê duyệt/triển khai (đã xong phương án vẫn đang theo dõi để trình).
const CASE_CLOSED = /đã phê duyệt|đang triển khai|chờ giải ngân/i;
// Giá trị (tỷ đồng): dấu "." là thập phân (vd "449.9"), "," là thập phân kiểu VN; không có dấu ngăn nghìn.
function parseValue(s) {
  let v = norm(s); if (!v) return 0;
  if (v.includes('.') && v.includes(',')) v = v.replace(/,/g, ''); // "1,234.5" → thousands=,
  else v = v.replace(',', '.');                                     // "449,9" → "449.9"
  const x = parseFloat(v.replace(/[^\d.]/g, ''));
  return isNaN(x) ? 0 : x;
}
function caseSummary(cases) {
  const open = cases.filter((r) => !CASE_CLOSED.test(norm(r[K.stage])) && !/blocked/i.test(norm(r[K.stage])) === false ? true : !CASE_CLOSED.test(norm(r[K.stage])));
  // "lớn & đang theo dõi": đang mở (chưa phê duyệt) & (phức tạp Cao | loại hình Dự án | giá trị ≥ 50 tỷ)
  const tracked = cases.filter((r) => {
    const stage = norm(r[K.stage]);
    const openCase = !CASE_CLOSED.test(stage);
    const big = /cao/i.test(norm(r[K.complexity])) || /dự án/i.test(norm(r[K.loaiHinh])) || parseValue(r[K.giaTri]) >= 50;
    return openCase && big;
  });
  const rag = { Green: 0, Amber: 0, Red: 0 }; tracked.forEach((r) => rag[ragKey(r[K.rag])]++);
  const caseRag = areaRagFromCounts(rag);
  const byStage = {}; tracked.forEach((r) => (byStage[norm(r[K.stage]) || '—'] = (byStage[norm(r[K.stage])] || 0) + 1));
  const totalValue = tracked.reduce((s, r) => s + parseValue(r[K.giaTri]), 0);
  const bld = tracked.filter((r) => yn(r[K.canBLD])).map((r) => ({ khach: norm(r[K.khach]), dvkd: norm(r[K.dvkd]), loai: norm(r[K.loaiHinh]), giaTri: parseValue(r[K.giaTri]), stage: norm(r[K.stage]), vuong: norm(r[K.vuong]) }));
  // top theo giá trị (báo cáo nội bộ → có tên KH để phân biệt): KH + ĐVKD + loại hình + giá trị + stage + next
  const top = tracked.slice().sort((a, b) => parseValue(b[K.giaTri]) - parseValue(a[K.giaTri])).slice(0, 8)
    .map((r) => ({ khach: norm(r[K.khach]), dvkd: norm(r[K.dvkd]), loai: norm(r[K.loaiHinh]), complexity: norm(r[K.complexity]), giaTri: parseValue(r[K.giaTri]), stage: norm(r[K.stage]), next: norm(r[K.nextStep]), rag: ragKey(r[K.rag]) }));
  const byTeam = {}; tracked.forEach((r) => (byTeam[norm(r[K.team]) || '—'] = (byTeam[norm(r[K.team])] || 0) + 1));
  return {
    nActive: tracked.length, totalCases: cases.length, rag: caseRag, statusText: statusTextFromRag(caseRag),
    ragCounts: rag, byStage, totalValue: Math.round(totalValue), needBLD: bld, top,
    teams: Object.entries(byTeam).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([t, n]) => `${t} (${n})`),
  };
}

function main() {
  if (!fs.existsSync(CACHE)) { console.error('Chưa có cache. Chạy: node fetch_gas.js'); process.exit(1); }
  const snap = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
  const tasks = (snap.tasks || []).slice(1);
  const cases = (snap.cases || []).slice(1);
  const today = new Date();
  const target = process.env.REPORT_WEEK && labelToParts(process.env.REPORT_WEEK.replace(/^(\d{4})-W(\d+)$/i, 'Tuần $2/$1'))
    ? labelToParts(process.env.REPORT_WEEK.replace(/^(\d{4})-W(\d+)$/i, 'Tuần $2/$1')) : isoWeekParts(today);
  const weekLabel = `Tuần ${target.w}/${target.y}`;

  const activeTasks = tasks.filter((r) => !isDone(r[C.status]));

  const areas = AREA_META.map((m) => {
    if (m.key === '__CASE') { const cs = caseSummary(cases); return { no: m.no, title: m.title, kind: 'case', ...cs }; }
    const s = taskAreaSummary(m.key, activeTasks, target); return { no: m.no, title: m.title, kind: 'task', ...s };
  });

  const out = {
    generatedAt: new Date().toISOString(), weekLabel,
    scope: 'Trung tâm SP&GP Tín dụng — toàn bộ task đang chạy + case lớn theo dõi',
    source: { fetchedAt: snap.fetchedAt, serverTs: snap.serverTs },
    totals: { tasksAll: tasks.length, tasksActive: activeTasks.length, casesAll: cases.length },
    areas,
  };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');

  // ── In tóm tắt ──
  console.log(`\n=== BÁO CÁO TRUNG TÂM ${weekLabel} · nguồn @ ${snap.fetchedAt} ===`);
  console.log(`Task: ${tasks.length} tổng · ${activeTasks.length} đang chạy · Case: ${cases.length}\n`);
  console.log('MẢNG'.padEnd(46), 'Sức khỏe'.padEnd(10), 'Active', 'BLĐ', 'RAG(G/A/R)');
  areas.forEach((a) => console.log(
    (a.no + '. ' + a.title).padEnd(46), a.statusText.padEnd(10),
    String(a.nActive).padEnd(6), String(a.needBLD.length).padEnd(3),
    `${a.ragCounts.Green}/${a.ragCounts.Amber}/${a.ragCounts.Red}` + (a.kind === 'case' ? `  ~${a.totalValue} tỷ` : '')));
  const classified = areas.filter((a) => a.kind === 'task').reduce((s, a) => s + a.nActive, 0);
  console.log(`\nĐã phân loại ${classified}/${activeTasks.length} task đang chạy vào 4 mảng task; case riêng.`);
  console.log('→ report_data.json đã ghi.');
}

main();
