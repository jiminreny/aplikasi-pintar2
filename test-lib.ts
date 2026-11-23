import assert from 'node:assert/strict';
import { safeEval, parseNumber, checkShortAnswer } from '../src/lib/calc';
import { validateQuestions } from '../server/ai';
import { CHAPTERS } from '../src/data/curriculum';
import { DEMO_QUESTIONS } from '../src/data/demo-questions';

assert.equal(safeEval('24*15'), 360);
assert.equal(safeEval('(12+8)*2'), 40);
assert.equal(safeEval('process.exit()'), null);
assert.equal(parseNumber('Rp 15.000'), 15000);
assert.equal(parseNumber('2,5 kg'), 2.5);
assert.equal(parseNumber('3/4'), 0.75);
assert.ok(checkShortAnswer('160 liter', '160', ['160 liter']));
assert.ok(checkShortAnswer('0,25', '1/4'));
assert.ok(checkShortAnswer('Thirty five', 'thirty-five'));
assert.ok(!checkShortAnswer('161', '160'));

// validasi pilihan ganda: kunci salah ditolak
const bad = validateQuestions({ questions: [{ prompt: '2+3?', options: ['4', '5', '6', '7'], answerIndex: 0, calc: '2+3', explanation: ['x'] }] }, 'pilihan-ganda');
assert.equal(bad.ok.length, 0);
const good = validateQuestions({ questions: [{ prompt: '2+3?', options: ['4', '5', '6', '7'], answerIndex: 1, calc: '2+3', explanation: ['x'] }] }, 'pilihan-ganda');
assert.equal(good.ok.length, 1);
const dupOpt = validateQuestions({ questions: [{ prompt: 'q', options: ['5', '5', '6', '7'], answerIndex: 0, explanation: ['x'] }] }, 'pilihan-ganda');
assert.equal(dupOpt.ok.length, 0);

// data: setiap bab punya soal demo dan data lengkap
const ids = new Set<string>();
for (const c of CHAPTERS) {
  assert.ok(DEMO_QUESTIONS[c.id]?.length === 3, `demo ${c.id}`);
  for (const s of c.subtopics) {
    assert.ok(!ids.has(s.id)); ids.add(s.id);
    assert.ok(s.objectives.length && s.explanation.length && s.example.steps.length && s.summary.length, s.id);
  }
}
for (const qs of Object.values(DEMO_QUESTIONS)) for (const q of qs) {
  if (q.type === 'pilihan-ganda') { assert.equal(q.options!.length, 4); assert.ok(q.answerIndex! >= 0 && q.answerIndex! < 4); }
  if (q.type === 'cerita') assert.ok(checkShortAnswer(q.answer!, q.answer!, q.acceptedAnswers), q.id);
}
console.log('Semua tes lolos');
