import { DevTools } from "jotai-devtools";
import React from "react";
import { type Preview } from "@storybook/react";

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
