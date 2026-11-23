import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chapterById } from '../src/data/curriculum';
import type { GenerateRequest, EssayGradeRequest } from '../src/types';
import { aiStatus, generateQuestions, gradeEssay, AiError } from './ai';

try { process.loadEnvFile(path.resolve(process.cwd(), '.env')); } catch { /* .env opsional */ }

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT || 3000);
const LIMIT = Number(process.env.RATE_LIMIT_PER_10_MIN || 40);
const DAILY = Number(process.env.MAX_DAILY_AI_REQUESTS || 1000);

// --- Pembatas pemakaian sederhana (dalam memori) ---
const hits = new Map<string, number[]>();
let dayKey = new Date().toDateString();
let dayCount = 0;
function allow(ip: string): 'ok' | 'ip' | 'daily' {
  const today = new Date().toDateString();
  if (today !== dayKey) { dayKey = today; dayCount = 0; }
  if (dayCount >= DAILY) return 'daily';
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter(t => now - t < 600_000);
  if (arr.length >= LIMIT) { hits.set(ip, arr); return 'ip'; }
  arr.push(now); hits.set(ip, arr); dayCount++;
  return 'ok';
}

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.ico': 'image/x-icon',
};

function send(res: http.ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
}

async function readJson(req: http.IncomingMessage): Promise<any> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const c of req) {
    size += (c as Buffer).length;
    if (size > 20_000) throw new AiError('Permintaan terlalu besar', 413);
    chunks.push(c as Buffer);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { throw new AiError('Permintaan tidak valid', 400); }
}

const TYPES = ['pilihan-ganda', 'cerita', 'esai'];
const DIFFS = ['mudah', 'sedang', 'sulit'];

async function handleApi(req: http.IncomingMessage, res: http.ServerResponse, url: URL) {
  if (req.method === 'GET' && url.pathname === '/api/status') return send(res, 200, aiStatus());
  if (req.method !== 'POST') return send(res, 405, { error: 'Metode tidak didukung' });
  if (!aiStatus().configured) return send(res, 503, { error: 'AI belum dikonfigurasi', code: 'not_configured' });
  const ip = req.socket.remoteAddress || 'unknown';
  const gate = allow(ip);
  if (gate !== 'ok') return send(res, 429, { error: gate === 'daily' ? 'Batas pemakaian AI hari ini sudah tercapai. Coba lagi besok ya.' : 'Pelan-pelan ya, tunggu sebentar lalu coba lagi.', code: 'rate_limited' });

  const body = await readJson(req);
  if (url.pathname === '/api/generate') {
    const b = body as GenerateRequest;
    const chapter = chapterById(String(b.chapterId));
    if (!chapter) throw new AiError('Bab tidak ditemukan', 400);
    if (!TYPES.includes(b.type) || !DIFFS.includes(b.difficulty)) throw new AiError('Pengaturan soal tidak valid', 400);
    const count = Math.max(1, Math.min(10, Math.floor(Number(b.count) || 5)));
    const avoid = Array.isArray(b.avoid) ? b.avoid.slice(-30).map(x => String(x).slice(0, 200)) : [];
    const subtopicId = chapter.subtopics.some(s => s.id === b.subtopicId) ? b.subtopicId : undefined;
    const questions = await generateQuestions(chapter, { chapterId: chapter.id, subtopicId, type: b.type, difficulty: b.difficulty, count, avoid });
    return send(res, 200, { questions });
  }
  if (url.pathname === '/api/grade') {
    const b = body as EssayGradeRequest;
    const chapter = chapterById(String(b.chapterId));
    if (!chapter) throw new AiError('Bab tidak ditemukan', 400);
    const studentAnswer = String(b.studentAnswer || '').trim().slice(0, 1200);
    if (studentAnswer.length < 2) throw new AiError('Jawaban masih kosong', 400);
    const result = await gradeEssay(chapter, {
      chapterId: chapter.id,
      prompt: String(b.prompt || '').slice(0, 900),
      rubric: Array.isArray(b.rubric) ? b.rubric.slice(0, 6).map(x => String(x).slice(0, 200)) : [],
      modelAnswer: String(b.modelAnswer || '').slice(0, 900),
      studentAnswer,
    });
    return send(res, 200, result);
  }
  return send(res, 404, { error: 'Tidak ditemukan' });
}

function serveStatic(req: http.IncomingMessage, res: http.ServerResponse, url: URL) {
  let rel = decodeURIComponent(url.pathname);
  if (rel.endsWith('/')) rel += 'index.html';
  let file = path.join(DIST, rel);
  if (!file.startsWith(DIST)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }); return res.end('Belum di-build. Jalankan: npm run build'); }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
}

http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  try {
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    return serveStatic(req, res, url);
  } catch (e: any) {
    const status = e instanceof AiError ? e.status : 500;
    if (!(e instanceof AiError)) console.error(e);
    send(res, status, { error: e instanceof AiError ? e.message : 'Terjadi kesalahan di server' });
  }
}).listen(PORT, () => {
  const s = aiStatus();
  console.log(`Teman Pintar berjalan di http://localhost:${PORT}`);
  console.log(s.configured ? `AI aktif: ${s.provider} / ${s.model}` : 'AI belum dikonfigurasi -> aplikasi memakai Mode Demo (isi AI_API_KEY di .env)');
});
