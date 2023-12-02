import { ChangeEvent } from "react";

import { FieldProps, useFieldProps } from "../";
import { type TextField } from "../../fields";

export type TextFieldProps = FieldProps<TextField>;

const getEventValue = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
) => event.target.value;

export const useTextFieldProps = (field: TextField) =>
  useFieldProps<TextField, HTMLInputElement | HTMLTextAreaElement>(
    field,
    getEventValue,
  );
