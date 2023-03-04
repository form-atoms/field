import { ChangeEvent } from "react";

import { TextFieldAtom } from "./textField";
import { FieldProps, useFieldProps } from "../../hooks";

export type TextFieldProps = FieldProps<TextFieldAtom>;

const getEventValue = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => event.target.value;

export const useTextFieldProps = (field: TextFieldAtom) =>
  useFieldProps<TextFieldAtom, HTMLInputElement | HTMLTextAreaElement>(
    field,
    getEventValue
  );
