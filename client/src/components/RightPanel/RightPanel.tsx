import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import type { Question } from '../../types';
import { BrowserPreview } from '../Preview/BrowserPreview';
import { TestPanel } from '../Tests/TestPanel';
import { QuestionHeader } from '../Question/QuestionHeader';
import { SolutionView } from '../Question/SolutionView';
import { WalkthroughView } from '../Question/WalkthroughView';

type RightTab = 'question' | 'preview-test';

interface Props {
  question: Question;
  html: string;
  css: string;
  javascript: string;
}

export function RightPanel({ question, html, css, javascript }: Props) {
  const [activeTab, setActiveTab] = useState<RightTab>('question');

  return (
    <div className="d-flex flex-column h-100 border rounded overflow-hidden">
      {/* Tab navigation */}
      <div className="d-flex border-bottom bg-body-tertiary">
        <Nav
          variant="tabs"
          activeKey={activeTab}
          onSelect={(k) => k && setActiveTab(k as RightTab)}
          className="border-0"
        >
          <Nav.Item>
            <Nav.Link eventKey="question" className="py-2">
              Question
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="preview-test" className="py-2">
              Preview &amp; Test
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {/* Tab content */}
      <div className="flex-grow-1" style={{ minHeight: 0, overflow: 'hidden' }}>
        {activeTab === 'question' && (
          <div className="h-100 p-3 overflow-auto">
            <QuestionHeader question={question} />
            <SolutionView question={question} />
            <WalkthroughView question={question} />
          </div>
        )}
        {activeTab === 'preview-test' && (
          <div className="h-100 d-flex flex-column p-2" style={{ gap: '0.5rem' }}>
            {/* Preview on top */}
            <div style={{ flex: '1 1 50%', minHeight: 0 }}>
              <BrowserPreview html={html} css={css} javascript={javascript} />
            </div>
            {/* Test below */}
            <div
              className="border rounded p-2 bg-body overflow-hidden d-flex"
              style={{ flex: '1 1 50%', minHeight: 0 }}
            >
              <TestPanel
                question={question}
                html={html}
                css={css}
                javascript={javascript}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
