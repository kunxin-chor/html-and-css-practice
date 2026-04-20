import { useState } from 'react';
import { useAtomValue } from 'jotai';
import type { Category, Question } from '../../types';
import { progressAtom } from '../../state/atoms';
import { QuestionItem } from './QuestionItem';

interface Props {
  category: Category;
  questions: Question[];
}

export function CategoryGroup({ category, questions }: Props) {
  const [open, setOpen] = useState(true);
  const progress = useAtomValue(progressAtom);

  const correct = questions.filter(
    (q) => progress[q.id]?.status === 'correct'
  ).length;

  return (
    <div className="mb-2">
      <button
        type="button"
        className="btn btn-sm w-100 d-flex justify-content-between align-items-center text-start px-3 py-2 fw-semibold"
        style={{ background: 'var(--bs-secondary-bg)' }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>
          <span className="me-2">{open ? '▾' : '▸'}</span>
          {category.name}
        </span>
        <small className="text-muted">
          {correct}/{questions.length}
        </small>
      </button>
      {open && (
        <div className="d-flex flex-column">
          {questions.map((q) => (
            <QuestionItem
              key={q.id}
              question={q}
              status={progress[q.id]?.status ?? 'untried'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
