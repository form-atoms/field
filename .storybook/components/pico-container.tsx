import React from "react";
import { DocsContainer } from "./docs-container";

export const PicoContainer = ({ children, ...props }: any) => {
  return (
    <DocsContainer
      {...props}
      DocsPage={({ toc, children }) => (
        <div className="container">
          <main>{children}</main>
          {toc && <aside>{toc}</aside>}
        </div>
      )}
    >
      {children}
    </DocsContainer>
  );
};
