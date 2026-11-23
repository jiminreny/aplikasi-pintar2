import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { SUBJECTS } from '../data/curriculum';
import type { Grade, SubjectId } from '../types';
import { update } from '../lib/store';
import { back } from '../lib/router';

export const subjectMeta = (id: SubjectId) => SUBJECTS.find(s => s.id === id)!;

export function Progress({ value, tone = 'blue' }: { value: number; tone?: string }) {
  return <div className={`progress tone-${tone}`} role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

export function Stars({ count, max = 3, size = 26 }: { count: number; max?: number; size?: number }) {
  return <span className="stars" aria-label={`${count} dari ${max} bintang`}>{Array.from({ length: max }, (_, i) => <Icon key={i} name="star" size={size} fill className={i < count ? 'star on' : 'star'} />)}</span>;
}

export function GradeToggle({ grade }: { grade: Grade }) {
  return (
    <div className="seg" role="group" aria-label="Pilih kelas">
      {([4, 5] as Grade[]).map(g => (
        <button key={g} className={g === grade ? 'on' : ''} onClick={() => update(s => ({ ...s, grade: g }))} aria-pressed={g === grade}>Kelas {g}</button>
      ))}
    </div>
  );
}

export function SubjectIcon({ id, size = 26 }: { id: SubjectId; size?: number }) {
  const m = subjectMeta(id);
  return <span className={`sicon tone-${m.color}`}><Icon name={m.icon} size={size} /></span>;
}

export function Spinner({ label }: { label: string }) {
  return <div className="spinner-wrap" role="status"><div className="spinner" /><p>{label}</p></div>;
}

export function Notice({ tone = 'info', title, children }: { tone?: 'info' | 'warn' | 'ok'; title?: string; children?: ReactNode }) {
  return (
    <div className={`notice notice-${tone}`}>
      <Icon name={tone === 'ok' ? 'check' : tone === 'warn' ? 'info' : 'sparkle'} size={20} />
      <div>{title && <strong>{title}</strong>}{children && <div>{children}</div>}</div>
    </div>
  );
}

export function PageHeader({ title, sub, backBtn, right }: { title: string; sub?: string; backBtn?: boolean; right?: ReactNode }) {
  return (
    <header className="page-head">
      <div>
        {backBtn && <button className="btn btn-ghost btn-sm back" onClick={back}><Icon name="left" size={18} /> Kembali</button>}
        <h1>{title}</h1>
        {sub && <p className="muted">{sub}</p>}
      </div>
      {right}
    </header>
  );
}
