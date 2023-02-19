import "./style.css";
import { DevTools } from "jotai-devtools";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
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
