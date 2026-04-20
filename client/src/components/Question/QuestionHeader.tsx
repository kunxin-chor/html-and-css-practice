import type { Question } from '../../types';
import { Markdown } from '../Markdown';

interface Props {
  question: Question;
}

export function QuestionHeader({ question }: Props) {
  return (
    <div>
      <div className="text-muted small text-uppercase">
        {question.categorySlug}
      </div>
      <h4 className="mb-3">
        {String(question.order).padStart(2, '0')}. {question.title}
      </h4>
      <Markdown source={question.question} />
    </div>
  );
}
