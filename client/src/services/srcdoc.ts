/**
 * Builds the srcdoc string for the preview iframe.
 *
 * The student authors a full HTML document in `html` and CSS in `css`.
 * We always inject <style>{css}</style> into <head> so their CSS applies.
 * Any <link rel="stylesheet" href="style.css"> the student writes is
 * kept in the DOM (so tests can detect it) but will 404 harmlessly —
 * the inlined <style> is the real source of truth for styling.
 *
 * JavaScript is injected via a <script> tag at the end of <body>.
 */
export function buildPreviewSrcDoc(
  html: string,
  css: string,
  javascript: string
): string {
  const out = html;

  // Resolve relative URLs (e.g. axios.get('/data.json')) against the parent
  // window's origin. Without this, the iframe document URL is 'about:srcdoc',
  // which is not a valid base URL and makes fetch / axios / new URL() throw.
  const baseHref =
    typeof window !== 'undefined' && window.location && window.location.origin
      ? `${window.location.origin}/`
      : '/';
  const baseTag = `<base href="${baseHref}">`;

  const styleTag = `<style>\n${css}\n</style>`;
  const scriptTag = `<script>\n// Console capture for preview\n(function() {\n  const originalConsole = { ...console };\n  window.parent.postMessage({ type: 'console', method: 'log', args: ['Console ready'] }, '*');\n  ['log', 'warn', 'error', 'info'].forEach(method => {\n    console[method] = function(...args) {\n      originalConsole[method](...args);\n      window.parent.postMessage({ type: 'console', method, args: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)) }, '*');\n    };\n  });\n  window.addEventListener('error', (e) => {\n    window.parent.postMessage({ type: 'console', method: 'error', args: [e.message + ' at ' + e.filename + ':' + e.lineno] }, '*');\n  });\n})();\n\n${javascript}\n<\/script>`;

  let result = out;

  // Inject <base> first (so relative URLs resolve), then CSS
  if (/<head[^>]*>/i.test(result)) {
    result = result.replace(
      /<head([^>]*)>/i,
      `<head$1>\n${baseTag}\n${styleTag}`
    );
  } else if (/<html[^>]*>/i.test(result)) {
    result = result.replace(
      /<html([^>]*)>/i,
      `<html$1>\n<head>${baseTag}${styleTag}</head>`
    );
  } else {
    result = `<!DOCTYPE html><html><head>${baseTag}${styleTag}</head><body>${result}</body></html>`;
  }

  // Inject JavaScript at the end of body
  if (/<body[^>]*>/i.test(result)) {
    result = result.replace(/<\/body>/i, `${scriptTag}\n</body>`);
  } else if (/<html[^>]*>/i.test(result)) {
    result = result.replace(/<\/html>/i, `</body>\n${scriptTag}\n</html>`);
  } else {
    result = `${result}\n${scriptTag}`;
  }

  return result;
}
