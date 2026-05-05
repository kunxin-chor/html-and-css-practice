import { useEffect, useMemo, useState } from 'react';
import { buildPreviewSrcDoc } from '../../services/srcdoc';

interface Props {
  html: string;
  css: string;
  javascript: string;
}

interface ConsoleMessage {
  method: 'log' | 'warn' | 'error' | 'info';
  args: string[];
}

export function BrowserPreview({ html, css, javascript }: Props) {
  const [nonce, setNonce] = useState(0);
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [showConsole, setShowConsole] = useState(false);

  const srcDoc = useMemo(
    () => buildPreviewSrcDoc(html, css, javascript),
    [html, css, javascript, nonce]
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'console') {
        setConsoleMessages((prev) => [
          ...prev,
          { method: event.data.method, args: event.data.args },
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleRefresh = () => {
    setNonce((n) => n + 1);
    setConsoleMessages([]);
  };

  return (
    <div className="d-flex flex-column h-100 border rounded overflow-hidden shadow-sm">
      {/* Fake browser chrome */}
      <div
        className="d-flex align-items-center px-2 py-1 border-bottom"
        style={{ background: '#e9ecef' }}
      >
        <div className="d-flex gap-1 me-2">
          <span style={dotStyle('#ff5f57')} />
          <span style={dotStyle('#febc2e')} />
          <span style={dotStyle('#28c840')} />
        </div>
        <button
          type="button"
          className="btn btn-sm btn-light border me-2 py-0 px-2"
          title="Refresh preview"
          onClick={handleRefresh}
        >
          ↻
        </button>
        <div
          className="flex-grow-1 small text-muted px-2 rounded"
          style={{ background: '#fff', border: '1px solid #ced4da' }}
        >
          about:preview/index.html
        </div>
        <button
          type="button"
          className="btn btn-sm btn-light border me-2 py-0 px-2"
          title="Toggle console"
          onClick={() => setShowConsole(!showConsole)}
        >
          {showConsole ? 'Hide Console' : 'Show Console'}
        </button>
      </div>
      <div className="flex-grow-1" style={{ minHeight: 0, position: 'relative' }}>
        <iframe
          key={nonce}
          title="preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-same-origin"
          style={{ border: 0, width: '100%', height: '100%', background: '#fff' }}
        />
        {showConsole && (
          <div
            className="position-absolute bottom-0 start-0 end-0 bg-dark text-white"
            style={{ height: '150px', overflow: 'auto', borderTop: '1px solid #444' }}
          >
            <div className="p-2 small">
              {consoleMessages.length === 0 && (
                <span className="text-muted">No console messages</span>
              )}
              {consoleMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-1 ${
                    msg.method === 'error'
                      ? 'text-danger'
                      : msg.method === 'warn'
                      ? 'text-warning'
                      : 'text-white'
                  }`}
                >
                  <span className="fw-bold me-2">[{msg.method}]</span>
                  {msg.args.join(' ')}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function dotStyle(color: string): React.CSSProperties {
  return {
    width: 11,
    height: 11,
    borderRadius: '50%',
    background: color,
    display: 'inline-block',
  };
}
