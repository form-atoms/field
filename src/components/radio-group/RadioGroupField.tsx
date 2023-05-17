import { ReactNode } from "react";

import { RadioGroup, RadioGroupProps } from "./RadioGroup";
import { FieldLabel } from "..";
import { SelectField } from "../../hooks";
import { FieldErrors } from "../field-errors";

export const RadioGroupField = <Option, Field extends SelectField>({
  field,
  label,
  getValue,
  getLabel,
  options,
}: { label: ReactNode } & RadioGroupProps<Option, Field>) => (
  <div style={{ margin: "20px 0" }}>
    <FieldLabel field={field} label={label} />
    <RadioGroup
      field={field}
      getLabel={getLabel}
      getValue={getValue}
      options={options}
    />
    <FieldErrors field={field} />
  </div>
);
