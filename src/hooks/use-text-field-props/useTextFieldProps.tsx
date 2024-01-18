import { UseFieldOptions } from "form-atoms";
import { ChangeEvent } from "react";

import { FieldProps, useFieldProps } from "../";
import type { TextField, TextFieldValue } from "../../fields";

export type TextFieldProps = FieldProps<TextField>;

const getEventValue = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
) => event.currentTarget.value;

export const useTextFieldProps = (
  field: TextField,
  options: UseFieldOptions<TextFieldValue>,
) =>
  useFieldProps<TextField, HTMLInputElement | HTMLTextAreaElement>(
    field,
    getEventValue,
    options,
  );
