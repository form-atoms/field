import { textField } from "@form-atoms/field";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { TextField } from ".";

describe("<TextField />", () => {
  it("should focus input when clicked on label", async () => {
    const lastName = textField();

    render(<TextField field={lastName} label="last name" />);

    await userEvent.click(screen.getByLabelText("last name"));

    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});
