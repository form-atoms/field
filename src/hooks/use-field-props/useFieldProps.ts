import { useField } from "form-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, ReactNode, useMemo, useTransition } from "react";

import { ZodField, ZodFieldValue } from "../../fields/zod-field/zodField";

export type FieldProps<Field extends ZodField<any>> = {
  field: Field;
  label?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
};

export function useFieldProps<
  Field extends ZodField,
  Element extends HTMLElement = HTMLInputElement,
>(
  fieldAtom: Field,
  // support element to be union via distributive conditional types
  getEventValue: Element extends unknown
    ? (
        event: ChangeEvent<Element>,
        value: ZodFieldValue<Field>,
      ) => ZodFieldValue<Field>
    : never,
) {
  const { actions, state } = useField<ZodFieldValue<Field>>(fieldAtom);
  const field = useAtomValue(fieldAtom);
  const name = useAtomValue(field.name);
  const required = useAtomValue(field.required);
  const validationCount = useAtomValue(field._validateCount);
  const validate = useSetAtom(field.validate);
  const ref = useSetAtom(field.ref);
  const [, startTransition] = useTransition();

  const ariaInvalid = state.validateStatus === "invalid";
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
  const requiredAriaInvalid = validationCount > 0 ? ariaInvalid : undefined;

  return useMemo(
    () => ({
      id: `${fieldAtom}`,
      name,
      value: state.value,
      required,
      "aria-required": required,
      "aria-invalid": required ? requiredAriaInvalid : ariaInvalid,
      ref,
      onBlur() {
        actions.setTouched(true);

        startTransition(() => {
          validate("blur");
        });
      },
      onChange(event: ChangeEvent<Element>) {
        const maybeValue = getEventValue(event, state.value);

        actions.setValue(maybeValue);

        startTransition(() => {
          validate("change");
        });
      },
    }),
    [
      state,
      actions,
      name,
      required,
      validationCount,
      getEventValue,
      ref,
      validate,
    ],
  );
}
