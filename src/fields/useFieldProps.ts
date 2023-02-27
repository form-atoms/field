import { useField } from "form-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, ReactNode, useId, useMemo, useTransition } from "react";

import { ValidatedFieldAtom } from "./validatedFieldAtom";

export type FieldProps<Field extends ValidatedFieldAtom<any>> = {
  field: Field;
  label?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
};

export function useFieldProps<
  Value,
  Element extends HTMLElement = HTMLInputElement
>(
  fieldAtom: ValidatedFieldAtom<Value>,
  // support element to be union via distributive conditional types
  getEventValue: Element extends unknown
    ? (event: ChangeEvent<Element>, value: Value) => Value
    : never
) {
  const { actions, state } = useField(fieldAtom);
  const field = useAtomValue(fieldAtom);
  const name = useAtomValue(field.name);
  const required = useAtomValue(field.required);
  const validate = useSetAtom(field.validate);
  const ref = useSetAtom(field.ref);
  const [, startTransition] = useTransition();
  const id = useId();

  return useMemo(
    () => ({
      id,
      name,
      value: state.value,
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
    [state, actions, name, required, ref, validate]
  );
}
