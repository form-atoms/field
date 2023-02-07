import { FieldAtom, useField } from "form-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, ReactNode, useMemo, useTransition } from "react";

export type LastFieldProps<Field extends FieldAtom<any>> = {
  field: Field;
  label?: ReactNode;
  helperText?: ReactNode;
};

export function useLastFieldProps<Value>(
  fieldAtom: FieldAtom<Value>,
  getEventValue: (event: ChangeEvent<HTMLInputElement>) => Value | undefined
) {
  const { actions, state } = useField(fieldAtom);
  const field = useAtomValue(fieldAtom);
  const name = useAtomValue(field.name);
  const validate = useSetAtom(field.validate);
  const ref = useSetAtom(field.ref);
  const [, startTransition] = useTransition();

  return useMemo(
    () => ({
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
      onChange(event: ChangeEvent<HTMLInputElement>) {
        const maybeValue = getEventValue(event);

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
