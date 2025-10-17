import { create } from "storybook/theming";

export const darkTheme = create({
  base: "dark",
  brandTitle: "form-atoms - Jotai form fields for React",
  brandImage: "./form-atoms-banner-transparent.png",
  colorSecondary: "#017FC0", // using CSS var(--pico-color-azure-500) here breaks the storybook

  // UI
  appBg: "var(--pico-color-slate-950)",
  appContentBg: "var(--pico-color-slate-900)", // ArgTypes & Story background
  appBorderColor: "transparent",

  // Toolbar
  barBg: "var(--pico-color-slate-850)",
});
