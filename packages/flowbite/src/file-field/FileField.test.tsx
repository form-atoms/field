import { fileField } from "@form-atoms/field";
import { render, screen } from "@testing-library/react";
import { act as domAct, renderHook } from "@testing-library/react-hooks/dom";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";
import { FileField } from ".";

describe("<FileField />", () => {
  it("should focus input when clicked on label", async () => {
    const profilePic = fileField();

    render(<FileField field={profilePic} label="photo" />);

    await userEvent.click(screen.getByLabelText("photo"));

    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  it.skip("should render error message when submitting empty & required file field", async () => {
    const doc = fileField();
    const form = formAtom({ doc });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<FileField field={doc} label="document scan" />);

    const onSubmit = vi.fn();
    await domAct(async () => {
      result.current(onSubmit)();
    });

    // TODO: event does not cause re-render
    expect(screen.getByRole("dialog")).toBeInvalid();
    expect(
      screen.getByText("Input not instance of FileList")
    ).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });
});
