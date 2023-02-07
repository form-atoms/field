import { selectField } from "@form-atoms/field";
import { render, screen } from "@testing-library/react";
import { renderHook, act as domAct } from "@testing-library/react-hooks/dom";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";
import { RadioField } from ".";
import { options, getLabel, getValue } from "../select-field/country";

describe("<RadioField />", () => {
  const props = {
    options,
    getLabel,
    getValue,
    label: "country",
  };

  it("should render error message when submitting empty & required", async () => {
    const field = selectField();
    const form = formAtom({ field });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<RadioField field={field} {...props} />);

    const onSubmit = vi.fn();
    await domAct(async () => {
      result.current(onSubmit)();
    });

    const [firstRadio] = screen.getAllByRole("radio");

    expect(firstRadio).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });
});
