import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { stringArrayField } from "../../fields";

import { MultiSelect } from ".";

describe("<MultiSelect />", () => {
  describe("with stringArrayField", () => {
    const props = {
      field: stringArrayField(),
      options: ["pl", "hu", "sk", "cz"],
      getLabel: (val: string) => val,
      getValue: (val: string) => val,
    };

    it("submits with string[] value", async () => {
      const form = formAtom({ field: props.field });
      const { result } = renderHook(() => useFormSubmit(form));
      render(<MultiSelect {...props} />);

      await userEvent.selectOptions(screen.getByRole("listbox"), [
        screen.getByText("cz"),
        screen.getByText("sk"),
      ]);

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: ["sk", "cz"] });
    });
  });
});
