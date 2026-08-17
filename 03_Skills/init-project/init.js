// init.js — Onboard 1 dự án mới vào AI OS Registry (Hub-and-Spoke) bằng 1 lệnh.
// Scaffold repo mới (AI_CONTEXT/ + CLAUDE.md) VÀ đăng ký vào AIOS (thẻ PRJ + PORTFOLIO + INDEX + projects.json).
//
// Chạy (từ gốc AIOS):
//   node 03_Skills/init-project/init.js --id PRJ-XXX --name "Tên" --folder "ten-folder" --role "vai trò" [--repo <url>] [--path <abs>] [--dry] [--force]
//
// - --folder: thư mục repo dưới D:\Workspace\Production\ (hoặc dùng --path để trỏ tuyệt đối).
// - --dry: chỉ in kế hoạch, KHÔNG ghi. --force: cho phép ghi đè file đã có.
// KHÔNG tự git commit — bạn review rồi commit ở từng repo.

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');            // D:\Workspace\AIOS
const WORKSPACE = path.resolve(REPO, '..');
const TPL_CTX = path.join(REPO, '00_System', 'templates', 'AI_CONTEXT_TEMPLATE');
const TPL_CLAUDE = path.join(REPO, '00_System', 'templates', 'CLAUDE.md');
const PORTFOLIO = path.join(REPO, '00_System', 'PORTFOLIO.md');
const INDEX = path.join(REPO, '00_System', 'INDEX.md');
const PROJECTS_JSON = path.join(REPO, '03_Skills', 'portfolio-digest', 'projects.json');
const CARD_DIR = path.join(REPO, '04_Knowledge', 'projects');

const CTX_FILES = ['PROJECT_OVERVIEW.md', 'SESSION_HANDOVER.md', 'PROJECT_STATE.md', 'TODO_NEXT.md', 'TECH_DEBT.md'];

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2);
      if (k === 'dry' || k === 'force') { a[k] = true; }
      else { a[k] = argv[++i]; }
    }
  }
  return a;
}

function today() { return new Date().toISOString().slice(0, 10); }

function subst(s, m) {
  // Thứ tự: 'PRJ-<MÃ>' trước '<MÃ>'.
  return s
    .replace(/PRJ-<MÃ>/g, m.id)
    .replace(/<PRJ-ID>/g, m.id)
    .replace(/<Tên dự án>/g, m.name)
    .replace(/<Dự án>/g, m.name)
    .replace(/<một dòng vai trò>/g, m.role)
    .replace(/<git remote URL>/g, m.repo)
    .replace(/<URL>/g, m.repo)
    .replace(/<x\.y\.z>/g, '0.1.0')
    .replace(/<YYYY-MM-DD>/g, m.date)
    .replace(/<MÃ>/g, m.code);
}

const actions = [];
function writeFileSafe(dst, content, m, opts = {}) {
  const rel = path.relative(WORKSPACE, dst);
  if (fs.existsSync(dst) && !m.force) { actions.push(`SKIP (đã có): ${rel}`); return; }
  actions.push(`${fs.existsSync(dst) ? 'OVERWRITE' : 'CREATE'}: ${rel}`);
  if (!m.dry) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.writeFileSync(dst, content, 'utf8'); }
}

function insertBeforeAnchor(file, anchor, newLine, m) {
  const rel = path.relative(WORKSPACE, file);
  let md = fs.readFileSync(file, 'utf8');
  if (md.includes(newLine.trim())) { actions.push(`SKIP (dòng đã có): ${rel}`); return; }
  if (!md.includes(anchor)) { actions.push(`⚠ KHÔNG thấy anchor trong ${rel} — bỏ qua, chèn tay.`); return; }
  actions.push(`INSERT row → ${rel}`);
  if (!m.dry) { md = md.replace(anchor, newLine + '\n' + anchor); fs.writeFileSync(file, md, 'utf8'); }
}

function updateProjectsJson(m) {
  const rel = path.relative(WORKSPACE, PROJECTS_JSON);
  const cfg = JSON.parse(fs.readFileSync(PROJECTS_JSON, 'utf8'));
  if (cfg.projects.some((p) => p.id === m.id)) { actions.push(`SKIP (đã có ${m.id}): ${rel}`); return; }
  actions.push(`ADD ${m.id} → ${rel}`);
  cfg.projects.push({ id: m.id, name: m.name, folder: m.folder, role: m.role });
  if (!m.dry) fs.writeFileSync(PROJECTS_JSON, JSON.stringify(cfg, null, 2) + '\n', 'utf8');
}

