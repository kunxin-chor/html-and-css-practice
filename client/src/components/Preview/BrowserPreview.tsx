import { useMemo, useState } from 'react';
import { buildPreviewSrcDoc } from '../../services/srcdoc';

interface Props {
  html: string;
  css: string;
}

export function BrowserPreview({ html, css }: Props) {
  const [nonce, setNonce] = useState(0);
  const srcDoc = useMemo(() => buildPreviewSrcDoc(html, css), [html, css, nonce]);

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
          onClick={() => setNonce((n) => n + 1)}
        >
          ↻
        </button>
        <div
          className="flex-grow-1 small text-muted px-2 rounded"
          style={{ background: '#fff', border: '1px solid #ced4da' }}
        >
          about:preview/index.html
        </div>
      </div>
      <iframe
        key={nonce}
        title="preview"
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-same-origin"
        style={{ border: 0, width: '100%', height: '100%', background: '#fff' }}
      />
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
