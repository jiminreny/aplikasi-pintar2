import { useEffect, useState } from 'react';
import type { AiStatus } from '../types';
import { fetchStatus } from './api';

let cached: AiStatus | null = null;
export function useAiStatus(): AiStatus | null {
  const [s, setS] = useState<AiStatus | null>(cached);
  useEffect(() => {
    if (cached) return;
    let alive = true;
    fetchStatus().then(r => { cached = r; if (alive) setS(r); });
    return () => { alive = false; };
  }, []);
  return s;
}
