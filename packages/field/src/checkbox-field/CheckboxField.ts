import { FieldAtom, useField } from "form-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, useMemo, useTransition } from "react";
import { LastFieldProps } from "../last-field";

export type CheckboxValue = boolean;

export type CheckboxFieldAtom = FieldAtom<CheckboxValue>;

export type CheckboxFieldProps = LastFieldProps<CheckboxFieldAtom>;

export function useCheckboxFieldProps(fieldAtom: CheckboxFieldAtom) {
  const { actions, state } = useField(fieldAtom);
  const field = useAtomValue(fieldAtom);
  const name = useAtomValue(field.name);
  const validate = useSetAtom(field.validate);
  const ref = useSetAtom(field.ref);
  const [, startTransition] = useTransition();

  return useMemo(
    () => ({
      name,
      checked: state.value,
      "aria-invalid": state.validateStatus === "invalid",
      ref,
      onBlur() {
        actions.setTouched(true);

        startTransition(() => {
          validate("blur");
        });
      },
      onChange(event: ChangeEvent<HTMLInputElement>) {
        actions.setValue(event.target.checked);

        startTransition(() => {
          validate("change");
        });
      },
    }),
    [state, actions, name, ref, validate]
  );
}
