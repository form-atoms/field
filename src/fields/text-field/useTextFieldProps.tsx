import { ChangeEvent } from "react";

import { TextFieldAtom, TextFieldValue } from "./textField";
import { FieldProps, useFieldProps } from "../../hooks";

export type TextFieldProps = FieldProps<TextFieldAtom>;

const getEventValue = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => event.target.value;

export const useTextFieldProps = <F extends TextFieldAtom>(field: F) =>
  useFieldProps<TextFieldValue, HTMLInputElement | HTMLTextAreaElement>(
    field,
    getEventValue
  );
