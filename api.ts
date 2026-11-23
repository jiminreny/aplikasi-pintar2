import type { AiStatus, EssayGradeRequest, EssayGradeResult, GenerateRequest, Question } from '../types';

export class ApiError extends Error {
  constructor(message: string, public code?: string) { super(message); }
}

async function post<T>(url: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  } catch {
    throw new ApiError('Sepertinya koneksi internet sedang bermasalah. Coba lagi ya.', 'network');
  }
  let data: any = null;
  try { data = await res.json(); } catch { /* bukan JSON */ }
  if (!res.ok) throw new ApiError(data?.error || 'Ada kendala saat menghubungi guru AI. Coba lagi ya.', data?.code);
  return data as T;
}

export async function fetchStatus(): Promise<AiStatus> {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) return { configured: false };
    return await res.json();
  } catch {
    return { configured: false };
  }
}

export const apiGenerate = (req: GenerateRequest) => post<{ questions: Question[] }>('/api/generate', req).then(r => r.questions);
export const apiGrade = (req: EssayGradeRequest) => post<EssayGradeResult>('/api/grade', req);
