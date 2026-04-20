import { useMemo } from 'react';
import { marked } from 'marked';

interface Props {
  source: string;
  className?: string;
}

export function Markdown({ source, className }: Props) {
  const html = useMemo(
    () => marked.parse(source ?? '', { async: false }) as string,
    [source]
  );
  return (
    <div
      className={'markdown-body ' + (className ?? '')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
