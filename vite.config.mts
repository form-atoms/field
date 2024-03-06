/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/@(atoms|components|fields|hooks)"],
      exclude: ["**/*.@(mock|stories|test-d).@(ts|tsx)"],
    },
    typecheck: {
      // TODO(enable): Jest matchers have missing types for some reason
      // https://github.com/vitest-dev/vitest/issues/5256#issuecomment-1980431555
      ignoreSourceErrors: true,
    },
  },
});
