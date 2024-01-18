import { UseFieldOptions } from "form-atoms";
import { ReactNode } from "react";

import type { ZodField, ZodFieldValue } from "../../fields";

/**
 * Common Props to be used on FieldComponents like CheckboxField or NumberField.
 */
export type FieldProps<Field extends ZodField> = {
  field: Field;
  label?: ReactNode;
  required?: boolean;
} & Pick<UseFieldOptions<ZodFieldValue<Field>>, "initialValue">;
