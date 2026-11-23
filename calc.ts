/** Evaluator aritmetika aman (tanpa eval). Mendukung + - * / ( ) dan desimal. */
export function safeEval(expr: string): number | null {
  const s = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/\s+/g, '');
  if (!s || !/^[0-9+\-*/().]+$/.test(s)) return null;
  let i = 0;
  const peek = () => s[i];
  function number(): number {
    const start = i;
    while (i < s.length && /[0-9.]/.test(s[i])) i++;
    if (start === i) throw new Error('num');
    const n = Number(s.slice(start, i));
    if (Number.isNaN(n)) throw new Error('nan');
    return n;
  }
  function factor(): number {
    if (peek() === '-') { i++; return -factor(); }
    if (peek() === '+') { i++; return factor(); }
    if (peek() === '(') {
      i++;
      const v = expr_();
      if (peek() !== ')') throw new Error('paren');
      i++;
      return v;
    }
    return number();
  }
  function term(): number {
    let v = factor();
    while (peek() === '*' || peek() === '/') {
      const op = s[i++];
      const r = factor();
      v = op === '*' ? v * r : v / r;
    }
    return v;
  }
  function expr_(): number {
    let v = term();
    while (peek() === '+' || peek() === '-') {
      const op = s[i++];
      const r = term();
      v = op === '+' ? v + r : v - r;
    }
    return v;
  }
  try {
    const v = expr_();
    if (i !== s.length || !Number.isFinite(v)) return null;
    return v;
  } catch {
    return null;
  }
}

/** Ambil angka pertama dari teks gaya Indonesia: "Rp 15.000", "2,5 kg", "3/4", "1.250". */
export function parseNumber(text: string): number | null {
  const t = text.trim();
  const frac = t.match(/(-?\d+)\s*\/\s*(\d+)/);
  if (frac && Number(frac[2]) !== 0) return Number(frac[1]) / Number(frac[2]);
  const m = t.match(/-?\d+(?:\.\d{3})*(?:,\d+)?|-?\d+(?:\.\d+)?/);
  if (!m) return null;
  let tok = m[0];
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(tok)) tok = tok.replace(/\./g, '');
  tok = tok.replace(',', '.');
  const n = Number(tok);
  return Number.isNaN(n) ? null : n;
}

export function nearlyEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-6 * Math.max(1, Math.abs(a), Math.abs(b));
}

export function normalizeText(s: string): string {
  return s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

/** Cek jawaban singkat: angka dibandingkan sebagai angka, teks dibandingkan setelah dinormalkan. */
export function checkShortAnswer(input: string, answer: string, accepted: string[] = []): boolean {
  const candidates = [answer, ...accepted];
  const inNum = parseNumber(input);
  const hasLetters = (x: string) => /\p{L}{2,}/u.test(x.replace(/rp|cm|kg|m2|m²|cm²|m³|cm³|liter|buah|orang|jam|menit|detik|km|gram|g|l/gi, ''));
  for (const c of candidates) {
    const cn = parseNumber(c);
    if (cn !== null && inNum !== null && !hasLetters(c)) {
      if (nearlyEqual(cn, inNum)) return true;
    } else if (normalizeText(c) === normalizeText(input)) return true;
    else if (cn !== null && inNum !== null && nearlyEqual(cn, inNum)) return true;
  }
  return false;
}
