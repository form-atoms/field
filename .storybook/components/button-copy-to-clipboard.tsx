import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Copy from "./icons/copy";
import Check from "./icons/check";

// Source https://github.com/picocss/picocss.com/blob/7fc423b65955df4a216247333839de34f2fe2b01/app/components/Code.jsx#L44
export const ButtonCopyToClipboard = ({ text, ...props }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = (event) => {
    event.preventDefault();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <CopyToClipboard text={text} {...props}>
      <a
        href="#"
        className="copy-to-clipboard"
        onClick={onCopy}
        tabIndex={-1}
        aria-label="Copy code"
        data-tooltip={copied ? "Copied" : undefined}
        data-placement="left"
      >
        {copied ? (
          <Check className="check" isAnimated={true} strokeWidth={3} />
        ) : (
          <Copy className="clipboard" />
        )}
      </a>
    </CopyToClipboard>
  );
};
