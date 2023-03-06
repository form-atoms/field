import { render, screen } from "@testing-library/react";
import { act as domAct, renderHook } from "@testing-library/react-hooks/dom";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { booleanField } from "../../fields";

import { Select } from ".";

describe("<Select />", () => {
  describe("with booleanField", () => {
    const props = {
      field: booleanField(),
      options: [true, false],
      getLabel: (bool: boolean) => (bool ? "yes" : "no"),
      getValue: (bool: boolean) => bool,
    };

    it("submits with boolean value", async () => {
      const form = formAtom({ field: props.field });
      const { result } = renderHook(() => useFormSubmit(form));
      render(<Select {...props} />);

      await userEvent.selectOptions(screen.getByRole("combobox"), [
        screen.getByText("yes"),
      ]);

      const onSubmit = vi.fn();
      await domAct(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: true });
    });

    it("should use the placeholder prop", () => {
      render(<Select {...props} placeholder="Do you agree?" />);

      expect(screen.getByText("Do you agree?")).toBeInTheDocument();
    });
  });
});
