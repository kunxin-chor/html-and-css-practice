import { useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { Alert } from 'react-bootstrap';
import { getQuestionById } from '../data/questions';
import { CodeEditor } from '../components/Editor/CodeEditor';
import { BrowserPreview } from '../components/Preview/BrowserPreview';
import { TestPanel } from '../components/Tests/TestPanel';
import { QuestionHeader } from '../components/Question/QuestionHeader';
import { SolutionView } from '../components/Question/SolutionView';
import { WalkthroughView } from '../components/Question/WalkthroughView';
import { answersAtom, lastRunAtom } from '../state/atoms';

export function QuestionPage({ id }: { id: string }) {
  const question = getQuestionById(id);
  const [answers] = useAtom(answersAtom);
  const [, setLastRun] = useAtom(lastRunAtom);

  const initial = useMemo(() => {
    const saved = answers[id];
    if (saved) return { html: saved.html, css: saved.css };
    return {
      html: question?.startingFiles.html ?? '',
      css: question?.startingFiles.css ?? '',
    };
  }, [id, answers, question]);

  const [draft, setDraft] = useState(initial);

  // When switching questions, reset the draft from saved answer or starting files.
  useEffect(() => {
    setDraft(initial);
    setLastRun(null);
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
      className="d-grid flex-grow-1"
      style={{
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '0.75rem',
        padding: '0.75rem',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Top-left: Question description */}
      <div className="border rounded p-3 overflow-auto bg-body">
        <QuestionHeader question={question} />
        <SolutionView question={question} />
        <WalkthroughView question={question} />
      </div>

      {/* Top-right: Preview */}
      <div style={{ minHeight: 0 }}>
        <BrowserPreview html={draft.html} css={draft.css} />
      </div>

      {/* Bottom-left: Editor */}
      <div style={{ minHeight: 0 }}>
        <CodeEditor question={question} value={draft} onChange={setDraft} />
      </div>

      {/* Bottom-right: Tests */}
      <div className="border rounded p-3 overflow-hidden bg-body d-flex">
        <TestPanel question={question} html={draft.html} css={draft.css} />
      </div>
    </div>
  );
}
