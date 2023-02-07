import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare global {
  namespace Vi {
    interface Assertion extends TestingLibraryMatchers<any, void> {}
    interface AsymmetricMatchersContaining
      extends TestingLibraryMatchers<any, void> {}
  }
}
