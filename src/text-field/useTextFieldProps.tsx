import { ChangeEvent } from "react";

import { TextFieldAtom, TextValue } from "./textField";
import { FieldProps, useFieldProps } from "../field";

export type TextFieldProps = FieldProps<TextFieldAtom>;

const getEventValue = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => event.target.value;

export const useTextFieldProps = <F extends TextFieldAtom>(field: F) =>
  useFieldProps<TextValue, HTMLInputElement | HTMLTextAreaElement>(
    field,
    getEventValue
  );
