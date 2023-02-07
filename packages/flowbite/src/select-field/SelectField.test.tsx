import { selectField } from "@react-last-field/field";
import { render, screen } from "@testing-library/react";
import { renderHook, act as domAct } from "@testing-library/react-hooks/dom";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";
import { SelectField } from "./";
import { country, options, getLabel, getValue } from "./country";

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

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });
});
