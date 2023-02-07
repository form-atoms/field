import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NumberField } from ".";
import { numberField } from "@form-atoms/field";
import { formAtom, useFormSubmit } from "form-atoms";
import { renderHook, act as domAct } from "@testing-library/react-hooks/dom";

describe("<NumberField />", () => {
  it("should focus input when clicked on label", async () => {
    const amount = numberField();

    render(<NumberField field={amount} label="amount" />);

    await userEvent.click(screen.getByLabelText("amount"));

    expect(screen.getByRole("spinbutton")).toHaveFocus();
  });

  it("should render error message when submitting empty & required", async () => {
    const price = numberField();
    const form = formAtom({ price });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<NumberField field={price} label="price" />);

    const onSubmit = vi.fn();
    await domAct(async () => {
      result.current(onSubmit)();
    });

    expect(screen.getByRole("spinbutton")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });
});
