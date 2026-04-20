declare module '@data/questions.json' {
  import type { QuestionBundle } from './types';
  const value: QuestionBundle;
  export default value;
}

declare module 'htmlhint' {
  interface HtmlHintMessage {
    line?: number;
    col?: number;
    message: string;
    type: 'error' | 'warning' | 'info' | string;
    rule?: { id?: string };
  }
  export const HTMLHint: {
    verify: (source: string, ruleset?: Record<string, unknown>) => HtmlHintMessage[];
  };
}

declare module 'csslint';
