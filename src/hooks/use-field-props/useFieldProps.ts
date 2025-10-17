import { type ChangeEvent, useMemo, startTransition } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { type UseAtomOptions, useField } from "form-atoms";

import { ZodField, ZodFieldValue } from "../../fields";

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
  options?: UseAtomOptions,
) {
  const { actions, state } = useField<ZodFieldValue<Field>>(fieldAtom, options);
  const field = useAtomValue(fieldAtom, options);
  const name = useAtomValue(field.name, options);
  const required = useAtomValue(field.required, options);
  const validationCount = useAtomValue(field._validateCount, options);
  const validate = useSetAtom(field.validate, options);
  const ref = useSetAtom(field.ref, options);

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
      getEventValue,
      ref,
      validate,
      ariaInvalid,
      fieldAtom,
      requiredAriaInvalid,
    ],
  );
}
