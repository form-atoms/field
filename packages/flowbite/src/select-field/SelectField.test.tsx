import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SelectField } from "./";
import { country, options, getLabel, getValue } from "./country";

describe("<SelectField />", () => {
  it("should focus input when clicked on label", async () => {
    render(
      <SelectField
        field={country}
        getLabel={getLabel}
        getValue={getValue}
        options={options}
        label="country"
      />
    );

    await userEvent.click(screen.getByLabelText("country"));

    expect(screen.getByRole("combobox")).toHaveFocus();
  });
});
