import { fileFieldAtom } from "@react-last-field/field";
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FileField } from ".";

const profilePic = fileFieldAtom({ name: "profilePic" });

describe("<FileField />", () => {
  it("should focus input when clicked on label", async () => {
    render(<FileField field={profilePic} label="photo" />);

    await userEvent.click(screen.getByLabelText("photo"));

    expect(screen.getByRole("dialog")).toHaveFocus();
  });
});
