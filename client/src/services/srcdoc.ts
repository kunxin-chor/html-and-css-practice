/**
 * Builds the srcdoc string for the preview iframe.
 *
 * The student authors a full HTML document in `html` and CSS in `css`.
 * We always inject <style>{css}</style> into <head> so their CSS applies.
 * Any <link rel="stylesheet" href="style.css"> the student writes is
 * kept in the DOM (so tests can detect it) but will 404 harmlessly —
 * the inlined <style> is the real source of truth for styling.
 */
export function buildPreviewSrcDoc(html: string, css: string): string {
  const out = html;

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
