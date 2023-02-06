import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fieldAtom } from "form-atoms";
import { describe, expect, it } from "vitest";
import { TextareaField } from ".";

const bio = fieldAtom({ name: "bio", value: "" });

describe("<TextareaField />", () => {
  // Error: Element TEXTAREA does not implement "select".
  it.skip("should focus input when clicked on label", async () => {
    render(<TextareaField field={bio} label="biography" />);

    await userEvent.click(screen.getByLabelText("biography"));

    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});
