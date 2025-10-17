import { type State, addons } from "storybook/manager-api";
import { darkTheme } from "./theme";

addons.setConfig({
  theme: darkTheme,
  layoutCustomisations: {
    showToolbar(state: State, defaultValue: boolean) {
      return state.viewMode === "docs" ? false : defaultValue;
    },
  },
});
