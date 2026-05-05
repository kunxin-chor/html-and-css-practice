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
    return (result.messages ?? [])
      .filter((m) => m.type === 'error')
      .map((m) => ({
        source: 'css',
        line: m.line,
        col: m.col,
        message: m.message,
        severity: 'error',
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

export function lintAll(html: string, css: string, javascript: string): LintMessage[] {
  return [...lintHtml(html), ...lintCss(css), ...lintJavascript(javascript)];
}

// JavaScript linting using basic syntax checking
// For production, integrate ESLint via a proper build step or service worker
export function lintJavascript(source: string): LintMessage[] {
  if (!source.trim()) return [];
  const messages: LintMessage[] = [];

  // Basic syntax error detection using try/catch
  try {
    // This will catch syntax errors in the code
    new Function(source);
  } catch (err) {
    const error = err as Error;
    // Try to extract line number from error message
    const lineMatch = error.message.match(/:(\d+):/);
    const line = lineMatch ? parseInt(lineMatch[1], 10) : undefined;
    messages.push({
      source: 'javascript',
      line,
      message: `Syntax error: ${error.message}`,
      severity: 'error',
    });
  }

  // Basic linting rules (can be expanded)
  const lines = source.split('\n');
  lines.forEach((lineContent, index) => {
    const lineNum = index + 1;

    // Check for console.log (warning)
    if (/console\.(log|warn|error|info)/.test(lineContent)) {
      messages.push({
        source: 'javascript',
        line: lineNum,
        message: 'Console statement detected - remove before production',
        severity: 'warning',
        rule: 'no-console',
      });
    }

    // Check for var (suggest let/const)
    if (/^\s*var\s+/.test(lineContent)) {
      messages.push({
        source: 'javascript',
        line: lineNum,
        message: 'Use let or const instead of var',
        severity: 'warning',
        rule: 'no-var',
      });
    }

    // Check for == (suggest ===)
    if (/[!=]==(?!=)/.test(lineContent)) {
      messages.push({
        source: 'javascript',
        line: lineNum,
        message: 'Use === or !== instead of == or !=',
        severity: 'warning',
        rule: 'eqeqeq',
      });
    }
  });

  return messages;
}
