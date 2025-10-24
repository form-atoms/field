import { DevTools } from "jotai-devtools";
import React from "react";
import { type Preview } from "@storybook/react-vite";

import { code } from "./components/shiki-code";
import { PicoContainer } from "./components/pico-container";
import { Fragment } from "./components/fragment";

import "@picocss/pico";
import "@picocss/pico/css/pico.colors.min.css";

import "./style.css";
import { darkTheme } from "./theme";

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
        order: ["Introduction", "*", "Changelog"],
      },
    },
    docs: {
      canvas: {
        sourceState: "none",
      },
      theme: darkTheme,
      container: PicoContainer,
      components: {
        /**
         * The shiki-code renders <pre> so we nullify the regular pre into fragments.
         * This prevents duplicate nesting.
         */
        pre: Fragment,
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
        <DevTools theme="dark" />
        <Story />
      </>
    ),
  ],
} satisfies Preview;
