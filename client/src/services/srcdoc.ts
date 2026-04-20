/**
 * Builds the srcdoc string for the preview iframe.
 *
 * The student authors a full HTML document in `html` and CSS in `css`.
 * We:
 *   1. If the HTML has a <head>, inject <style>{css}</style> into it.
 *   2. Otherwise, wrap the HTML in a minimal document scaffold and
 *      inline the CSS in the head.
 *   3. Remove any <link rel="stylesheet" href="style.css"> reference
 *      because style.css is virtual — replaced by inline <style>.
 */
export function buildPreviewSrcDoc(html: string, css: string): string {
  let out = html;

  // Drop references to the virtual style.css; we inline instead.
  out = out.replace(
    /<link\s+[^>]*href\s*=\s*["']?style\.css["']?[^>]*>/gi,
    ''
  );

  const styleTag = `<style>\n${css}\n</style>`;

  if (/<head[^>]*>/i.test(out)) {
    return out.replace(/<head([^>]*)>/i, `<head$1>\n${styleTag}`);
  }

  if (/<html[^>]*>/i.test(out)) {
    return out.replace(
      /<html([^>]*)>/i,
      `<html$1>\n<head>${styleTag}</head>`
    );
  }

  return `<!DOCTYPE html><html><head>${styleTag}</head><body>${out}</body></html>`;
}
