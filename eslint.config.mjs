// @ts-check

import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig(
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
);
