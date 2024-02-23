// TODO: remove after fix merged
// https://github.com/storybookjs/storybook/pull/26168

import type { FC, PropsWithChildren, ReactNode } from "react";
import React, { useEffect } from "react";
import { global } from "@storybook/global";
import type { ThemeVars } from "@storybook/theming";
import { ThemeProvider, ensure as ensureTheme } from "@storybook/theming";
import type { Renderer } from "@storybook/types";
import type { DocsContextProps } from "@storybook/blocks";
import { DocsContext } from "@storybook/blocks";
import { SourceContainer } from "@storybook/blocks";

export function scrollToElement(element: any, block = "start") {
  element.scrollIntoView({
    behavior: "smooth",
    block,
    inline: "nearest",
  });
}

const { document, window: globalWindow } = global;

type DocsPage = (props: PropsWithChildren<{ toc: ReactNode }>) => ReactNode;

export interface DocsContainerProps<TFramework extends Renderer = Renderer> {
  context: DocsContextProps<TFramework>;
  theme?: ThemeVars;
  DocsPage: DocsPage;
}

export const DocsContainer: FC<PropsWithChildren<DocsContainerProps>> = ({
  context,
  theme,
  DocsPage,
  children,
}) => {
  let toc;

  try {
    const meta = context.resolveOf("meta", ["meta"]);
    toc = meta.preparedMeta.parameters?.docs?.toc;
  } catch (err) {
    // No meta, falling back to project annotations
    toc = context?.projectAnnotations?.parameters?.docs?.toc;
  }

  useEffect(() => {
    let url;
    try {
      url = new URL(globalWindow.parent.location.toString());
      if (url.hash) {
        const element = document.getElementById(url.hash.substring(1));
        if (element) {
          // Introducing a delay to ensure scrolling works when it's a full refresh.
          setTimeout(() => {
            scrollToElement(element);
          }, 200);
        }
      }
    } catch (err) {
      // pass
    }
  });

  return (
    <DocsContext.Provider value={context}>
      <SourceContainer channel={context.channel}>
        <ThemeProvider theme={ensureTheme(theme!)}>
          {/** @ts-ignore */}
          <DocsPage toc={null}>{children}</DocsPage>
        </ThemeProvider>
      </SourceContainer>
    </DocsContext.Provider>
  );
};
