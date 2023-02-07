import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fieldAtom } from "form-atoms";
import { describe, expect, it } from "vitest";
import { TextField } from ".";

const lastName = fieldAtom({ name: "lastName", value: "" });

describe("<TextField />", () => {
  it("should focus input when clicked on label", async () => {
    render(<TextField field={lastName} label="last name" />);

    await userEvent.click(screen.getByLabelText("last name"));

    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});
