import { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import type { Question } from '../../types';
import { Markdown } from '../Markdown';

export function SolutionView({ question }: { question: Question }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? 'Hide' : 'Show'} proposed solution
      </Button>
      <Collapse in={open}>
        <div className="mt-2">
          <Markdown source={question.solution} />
        </div>
      </Collapse>
    </div>
  );
}
