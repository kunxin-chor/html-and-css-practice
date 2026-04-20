import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Nav } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { answersAtom } from '../../state/atoms';
import type { Question } from '../../types';

type Tab = 'html' | 'css';

interface Props {
  question: Question;
  onChange: (value: { html: string; css: string }) => void;
  value: { html: string; css: string };
}

export function CodeEditor({ question, onChange, value }: Props) {
  const [tab, setTab] = useState<Tab>('html');
  const [, dispatchAnswers] = useAtom(answersAtom);
  const saveTimer = useRef<number | null>(null);

  // Debounced auto-save to localStorage.
  useEffect(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      dispatchAnswers({
        type: 'save',
        id: question.id,
        entry: { html: value.html, css: value.css },
      });
    }, 400);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [value.html, value.css, question.id, dispatchAnswers]);

  const language = tab === 'html' ? 'html' : 'css';
  const current = value[tab];

  return (
    <div className="d-flex flex-column h-100 border rounded overflow-hidden">
      <div className="d-flex justify-content-between align-items-center border-bottom bg-body-tertiary">
        <Nav
          variant="tabs"
          activeKey={tab}
          onSelect={(k) => k && setTab(k as Tab)}
          className="border-0"
        >
          <Nav.Item>
            <Nav.Link eventKey="html" className="py-1">
              index.html
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="css" className="py-1">
              style.css
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <small className="text-muted pe-3">auto-saved</small>
      </div>
      <div className="flex-grow-1" style={{ minHeight: 0 }}>
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={current}
          onChange={(next) => {
            const updated = { ...value, [tab]: next ?? '' };
            onChange(updated);
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}
