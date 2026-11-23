export type Grade = 4 | 5;
export type SubjectId = 'matematika' | 'bahasa-indonesia' | 'bahasa-inggris' | 'ipas';
export type Difficulty = 'mudah' | 'sedang' | 'sulit';
export type QType = 'pilihan-ganda' | 'cerita' | 'esai';

export interface WorkedExample {
  question: string;
  steps: string[];
  answer: string;
}

export interface Subtopic {
  id: string;
  title: string;
  objectives: string[];
  explanation: string[];
  everyday: string;
  example: WorkedExample;
  summary: string[];
  difficulty: Difficulty;
  tags: string[];
}

export interface Chapter {
  id: string;
  grade: Grade;
  subject: SubjectId;
  number: number;
  title: string;
  description: string;
  subtopics: Subtopic[];
}

export interface Question {
  id: string;
  type: QType;
  prompt: string;
  /** hanya untuk pilihan ganda: tepat 4 pilihan */
  options?: string[];
  answerIndex?: number;
  /** jawaban singkat (soal cerita) */
  answer?: string;
  acceptedAnswers?: string[];
  /** langkah pembahasan */
  explanation: string[];
  /** rubrik untuk esai / cerita non-angka */
  rubric?: string[];
  modelAnswer?: string;
  source: 'ai' | 'demo';
}

export interface GenerateRequest {
  chapterId: string;
  subtopicId?: string;
  type: QType;
  difficulty: Difficulty;
  count: number;
  avoid?: string[];
}

export interface EssayGradeRequest {
  chapterId: string;
  prompt: string;
  rubric: string[];
  modelAnswer: string;
  studentAnswer: string;
}

export interface RubricScore {
  criterion: string;
  points: number;
  max: number;
}

export interface EssayGradeResult {
  score: number;
  rubricScores: RubricScore[];
  correct: string[];
  improve: string[];
  betterAnswer: string;
  feedback: string;
}

export interface AiStatus {
  configured: boolean;
  provider?: string;
  model?: string;
}
