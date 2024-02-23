import { DevTools } from "jotai-devtools";
import React from "react";
import { type Preview } from "@storybook/react";

import { code } from "./shiki-code";

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
