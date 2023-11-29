import { DevTools } from "jotai-devtools";
import React from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
};

export const decorators = [
  (Story) => (
    <>
      <DevTools />
      <Story />
    </>
  ),
];
