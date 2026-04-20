import { HTMLHint } from 'htmlhint';
// csslint ships without types; cast at import.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - no type declarations shipped
import { CSSLint } from 'csslint';
import type { LintMessage } from '../types';

export function lintHtml(source: string): LintMessage[] {
  if (!source.trim()) return [];
  try {
    const raw = HTMLHint.verify(source);
    return raw.map((m) => ({
      source: 'html',
      line: m.line,
      col: m.col,
      message: m.message,
      severity: m.type === 'error' ? 'error' : 'warning',
      rule: m.rule?.id,
    }));
  } catch (err) {
    return [
      {
        source: 'html',
        message: 'HTMLHint failed: ' + (err as Error).message,
        severity: 'error',
      },
    ];
  }
}

interface CssLintRawMessage {
  line?: number;
  col?: number;
  message: string;
  type: 'error' | 'warning' | string;
  rule?: { id?: string };
}

export function lintCss(source: string): LintMessage[] {
  if (!source.trim()) return [];
  try {
    const result = (CSSLint as { verify: (s: string) => { messages: CssLintRawMessage[] } }).verify(source);
    return (result.messages ?? []).map((m) => ({
      source: 'css',
      line: m.line,
      col: m.col,
      message: m.message,
      severity: m.type === 'error' ? 'error' : 'warning',
      rule: m.rule?.id,
    }));
  } catch (err) {
    return [
      {
        source: 'css',
        message: 'CSSLint failed: ' + (err as Error).message,
        severity: 'error',
      },
    ];
  }
}

export function lintAll(html: string, css: string): LintMessage[] {
  return [...lintHtml(html), ...lintCss(css)];
}
