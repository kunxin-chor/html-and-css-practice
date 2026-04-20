import { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import type { Question } from '../../types';
import { Markdown } from '../Markdown';

export function WalkthroughView({ question }: { question: Question }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? 'Hide' : 'Show'} walkthrough
      </Button>
      <Collapse in={open}>
        <div className="mt-2">
          {question.hints && (
            <div className="mb-3">
              <h6>Hints</h6>
              <Markdown source={question.hints} />
            </div>
          )}
          <h6>Walkthrough</h6>
          <Markdown source={question.walkthrough} />
        </div>
      </Collapse>
    </div>
  );
}
