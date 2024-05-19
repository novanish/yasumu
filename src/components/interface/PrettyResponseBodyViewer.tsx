import { Editor } from '@monaco-editor/react';
import { usePrettier } from '@/hooks/usePrettier';

export function Output({
  value,
  contentType,
}: {
  value: string;
  contentType?: string;
}) {
  const { code, parser } = usePrettier(value, contentType);

  return (
    <Editor
      height="300px"
      theme="vs-dark"
      // value disappears when this component is re-mounted
      // adding a random key fixes the issue
      key={Math.random()}
      value={code}
      language={parser.type || 'plaintext'}
      className="border rounded-sm"
      options={{
        readOnly: true,
        minimap: { enabled: false },
        lineNumbers: 'on',
        formatOnPaste: true,
        formatOnType: true,
        fontLigatures: true,
        autoIndent: 'full',
      }}
    />
  );
}
