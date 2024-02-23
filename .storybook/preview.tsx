import { DevTools } from "jotai-devtools";
import React from "react";
import { type Preview } from "@storybook/react";

import { code } from "./shiki-code";
import { DocsContainer } from "./docs-container";

const PicoDocsContainer = ({ children, ...props }: any) => {
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

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ["Intro", "*", "Changelog"],
      },
    },
    docs: {
      container: PicoDocsContainer,
      components: {
        code,
      },
      toc: {
        headingSelector: "h2, h3",
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <DevTools />
        <Story />
      </>
    ),
  ],
} satisfies Preview;
