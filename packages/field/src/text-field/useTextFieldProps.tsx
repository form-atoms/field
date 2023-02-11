import { ChangeEvent } from "react";
import { LastFieldProps, useLastFieldProps } from "../last-field";
import { TextFieldAtom, TextValue } from "./textField";

export type TextFieldProps = LastFieldProps<TextFieldAtom>;

const getEventValue = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => event.target.value;

export const useTextFieldProps = <F extends TextFieldAtom>(field: F) =>
  useLastFieldProps<TextValue, HTMLInputElement | HTMLTextAreaElement>(
    field,
    getEventValue
  );
