import { useMemo, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import type { Question } from '../../types';

interface Props {
  question: Question;
  html: string;
  css: string;
}

function buildPrompt(question: Question, html: string, css: string): string {
  return `You are checking a student's HTML/CSS practice answer.

Your job:
- Compare the student's code against the proposed solution below.
- Decide whether the student's code would solve the problem the same way the proposed solution does.
- Point out what is different or wrong compared to the proposed solution.
- ONLY comment on things covered by the proposed solution. Do NOT suggest accessibility improvements, best practices, naming conventions, semantics, performance, or anything outside the proposed solution.
- The goal is for the student to learn the specific syntax and concepts used in this exercise.
- Be concise and friendly. If the student's solution is effectively equivalent to the proposed solution, say so clearly.

===== QUESTION =====
${question.question.trim()}

===== PROPOSED SOLUTION =====
${question.solution.trim()}

===== STUDENT'S CODE =====
--- index.html ---
${html}

--- style.css ---
${css}

===== END =====

Now review the student's code against the proposed solution following the rules above.`;
}

export function CheckByAI({ question, html, css }: Props) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(
    () => buildPrompt(question, html, css),
    [question, html, css]
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: select the textarea
      const ta = document.getElementById(
        'check-by-ai-prompt'
      ) as HTMLTextAreaElement | null;
      ta?.select();
      document.execCommand?.('copy');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  function openIn(url: string) {
    // Copy first so the student can paste immediately.
    void navigator.clipboard?.writeText(prompt).catch(() => {});
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline-primary"
        className="ms-2"
        onClick={() => setShow(true)}
      >
        Check by AI
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Check by AI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="small text-muted mb-2">
            Copy the prompt below and paste it into your preferred AI chat
            (ChatGPT, Claude, Gemini, …). It asks the AI to compare your code
            against the proposed solution and only flag things the solution
            covers.
          </p>
          <Form.Control
            as="textarea"
            id="check-by-ai-prompt"
            value={prompt}
            readOnly
            rows={16}
            style={{ fontFamily: 'monospace', fontSize: 12 }}
          />
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <div className="d-flex gap-2">
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => openIn('https://chat.openai.com/')}
            >
              Copy &amp; open ChatGPT
            </Button>
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => openIn('https://claude.ai/new')}
            >
              Copy &amp; open Claude
            </Button>
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => openIn('https://gemini.google.com/app')}
            >
              Copy &amp; open Gemini
            </Button>
          </div>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy prompt'}
            </Button>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
