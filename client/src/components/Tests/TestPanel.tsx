import { useMemo, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useAtom } from 'jotai';
import type { LintMessage, Question, TestRunSummary } from '../../types';
import { runTests } from '../../services/testRunner';
import { lintAll } from '../../services/linter';
import { lastRunAtom, progressAtom } from '../../state/atoms';

interface Props {
  question: Question;
  html: string;
  css: string;
}

export function TestPanel({ question, html, css }: Props) {
  const [running, setRunning] = useState(false);
  const [summary, setSummary] = useAtom(lastRunAtom);
  const [, dispatchProgress] = useAtom(progressAtom);

  const lintMessages = useMemo<LintMessage[]>(
    () => lintAll(html, css),
    [html, css]
  );

  async function handleRun() {
    setRunning(true);
    try {
      const result: TestRunSummary = await runTests(
        html,
        css,
        question.testCases
      );
      setSummary(result);
      dispatchProgress({
        type: 'record-run',
        id: question.id,
        summary: { passed: result.passed, failed: result.failed },
      });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h6 className="mb-0">Tests &amp; Lint</h6>
        <Button
          size="sm"
          variant="primary"
          onClick={handleRun}
          disabled={running}
        >
          {running ? (
            <>
              <Spinner size="sm" animation="border" className="me-1" />
              Running…
            </>
          ) : summary ? (
            'Re-run tests'
          ) : (
            'Run tests'
          )}
        </Button>
      </div>

      <div className="flex-grow-1 overflow-auto pe-1">
        <TestResults summary={summary} />
        <LintResults messages={lintMessages} />
      </div>
    </div>
  );
}

function TestResults({ summary }: { summary: TestRunSummary | null }) {
  if (!summary) {
    return (
      <div className="text-muted small mb-3">
        Click <strong>Run tests</strong> to evaluate your answer.
      </div>
    );
  }

  return (
    <div className="mb-3">
      {summary.runtimeError && (
        <Alert variant="warning" className="py-2 small mb-2">
          <strong>Test runtime notice:</strong>
          <pre className="mb-0 small" style={{ whiteSpace: 'pre-wrap' }}>
            {summary.runtimeError}
          </pre>
        </Alert>
      )}
      {summary.results.length === 0 && !summary.runtimeError && (
        <Alert variant="secondary" className="py-2 small mb-2">
          No test results were reported.
        </Alert>
      )}
      <div className="mb-2 small">
        <span className="text-success fw-semibold">{summary.passed} passed</span>
        {' · '}
        <span
          className={summary.failed > 0 ? 'text-danger fw-semibold' : 'text-muted'}
        >
          {summary.failed} failed
        </span>
      </div>
      <ul className="list-unstyled mb-0">
        {summary.results.map((r, i) => (
          <li
            key={i}
            className={
              'px-2 py-1 mb-1 small rounded ' +
              (r.passed ? 'bg-success-subtle' : 'bg-danger-subtle')
            }
          >
            <span className="me-2">{r.passed ? '✓' : '✗'}</span>
            {r.title}
            {!r.passed && r.error && (
              <pre
                className="mb-0 mt-1 small text-danger"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {r.error}
              </pre>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LintResults({ messages }: { messages: LintMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="small text-success">
        <strong>Linter:</strong> no issues detected.
      </div>
    );
  }
  return (
    <div>
      <div className="small fw-semibold mb-1">Linter issues</div>
      <ul className="list-unstyled mb-0">
        {messages.map((m, i) => (
          <li
            key={i}
            className={
              'px-2 py-1 mb-1 small rounded ' +
              (m.severity === 'error' ? 'bg-danger-subtle' : 'bg-warning-subtle')
            }
          >
            <span className="text-uppercase me-2">[{m.source}]</span>
            {m.line ? `L${m.line}${m.col ? ':' + m.col : ''} — ` : ''}
            {m.message}
            {m.rule && <span className="text-muted"> ({m.rule})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
