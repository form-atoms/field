import { useField } from "form-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, ReactNode, useMemo, useTransition } from "react";

import { ZodField, ZodFieldValue } from "../../fields/zodField";

export type FieldProps<Field extends ZodField<any>> = {
  field: Field;
  label?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
};

export function useFieldProps<
  Field extends ZodField<any>,
  Element extends HTMLElement = HTMLInputElement,
  Empty extends string | undefined = undefined
>(
  fieldAtom: Field,
  // support element to be union via distributive conditional types
  getEventValue: Element extends unknown
    ? (
        event: ChangeEvent<Element>,
        value: ZodFieldValue<Field>
      ) => ZodFieldValue<Field>
    : never,
  empty?: Empty
) {
  const { actions, state } = useField<ZodFieldValue<Field>>(fieldAtom);
  const field = useAtomValue(fieldAtom);
  const name = useAtomValue(field.name);
  const required = useAtomValue(field.required);
  const validate = useSetAtom(field.validate);
  const ref = useSetAtom(field.ref);
  const [, startTransition] = useTransition();

  return useMemo(
    () => ({
      id: `${fieldAtom}`,
      name,
      value: state.value ?? empty,
      required,
      "aria-required": required,
      "aria-invalid": state.validateStatus === "invalid",
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
    [state, actions, name, required, getEventValue, ref, validate]
  );
}
