import type { Chapter, Grade, SubjectId, Subtopic } from '../types';
import { MATEMATIKA } from './matematika';
import { BAHASA_INDONESIA } from './bahasa-indonesia';
import { BAHASA_INGGRIS } from './bahasa-inggris';
import { IPAS } from './ipas';

export const SUBJECTS: { id: SubjectId; label: string; color: string; icon: string; blurb: string }[] = [
  { id: 'matematika', label: 'Matematika', color: 'blue', icon: 'calc', blurb: 'Berhitung, pecahan, dan bangun' },
  { id: 'bahasa-indonesia', label: 'Bahasa Indonesia', color: 'green', icon: 'book', blurb: 'Membaca, menulis, dan kosakata' },
  { id: 'bahasa-inggris', label: 'Bahasa Inggris', color: 'purple', icon: 'globe', blurb: 'English untuk pemula' },
  { id: 'ipas', label: 'IPAS', color: 'yellow', icon: 'leaf', blurb: 'Alam dan lingkungan sekitar' },
];

export const SUBJECT_LABEL: Record<SubjectId, string> = Object.fromEntries(SUBJECTS.map(s => [s.id, s.label])) as Record<SubjectId, string>;

export const CHAPTERS: Chapter[] = [...MATEMATIKA, ...BAHASA_INDONESIA, ...BAHASA_INGGRIS, ...IPAS];

export const chapterById = (id: string) => CHAPTERS.find(c => c.id === id);
export const chaptersFor = (grade: Grade, subject: SubjectId) => CHAPTERS.filter(c => c.grade === grade && c.subject === subject);
export function findSubtopic(id: string): { chapter: Chapter; subtopic: Subtopic } | undefined {
  for (const chapter of CHAPTERS) {
    const subtopic = chapter.subtopics.find(s => s.id === id);
    if (subtopic) return { chapter, subtopic };
  }
}
export const allSubtopics = (grade?: Grade) =>
  CHAPTERS.filter(c => !grade || c.grade === grade).flatMap(c => c.subtopics.map(s => ({ chapter: c, subtopic: s })));
