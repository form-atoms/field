import { DevTools } from "jotai-devtools";
import React from "react";

export const parameters = {
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
};

export const decorators = [
  (Story) => (
    <>
      <DevTools />
      <Story />
    </>
  ),
];
