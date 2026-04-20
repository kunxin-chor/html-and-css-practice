import { atom } from 'jotai';
import type {
  AnswerEntry,
  AnswersMap,
  ProgressEntry,
  ProgressMap,
  TestRunSummary,
} from '../types';
import { STORAGE_KEYS, loadJSON, saveJSON } from './storage';

// ---------- progress ----------

export type ProgressAction =
  | {
      type: 'record-run';
      id: string;
      summary: Pick<TestRunSummary, 'passed' | 'failed'>;
    }
  | { type: 'reset'; id?: string };

function progressReducer(state: ProgressMap, action: ProgressAction): ProgressMap {
  switch (action.type) {
    case 'record-run': {
      const { id, summary } = action;
      const entry: ProgressEntry = {
        status:
          summary.failed === 0 && summary.passed > 0 ? 'correct' : 'incorrect',
        lastRunAt: new Date().toISOString(),
        lastPassed: summary.passed,
        lastFailed: summary.failed,
      };
      return { ...state, [id]: entry };
    }
    case 'reset': {
      if (action.id) {
        const next = { ...state };
        delete next[action.id];
        return next;
      }
      return {};
    }
    default:
      return state;
  }
}

const progressBaseAtom = atom<ProgressMap>(
  loadJSON<ProgressMap>(STORAGE_KEYS.progress, {})
);

export const progressAtom = atom(
  (get) => get(progressBaseAtom),
  (get, set, action: ProgressAction) => {
    const next = progressReducer(get(progressBaseAtom), action);
    saveJSON(STORAGE_KEYS.progress, next);
    set(progressBaseAtom, next);
  }
);

// ---------- answers (auto-save) ----------

export type AnswerAction =
  | { type: 'save'; id: string; entry: Omit<AnswerEntry, 'updatedAt'> }
  | { type: 'reset'; id: string };

const answersBaseAtom = atom<AnswersMap>(
  loadJSON<AnswersMap>(STORAGE_KEYS.answers, {})
);

export const answersAtom = atom(
  (get) => get(answersBaseAtom),
  (get, set, action: AnswerAction) => {
    const current = get(answersBaseAtom);
    if (action.type === 'save') {
      const next: AnswersMap = {
        ...current,
        [action.id]: { ...action.entry, updatedAt: new Date().toISOString() },
      };
      saveJSON(STORAGE_KEYS.answers, next);
      set(answersBaseAtom, next);
      return;
    }
    if (action.type === 'reset') {
      const next = { ...current };
      delete next[action.id];
      saveJSON(STORAGE_KEYS.answers, next);
      set(answersBaseAtom, next);
    }
  }
);

// ---------- transient (per-question) ----------

export const lastRunAtom = atom<TestRunSummary | null>(null);
