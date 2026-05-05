import { useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { Alert } from 'react-bootstrap';
import { getQuestionById } from '../data/questions';
import { CodeEditor } from '../components/Editor/CodeEditor';
import { RightPanel } from '../components/RightPanel/RightPanel';
import { answersAtom } from '../state/atoms';

export function QuestionPage({ id }: { id: string }) {
  const question = getQuestionById(id);
  const [answers] = useAtom(answersAtom);

  const initial = useMemo(() => {
    const saved = answers[id];
    if (saved)
      return {
        html: saved.html,
        css: saved.css,
        javascript: saved.javascript ?? '',
      };
    return {
      html: question?.startingFiles.html ?? '',
      css: question?.startingFiles.css ?? '',
      javascript: question?.startingFiles.javascript ?? '',
    };
  }, [id, answers, question]);

  const [draft, setDraft] = useState(initial);

  // When switching questions, reset the draft from saved answer or starting files.
  useEffect(() => {
    setDraft(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!question) {
    return (
      <div className="p-4">
        <Alert variant="danger">Question not found: {id}</Alert>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-grow-1"
      style={{
        gap: '0.75rem',
        padding: '0.75rem',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Left column: Code Editor */}
      <div style={{ width: '50%', minHeight: 0 }}>
        <CodeEditor question={question} value={draft} onChange={setDraft} />
      </div>

      {/* Right column: Preview/Test/Question panel */}
      <div style={{ width: '50%', minHeight: 0 }}>
        <RightPanel
          question={question}
          html={draft.html}
          css={draft.css}
          javascript={draft.javascript}
        />
      </div>
    </div>
  );
}
