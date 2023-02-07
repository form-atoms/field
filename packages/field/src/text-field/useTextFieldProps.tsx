import { FieldAtom } from "form-atoms";
import { ChangeEvent } from "react";
import { LastFieldProps, useLastFieldProps } from "../last-field";

export type TextFieldAtom = FieldAtom<string>;

export type TextFieldProps = LastFieldProps<TextFieldAtom>;

const getEventValue = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => event.target.value;

export const useTextFieldProps = (field: TextFieldAtom) =>
  useLastFieldProps<string, HTMLInputElement | HTMLTextAreaElement>(
    field,
    getEventValue
  );
