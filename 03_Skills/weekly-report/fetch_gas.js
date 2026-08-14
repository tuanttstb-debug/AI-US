// fetch_gas.js — Đọc dữ liệu tác nghiệp LIVE từ GAS Web App (SHTD Dashboard).
// Luồng: auth-login (lấy token) → batch-read (tasks/initiatives/cases/issues) → cache sạch.
// Nguồn sự thật là Google Sheets; file cache chỉ để làm việc offline (00_System/cache/).
// KHÔNG lưu dữ liệu khách hàng: chỉ đọc metadata; Case_Pipeline chỉ dùng ĐẾM tổng hợp (bỏ tên KH).
//
// Chạy trực tiếp:  node fetch_gas.js         → ghi cache 00_System/cache/gas_snapshot.json
// Dùng như module: const { fetchLive } = require('./fetch_gas');

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const SECRET_PATH = path.join(REPO, '06_Tools', 'connectors', '.gas-secret.json');
const CACHE_DIR = path.join(REPO, '00_System', 'cache');
const CACHE_FILE = path.join(CACHE_DIR, 'gas_snapshot.json');

function loadSecret() {
  if (process.env.GAS_USER && process.env.GAS_PASS && process.env.GAS_URL) {
    return { username: process.env.GAS_USER, password: process.env.GAS_PASS, webAppUrl: process.env.GAS_URL };
  }
  if (!fs.existsSync(SECRET_PATH)) {
    throw new Error('Thiếu credential: tạo 06_Tools/connectors/.gas-secret.json (xem gas.md) hoặc set GAS_USER/GAS_PASS/GAS_URL.');
  }
  return JSON.parse(fs.readFileSync(SECRET_PATH, 'utf8'));
}

// POST JSON tới GAS Web App. Content-Type text/plain để tránh preflight; GAS trả JSON.
async function gasPost(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
    redirect: 'follow',
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); }
  catch (e) { throw new Error('GAS trả về không phải JSON (HTTP ' + res.status + '): ' + text.slice(0, 200)); }
  if (data.status !== 'ok') throw new Error('GAS lỗi: ' + (data.error || JSON.stringify(data)));
  return data;
}

async function login(secret) {
  const d = await gasPost(secret.webAppUrl, {
    action: 'auth-login', username: secret.username, password: secret.password,
  });
  if (!d.token) throw new Error('Login thất bại: không nhận được token.');
  return d.token;
}

// Trả về { fetchedAt, tasks, initiatives, cases, issues } — mỗi domain là mảng 2D [header, ...rows].
async function fetchLive({ domains = ['tasks', 'initiatives', 'cases', 'issues'] } = {}) {
  const secret = loadSecret();
  const token = await login(secret);
  const d = await gasPost(secret.webAppUrl, { action: 'batch-read', token, domains });
  const data = d.data || {};
  const pick = (k) => (data[k] && Array.isArray(data[k].values) ? data[k].values : []);
  return {
    fetchedAt: new Date().toISOString(),
    serverTs: d.serverTs || null,
    ver: d.ver || null,
    tasks: pick('tasks'),
    initiatives: pick('initiatives'),
    cases: pick('cases'),
    issues: pick('issues'),
  };
}

function writeCache(snapshot) {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(snapshot, null, 2), 'utf8');
  return CACHE_FILE;
}

function readCache() {
  if (!fs.existsSync(CACHE_FILE)) throw new Error('Chưa có cache. Chạy: node fetch_gas.js');
  return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
}

module.exports = { fetchLive, writeCache, readCache, CACHE_FILE };

if (require.main === module) {
  fetchLive()
    .then((snap) => {
      const p = writeCache(snap);
      const n = (a) => Math.max(0, a.length - 1);
      console.log('LIVE OK @', snap.fetchedAt);
      console.log('  tasks=%d  initiatives=%d  cases=%d  issues=%d',
        n(snap.tasks), n(snap.initiatives), n(snap.cases), n(snap.issues));
      console.log('  cache →', p);
    })
    .catch((e) => { console.error('FETCH LỖI:', e.message); process.exit(1); });
}
