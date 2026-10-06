import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Nav } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { answersAtom } from '../../state/atoms';
import type { Question } from '../../types';

type EditableTab = 'html' | 'css' | 'javascript';
type Tab = EditableTab | `data:${string}`;

interface Props {
  question: Question;
  onChange: (value: { html: string; css: string; javascript: string }) => void;
  value: { html: string; css: string; javascript: string };
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
        entry: { html: value.html, css: value.css, javascript: value.javascript },
      });
    }, 400);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [value.html, value.css, value.javascript, question.id, dispatchAnswers]);

  const dataFile = question.dataFiles?.find(file => `data:${file.url}` === tab);
  const editableTab: EditableTab = tab.startsWith('data:') ? 'html' : tab as EditableTab;
  const activeTab = dataFile ? tab : editableTab;
  const language = dataFile?.language ?? editableTab;
  const current = dataFile?.content ?? value[editableTab];

  return (
    <div className="d-flex flex-column h-100 border rounded overflow-hidden">
      <div className="d-flex justify-content-between align-items-center border-bottom bg-body-tertiary">
        <Nav
          variant="tabs"
          activeKey={activeTab}
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
          <Nav.Item>
            <Nav.Link eventKey="javascript" className="py-1">
              script.js
            </Nav.Link>
          </Nav.Item>
          {question.dataFiles?.map(file => (
            <Nav.Item key={file.url}>
              <Nav.Link eventKey={`data:${file.url}`} className="py-1" title={`${file.url} (read-only)`}>
                {file.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <small className="text-muted pe-3 text-nowrap">{dataFile ? 'read-only' : 'auto-saved'}</small>
      </div>
      <div className="flex-grow-1" style={{ minHeight: 0 }}>
        <Editor
          key={`${question.id}:${activeTab}`}
          height="100%"
          language={language}
          theme="vs-dark"
          value={current}
          onChange={(next) => {
            if (dataFile) return;
            const updated = { ...value, [editableTab]: next ?? '' };
            onChange(updated);
          }}
          options={{
            readOnly: !!dataFile,
            domReadOnly: !!dataFile,
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
