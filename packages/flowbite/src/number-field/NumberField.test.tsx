import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NumberField } from ".";
import { numberField } from "@react-last-field/field";

const amount = numberField({ name: "amount" });

describe("<NumberField />", () => {
  it("should focus input when clicked on label", async () => {
    render(<NumberField field={amount} label="amount" />);

    await userEvent.click(screen.getByLabelText("amount"));

    expect(screen.getByRole("spinbutton")).toHaveFocus();
  });
});
