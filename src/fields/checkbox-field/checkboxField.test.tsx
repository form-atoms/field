import { act, renderHook } from "@testing-library/react";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { checkboxField } from "./checkboxField";
import { FormSubmitValues } from "../zodField";

describe("checkboxField()", () => {
  it.skip("TODO type tests", () => {
    const fields = {
      acceptedTermsOfService: checkboxField(),
      newsletter: checkboxField().optional(),
    };

    const signupFormAtom = formAtom(fields);

    type SignUpFormValues = FormSubmitValues<typeof signupFormAtom>;
  });

  describe("when required", () => {
    it("doesn't submit empty", async () => {
      const field = checkboxField();
      const form = formAtom({ field });
      const { result } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("when optional", () => {
    it("submits with false empty value", async () => {
      const field = checkboxField().optional();
      const form = formAtom({ field });
      const { result } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: false });
    });
  });
});
