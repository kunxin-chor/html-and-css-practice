import type { TestResult, TestRunSummary } from '../types';
import { buildPreviewSrcDoc } from './srcdoc';

const MOCHA_CSS = 'https://cdn.jsdelivr.net/npm/mocha@10/mocha.css';
const MOCHA_JS = 'https://cdn.jsdelivr.net/npm/mocha@10/mocha.js';
const CHAI_JS = 'https://cdn.jsdelivr.net/npm/chai@4/chai.js';

/**
 * Build the srcdoc for the hidden test iframe: the student's rendered
 * page + mocha + chai + the test cases + a small reporter that posts
 * results back to the parent window via postMessage.
 */
function buildTestSrcDoc(
  html: string,
  css: string,
  testCases: string[],
  runId: string
): string {
  const preview = buildPreviewSrcDoc(html, css);

  const harness = `
<div id="mocha" style="display:none"></div>
<link rel="stylesheet" href="${MOCHA_CSS}">
<script src="${MOCHA_JS}"></script>
<script src="${CHAI_JS}"></script>
<script>
  (function () {
    window.expect = window.chai.expect;
    mocha.setup({ ui: 'bdd', reporter: 'base', cleanReferencesAfterRun: false });
    var __results = [];
    var __runtimeError = null;
    try {
      ${testCases
        .map(
          (tc, i) => `
      try {
        ${tc}
      } catch (e) {
        __runtimeError = (__runtimeError || '') + 'Test block ${i + 1}: ' + (e && e.message || String(e)) + '\\n';
      }`
        )
        .join('\n')}
    } catch (outer) {
      __runtimeError = (__runtimeError || '') + String(outer);
    }
    var runner = mocha.run();
    runner.on('pass', function (t) {
      __results.push({ title: t.fullTitle(), passed: true });
    });
    runner.on('fail', function (t, err) {
      __results.push({
        title: t.fullTitle(),
        passed: false,
        error: (err && err.message) || String(err),
      });
    });
    runner.on('end', function () {
      parent.postMessage({
        type: 'hcq:test-results',
        runId: ${JSON.stringify(runId)},
        results: __results,
        runtimeError: __runtimeError,
      }, '*');
    });
  })();
</script>`;

  if (/<\/body>/i.test(preview)) {
    return preview.replace(/<\/body>/i, `${harness}\n</body>`);
  }
  return preview + harness;
}

export function runTests(
  html: string,
  css: string,
  testCases: string[]
): Promise<TestRunSummary> {
  return new Promise((resolve) => {
    const runId =
      'run-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);

    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    iframe.style.position = 'fixed';
    iframe.style.left = '-10000px';
    iframe.style.top = '-10000px';
    iframe.style.width = '800px';
    iframe.style.height = '600px';
    iframe.setAttribute('aria-hidden', 'true');

    const cleanup = () => {
      window.removeEventListener('message', onMessage);
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      clearTimeout(timeoutHandle);
    };

    const onMessage = (ev: MessageEvent) => {
      const data = ev.data as {
        type?: string;
        runId?: string;
        results?: TestResult[];
        runtimeError?: string | null;
      } | null;
      if (!data || data.type !== 'hcq:test-results' || data.runId !== runId) {
        return;
      }
      const results = data.results ?? [];
      const passed = results.filter((r) => r.passed).length;
      const failed = results.filter((r) => !r.passed).length;
      cleanup();
      resolve({
        results,
        passed,
        failed,
        runtimeError: data.runtimeError || undefined,
      });
    };

    const timeoutHandle = window.setTimeout(() => {
      cleanup();
      resolve({
        results: [],
        passed: 0,
        failed: 0,
        runtimeError:
          'Test runner timed out after 15s. Check your internet connection (mocha/chai are loaded from CDN) or your test code.',
      });
    }, 15000);

    window.addEventListener('message', onMessage);

    iframe.srcdoc = buildTestSrcDoc(html, css, testCases, runId);
    document.body.appendChild(iframe);
  });
}
