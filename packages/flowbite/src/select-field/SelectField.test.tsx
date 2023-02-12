import { selectField } from "@form-atoms/field";
import { render, screen } from "@testing-library/react";
import { act as domAct, renderHook } from "@testing-library/react-hooks/dom";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { country, getLabel, getValue, options } from "./country";

import { SelectField } from "./";

describe("<SelectField />", () => {
  const props = {
    options,
    getLabel,
    getValue,
    label: "country",
  };

  it("should focus input when clicked on label", async () => {
    render(<SelectField field={country} {...props} />);

    await userEvent.click(screen.getByLabelText("country"));

    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("should render error message when submitting empty & required", async () => {
    const field = selectField();
    const form = formAtom({ field });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<SelectField field={field} {...props} />);

    const onSubmit = vi.fn();
    await domAct(async () => {
      result.current(onSubmit)();
    });

    const select = screen.getByRole("combobox");

    expect(select).toHaveAttribute("aria-required", "true");
    // TODO: should be separate test and have different behavior
    // expect(select).toHaveAttribute("required", "true");

    expect(select).toBeInvalid();
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  it("should use the placeholder prop", () => {
    const field = selectField();

    render(
      <SelectField field={field} {...props} placeholder="Pick a country" />
    );

    expect(screen.getByText("Pick a country")).toBeInTheDocument();
  });
});
