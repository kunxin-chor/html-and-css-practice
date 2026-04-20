import { Link, useRoute } from 'wouter';
import { Badge } from 'react-bootstrap';
import type { Question, QuestionStatus } from '../../types';

function StatusDot({ status }: { status: QuestionStatus }) {
  if (status === 'correct') {
    return (
      <Badge bg="success" pill title="Passed">
        ✓
      </Badge>
    );
  }
  if (status === 'incorrect') {
    return (
      <Badge bg="danger" pill title="Failing">
        ✗
      </Badge>
    );
  }
  return <span style={{ width: 20, display: 'inline-block' }} />;
}

interface Props {
  question: Question;
  status: QuestionStatus;
}

export function QuestionItem({ question, status }: Props) {
  const [active] = useRoute('/q/:id');
  const isActive =
    active && window.location.pathname === `/q/${question.id}`;
  return (
    <Link href={`/q/${question.id}`}>
      <a
        className={
          'd-flex justify-content-between align-items-center px-3 py-2 text-decoration-none question-item ' +
          (isActive ? 'active' : '')
        }
        style={{
          color: 'inherit',
          background: isActive ? 'var(--bs-primary-bg-subtle)' : undefined,
        }}
      >
        <span className="text-truncate small">
          {String(question.order).padStart(2, '0')}. {question.title}
        </span>
        <StatusDot status={status} />
      </a>
    </Link>
  );
}
