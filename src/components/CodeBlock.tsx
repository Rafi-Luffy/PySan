// src/components/CodeBlock.tsx
import { useState } from 'react';

interface CodeBlockProps {
  id: string;
  codeText: string;
  codeHtml: string;
  copyBtnTitle: string;
}

export function CodeBlock({ id, codeText, codeHtml, copyBtnTitle }: CodeBlockProps) {
  const [copyText, setCopyText] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText).then(() => {
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy'), 2000);
    });
  };

  return (
    <div className="code-container">
      <button onClick={handleCopy} className="copy-button" title={copyBtnTitle}>
        <span>{copyText}</span> <i className="fa-solid fa-copy"></i>
      </button>
      <div 
        className="code-block" 
        id={id}
        dangerouslySetInnerHTML={{ __html: codeHtml }} 
      />
    </div>
  );
}