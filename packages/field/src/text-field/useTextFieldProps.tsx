import { ChangeEvent } from "react";
import { FieldProps, useFieldProps } from "../field";
import { TextFieldAtom, TextValue } from "./textField";

export type TextFieldProps = FieldProps<TextFieldAtom>;

const getEventValue = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => event.target.value;

export const useTextFieldProps = <F extends TextFieldAtom>(field: F) =>
  useFieldProps<TextValue, HTMLInputElement | HTMLTextAreaElement>(
    field,
    getEventValue
  );
