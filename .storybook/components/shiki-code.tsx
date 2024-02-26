import React, { Fragment, useMemo } from "react";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { ButtonCopyToClipboard } from "./button-copy-to-clipboard";

const languagePrefix = "language-" as const;

type LanguageClassName = `${typeof languagePrefix}${string}`;

type Props = {
  className?: string;
  children: string;
};

export const code = ({ className, children }: Props) => {
  return className?.startsWith(languagePrefix) && children ? (
    <ShikiHtml className={className as LanguageClassName} code={children} />
  ) : (
    <code>{children}</code>
  );
};

type CodeProps = {
  code: string;
  className: LanguageClassName;
};

const ShikiHtml = ({ className, code }: CodeProps) => {
  const [__html, setHtml] = useState<string>("");
  const lang = useMemo(
    () => className?.slice(languagePrefix.length),
    [className],
  );

  useEffect(() => {
    codeToHtml(code, {
      lang,
      themes: { light: "min-light", dark: "poimandres" },
    }).then(setHtml);
  }, [code, className]);

  return __html ? (
    <div style={{ position: "relative" }}>
      <ButtonCopyToClipboard text={code} />
      <div dangerouslySetInnerHTML={{ __html }} />
    </div>
  ) : (
    <article aria-busy="true"></article>
  );
};
