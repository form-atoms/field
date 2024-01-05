import { ReactNode } from "react";

import { CheckboxGroup } from "./CheckboxGroup";
import { UseCheckboxGroupProps, ZodArrayField } from "../../hooks";
import { PicoFieldErrors } from "../../scenarios/PicoFieldErrors";
import { FieldLabel } from "../field-label";

export const CheckboxGroupField = <Option, Field extends ZodArrayField>({
  field,
  label,
  getValue,
  getLabel,
  options,
}: { label: ReactNode } & UseCheckboxGroupProps<Option, Field>) => (
  <>
    <FieldLabel field={field} label={label} />
    <p>
      <CheckboxGroup
        field={field}
        getLabel={getLabel}
        getValue={getValue}
        options={options}
      />
    </p>
    <PicoFieldErrors field={field} />
  </>
);
