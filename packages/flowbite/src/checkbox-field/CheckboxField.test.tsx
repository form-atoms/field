import { checkboxField } from "@react-last-field/field";
import { act as domAct, renderHook } from "@testing-library/react-hooks/dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";
import { CheckboxField } from ".";

describe("<CheckboxField />", () => {
  it("should focus input when clicked on label", async () => {
    const tos = checkboxField({ name: "tos" });

    render(<CheckboxField field={tos} label="terms" />);

    await userEvent.click(screen.getByLabelText("terms"));

    expect(screen.getByRole("checkbox")).toHaveFocus();
  });

  it("should render error message when submitting required checkbox", async () => {
    const handleSubmit = vi.fn(() => {});
    const tos = checkboxField({ name: "tos", required: true });
    const form = formAtom({ tos });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<CheckboxField field={tos} label="terms" />);

    await domAct(async () => {
      result.current(handleSubmit)();
    });

    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