const CARD_TPL = `---
id: <PRJ-ID>
type: project-card
title: <Tên dự án> — <một dòng vai trò>
status: active
owner: PER-TTT
tags: []
related: [PER-TTT]
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
version: 1
source: <git remote URL>
---

## Một dòng
<một dòng vai trò>

## Con trỏ (nguồn sự thật nằm ở repo)
- **Local:** __LOCAL__
- **Context:** \`AI_CONTEXT/\` (khởi tạo từ template) + \`CLAUDE.md\` bootstrap ở gốc repo.
- **Repo:** <git remote URL>

## Chuẩn hoá
- ✅ Khởi tạo theo khung chuẩn qua skill \`init-project\` (<YYYY-MM-DD>).
`;

function main() {
  const a = parseArgs(process.argv.slice(2));
  const need = ['id', 'name', 'folder', 'role'];
  const miss = need.filter((k) => !a[k]);
  if (miss.length) {
    console.error(`Thiếu tham số: ${miss.map((x) => '--' + x).join(', ')}`);
    console.error(`VD: node 03_Skills/init-project/init.js --id PRJ-XXX --name "Tên" --folder "ten-folder" --role "vai trò" [--repo url] [--path abs] [--dry]`);
    process.exit(1);
  }
  if (!/^PRJ-[A-Z0-9]+$/.test(a.id)) { console.error(`--id phải dạng PRJ-<MÃ> (VIẾT HOA), vd PRJ-CRM.`); process.exit(1); }

  const targetRepo = a.path ? path.resolve(a.path) : path.join(WORKSPACE, 'Production', a.folder);
  const m = { id: a.id, code: a.id.replace(/^PRJ-/, ''), name: a.name, role: a.role, folder: a.folder,
    repo: a.repo || '(chưa có remote)', date: today(), dry: !!a.dry, force: !!a.force };

  console.log(`\n=== init-project: ${m.id} — ${m.name} ===`);
  console.log(`Repo đích: ${targetRepo}${fs.existsSync(targetRepo) ? '' : '  ⚠ (chưa tồn tại — tạo folder/git trước, hoặc dùng --path)'}`);
  if (m.dry) console.log('(DRY-RUN — không ghi gì)\n');

  // A. Repo side — AI_CONTEXT/ + CLAUDE.md
  for (const f of CTX_FILES) {
    const src = subst(fs.readFileSync(path.join(TPL_CTX, f), 'utf8'), m);
    writeFileSafe(path.join(targetRepo, 'AI_CONTEXT', f), src, m);
  }
  writeFileSafe(path.join(targetRepo, 'CLAUDE.md'), subst(fs.readFileSync(TPL_CLAUDE, 'utf8'), m), m);

  // B. AIOS side — thẻ PRJ
  const card = subst(CARD_TPL, m).replace('__LOCAL__', '`' + targetRepo + '`');
  writeFileSafe(path.join(CARD_DIR, `${m.id}.md`), card, m);

  // C. projects.json
  updateProjectsJson(m);

  // D. PORTFOLIO.md
  const portRow = `| [${m.id}](../04_Knowledge/projects/${m.id}.md) | ${m.name} | ${m.role} | active | \`${m.folder}\` | \`AI_CONTEXT/\` | ✅ đạt |`;
  insertBeforeAnchor(PORTFOLIO, '<!-- init-project:portfolio-active', portRow, m);

  // E. INDEX.md
  const idxRow = `| ${m.id} | ${m.name} | active | \`04_Knowledge/projects/${m.id}.md\` |`;
  insertBeforeAnchor(INDEX, '<!-- init-project:index-prj', idxRow, m);

  console.log('\nKế hoạch / kết quả:');
  actions.forEach((x) => console.log('  - ' + x));
  console.log('\nBƯỚC KẾ (thủ công):');
  console.log(`  1. Điền nội dung AI_CONTEXT/PROJECT_OVERVIEW.md (+ STATE/TODO) cho ${m.id}.`);
  console.log(`  2. Trong repo đích: git add AI_CONTEXT CLAUDE.md && commit.`);
  console.log(`  3. Trong AIOS: git add 00_System 03_Skills 04_Knowledge && commit.`);
  console.log(`  4. (tuỳ chọn) node 03_Skills/portfolio-digest/digest.js để cập nhật digest.`);
  console.log(m.dry ? '\n(DRY-RUN: chưa ghi gì. Bỏ --dry để thực thi.)\n' : '\n✅ Xong (chưa git commit — bạn tự commit).\n');
}

main();
