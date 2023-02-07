import { fileField } from "@react-last-field/field";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FileField } from ".";

describe("<FileField />", () => {
  it.only("should focus input when clicked on label", async () => {
    const profilePic = fileField();

    render(<FileField field={profilePic} label="photo" />);

    await userEvent.click(screen.getByLabelText("photo"));

    expect(screen.getByRole("dialog")).toHaveFocus();
  });
});
