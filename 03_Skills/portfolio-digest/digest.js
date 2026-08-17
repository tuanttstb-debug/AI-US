// digest.js — Portfolio Digest (Phase 4)
// Gom trạng thái mới nhất của từng dự án active từ AI_CONTEXT/SESSION_HANDOVER.md + git,
// ghi ra 00_System/PORTFOLIO_DIGEST.md. ĐỌC-ONLY trên các repo Production (chỉ đọc file + git log).
//
// Chạy:  node 03_Skills/portfolio-digest/digest.js
// Nguồn cấu hình: projects.json (cùng thư mục).

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.resolve(__dirname, '..', '..');                 // D:\Workspace\AIOS
const CFG = JSON.parse(fs.readFileSync(path.join(__dirname, 'projects.json'), 'utf8'));
const WORKSPACE = path.resolve(REPO, '..');                       // D:\Workspace
const PROD = path.join(WORKSPACE, CFG.productionDir || 'Production');
const HANDOVER_REL = 'AI_CONTEXT/SESSION_HANDOVER.md';
const OUT = path.join(REPO, '00_System', 'PORTFOLIO_DIGEST.md');

function gitLast(repoPath) {
  try {
    const s = execFileSync('git', ['-C', repoPath, 'log', '-1', '--format=%ad|%h|%s', '--date=short'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    const [date, hash, ...rest] = s.split('|');
    return { date, hash, subject: rest.join('|') };
  } catch { return null; }
}
function gitBranch(repoPath) {
  try {
    return execFileSync('git', ['-C', repoPath, 'rev-parse', '--abbrev-ref', 'HEAD'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch { return null; }
}
function gitDirty(repoPath) {
  try {
    const s = execFileSync('git', ['-C', repoPath, 'status', '--porcelain'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return s ? s.split(/\r?\n/).length : 0;
  } catch { return null; }
}

// Trích delta mới nhất: heading cấp >=2 ĐẦU TIÊN trong thân file + vài dòng theo sau tới heading kế.
function latestDelta(md) {
  const lines = md.split(/\r?\n/);
  let i = 0;
  // bỏ H1 title + dòng trống đầu
  while (i < lines.length && !/^#{2,3}\s+/.test(lines[i])) i++;
  if (i >= lines.length) return { heading: null, body: [] };
  const heading = lines[i].replace(/^#{2,3}\s+/, '').trim();
  const body = [];
  for (let j = i + 1; j < lines.length && body.length < 6; j++) {
    if (/^#{1,3}\s+/.test(lines[j])) break;          // dừng ở heading kế
    const t = lines[j].trim();
    if (t) body.push(t);
  }
  return { heading, body };
}

function main() {
  const rows = [];
  const details = [];
  for (const p of CFG.projects) {
    const repoPath = path.join(PROD, p.folder);
    const handover = path.join(repoPath, HANDOVER_REL);
    const exists = fs.existsSync(repoPath);
    const last = exists ? gitLast(repoPath) : null;
    const branch = exists ? gitBranch(repoPath) : null;
    const dirty = exists ? gitDirty(repoPath) : null;

    let delta = { heading: null, body: [] };
    let handoverOk = false;
    if (fs.existsSync(handover)) { delta = latestDelta(fs.readFileSync(handover, 'utf8')); handoverOk = true; }

    rows.push({ p, branch, last, dirty, deltaHeading: delta.heading, handoverOk, exists });
    details.push({ p, delta, handoverOk });
  }

  const now = new Date().toISOString();
  let md = `# PORTFOLIO DIGEST — trạng thái dự án (tự sinh)\n\n`;
  md += `> ⚙️ **File tự sinh bởi \`03_Skills/portfolio-digest/digest.js\` — KHÔNG sửa tay.** Điểm vào & phần quy hoạch curated: \`00_System/PORTFOLIO.md\`.\n>\n`;
  md += `> Sinh lúc: ${now} · Nguồn: \`AI_CONTEXT/SESSION_HANDOVER.md\` + git mỗi repo (đọc-only).\n\n`;

  md += `## Bảng nhanh\n\n`;
  md += `| Dự án | Nhánh | Commit gần nhất | Dirty | Delta handover mới nhất |\n`;
  md += `|---|---|---|---|---|\n`;
  for (const r of rows) {
    if (!r.exists) { md += `| ${r.p.id} · ${r.p.name} | — | ⚠ repo không thấy | — | — |\n`; continue; }
    const commit = r.last ? `${r.last.date} \`${r.last.hash}\` ${r.last.subject}` : '—';
    const dirty = r.dirty == null ? '—' : (r.dirty ? `${r.dirty} file` : 'sạch');
    const dh = r.handoverOk ? (r.deltaHeading || '(không tách được)') : '⚠ thiếu handover';
    md += `| ${r.p.id} · ${r.p.name} | ${r.branch || '—'} | ${commit} | ${dirty} | ${dh} |\n`;
  }

  md += `\n## Chi tiết delta mới nhất mỗi dự án\n`;
  for (const d of details) {
    md += `\n### ${d.p.id} — ${d.p.name}\n`;
    md += `*${d.p.role}*\n\n`;
    if (!d.handoverOk) { md += `> ⚠ Không đọc được \`${HANDOVER_REL}\`.\n`; continue; }
    md += `**${d.delta.heading || '(không tách được heading)'}**\n`;
    if (d.delta.body.length) { for (const b of d.delta.body) md += `${b.startsWith('-') || b.startsWith('|') ? '' : '- '}${b}\n`; }
  }

  fs.writeFileSync(OUT, md, 'utf8');

  // In tóm tắt console
  console.log(`\n=== PORTFOLIO DIGEST @ ${now} ===`);
  for (const r of rows) {
    const commit = r.last ? `${r.last.date} ${r.last.hash}` : '—';
    console.log(`  ${r.p.id.padEnd(14)} ${(r.branch || '—').padEnd(24)} ${commit.padEnd(18)} ${r.handoverOk ? 'handover✓' : 'handover✗'}`);
  }
  console.log(`→ ghi ${path.relative(REPO, OUT)}`);
}

main();
