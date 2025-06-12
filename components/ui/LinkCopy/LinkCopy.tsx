import React, { useState } from 'react';

interface CopyLinkProps {
  textToCopy: string; // Define the type for textToCopy
}

const CopyLink: React.FC<CopyLinkProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const input = document.createElement('input');
    input.value = textToCopy;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    setIsCopied(true);
  };

  return (
    <div>
      <p>{isCopied ? 'Text Copied!' : 'Click to Copy Text'}</p>
      <div>{textToCopy}</div>
      <button onClick={copyToClipboard}>Copy Text</button>
    </div>
  );
};

export default CopyLink;
