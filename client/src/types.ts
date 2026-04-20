export interface Category {
  id: string;
  slug: string;
  name: string;
  order: number;
}

export interface StartingFiles {
  html: string;
  css: string;
}

export interface Question {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  categorySlug: string;
  order: number;
  sourcePath: string;
  question: string;
  answer: string;
  testCases: string[];
  startingFiles: StartingFiles;
  hints: string;
  solution: string;
  walkthrough: string;
}

export interface QuestionBundle {
  generatedAt: string;
  categories: Category[];
  questions: Question[];
}

export type QuestionStatus = 'untried' | 'correct' | 'incorrect';

export interface ProgressEntry {
  status: QuestionStatus;
  lastRunAt?: string;
  lastPassed?: number;
  lastFailed?: number;
}

export type ProgressMap = Record<string, ProgressEntry>;

export interface AnswerEntry {
  html: string;
  css: string;
  updatedAt: string;
}

export type AnswersMap = Record<string, AnswerEntry>;

export interface TestResult {
  title: string;
  passed: boolean;
  error?: string;
}

export interface TestRunSummary {
  results: TestResult[];
  passed: number;
  failed: number;
  runtimeError?: string;
}

export interface LintMessage {
  source: 'html' | 'css';
  line?: number;
  col?: number;
  message: string;
  severity: 'error' | 'warning';
  rule?: string;
}
