import { ReactNode } from "react";

import { RadioGroup, RadioGroupProps } from "./RadioGroup";
import { FieldLabel } from "..";
import { SelectField } from "../../hooks";
import { PicoFieldErrors } from "../../scenarios/PicoFieldErrors";

export const RadioGroupField = <Option, Field extends SelectField>({
  field,
  label,
  getValue,
  getLabel,
  options,
}: { label: ReactNode } & RadioGroupProps<Option, Field>) => (
  <>
    <FieldLabel field={field} label={label} />
    <RadioGroup
      field={field}
      getLabel={getLabel}
      getValue={getValue}
      options={options}
    />
    <PicoFieldErrors field={field} />
  </>
);
