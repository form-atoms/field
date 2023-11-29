import { ChangeEvent } from "react";

import { TextField } from "./textField";
import { FieldProps, useFieldProps } from "../../hooks";

export type TextFieldProps = FieldProps<TextField>;

const getEventValue = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
) => event.target.value;

export const useTextFieldProps = (field: TextField) =>
  useFieldProps<TextField, HTMLInputElement | HTMLTextAreaElement>(
    field,
    getEventValue,
  );
