import { FieldAtom, useInputField } from "form-atoms";
import { ChangeEvent, useMemo, useTransition } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { LastFieldProps } from "../last-field";

export type NumberFieldAtom = FieldAtom<number>;

export type NumberFieldProps = LastFieldProps<NumberFieldAtom>;

export function useNumberField(field: NumberFieldAtom) {
  const atom = useAtomValue(field);
  const { props, actions, state } = useInputField(field);
  const [, startTransition] = useTransition();
  const validate = useSetAtom(atom.validate);

  return useMemo(
    () => ({
      ...state,
      ...props,
      onChange(event: ChangeEvent<HTMLInputElement>) {
        // TODO: prevent exponent
        // TODO: prevent leading zeroes
        actions.setValue(parseFloat(event.target.value));

        startTransition(() => {
          validate("change");
        });
      },
    }),
    [state, actions]
  );
}
