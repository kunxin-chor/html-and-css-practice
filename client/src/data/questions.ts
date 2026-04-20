import raw from '@data/questions.json';
import type { QuestionBundle } from '../types';

export const bundle: QuestionBundle = raw as QuestionBundle;

export const categoriesSorted = [...bundle.categories].sort(
  (a, b) => a.order - b.order
);

export const questionsByCategory: Record<string, typeof bundle.questions> = {};
for (const q of bundle.questions) {
  (questionsByCategory[q.categoryId] ??= []).push(q);
}
for (const list of Object.values(questionsByCategory)) {
  list.sort((a, b) => a.order - b.order);
}

export function getQuestionById(id: string) {
  return bundle.questions.find((q) => q.id === id);
}
