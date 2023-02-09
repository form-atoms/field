import { FieldAtom, useField } from "form-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, ReactNode, useId, useMemo, useTransition } from "react";

export type LastFieldProps<Field extends FieldAtom<any>> = {
  field: Field;
  label?: ReactNode;
  helperText?: ReactNode;
};

export function useLastFieldProps<
  Value,
  Element extends HTMLElement = HTMLInputElement
>(
  fieldAtom: FieldAtom<Value>,
  // support element to be union via distributive conditional types
  getEventValue: Element extends unknown
    ? (event: ChangeEvent<Element>, value: Value) => Value | undefined
    : never
) {
  const { actions, state } = useField(fieldAtom);
  const field = useAtomValue(fieldAtom);
  const name = useAtomValue(field.name);
  const validate = useSetAtom(field.validate);
  const ref = useSetAtom(field.ref);
  const [, startTransition] = useTransition();
  const id = useId();

  return useMemo(
    () => ({
      id,
      name,
      value: state.value,
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

        if (maybeValue !== undefined) {
          actions.setValue(maybeValue);
        }

        startTransition(() => {
          validate("change");
        });
      },
    }),
    [state, actions, name, ref, validate]
  );
}
