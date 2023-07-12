import { OptionHTMLAttributes } from "react";

import { EMPTY_SELECT_VALUE } from "../../hooks";

export const PlaceholderOption = ({
  children = "Please select an option",
  disabled = true,
  ...props
}: OptionHTMLAttributes<HTMLOptionElement>) => (
  <option {...props} disabled={disabled} value={EMPTY_SELECT_VALUE}>
    {children}
  </option>
);
