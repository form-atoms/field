import { DevTools } from "jotai-devtools";
import React from "react";
import { type Preview } from "@storybook/react";

import { code } from "./components/shiki-code";
import { PicoContainer } from "./components/pico-container";

import "@picocss/pico";
import "@picocss/pico/css/pico.colors.min.css";

import "./style.css";

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
      container: PicoContainer,
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
