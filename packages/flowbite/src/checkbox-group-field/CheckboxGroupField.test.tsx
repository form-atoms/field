import { multiSelectField } from "@form-atoms/field";
import { render, screen } from "@testing-library/react";
import { act as domAct, renderHook } from "@testing-library/react-hooks/dom";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { getLabel, getValue, options } from "./languages";

import { CheckboxGroupField } from ".";

describe("<CheckboxGroupField />", () => {
  const props = {
    options,
    getLabel,
    getValue,
    label: "lang",
  };

  it("should focus first checkbox when clicked on first label", async () => {
    const field = multiSelectField();

    render(<CheckboxGroupField field={field} {...props} />);

    const [firstCheckbox] = screen.getAllByRole("checkbox");

    await userEvent.click(screen.getByLabelText(options[0].name));

    expect(firstCheckbox).toHaveFocus();
  });

  it("should render error message when submitting empty & required", async () => {
    const field = multiSelectField();
    const form = formAtom({ field });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<CheckboxGroupField field={field} {...props} />);

    const onSubmit = vi.fn();
    await domAct(async () => {
      result.current(onSubmit)();
    });

    const [firstCheckbox] = screen.getAllByRole("checkbox");

    expect(firstCheckbox).toBeInvalid();
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  describe("with optional multiSelectField()", () => {
    it("submits form with empty array value", async () => {
      const value = multiSelectField({ optional: true });
      const form = formAtom({ value });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<CheckboxGroupField field={value} {...props} />);

      const onSubmit = vi.fn();
      await domAct(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ value: [] });
    });
  });
});
