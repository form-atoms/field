import { FieldAtom, FormAtom, FormFields, useFormActions } from "form-atoms";
import { del, push } from "object-path-immutable";
import { useCallback } from "react";

export const useArrayFieldActions = <
  Fields extends FormFields,
  Item extends FieldAtom<any> | FormFields
>(
  form: FormAtom<Fields>,
  builder: () => Item,
  path: (string | number)[]
) => {
  const { updateFields } = useFormActions(form);

  const remove = useCallback(
    (index: number) => {
      return updateFields((current) => {
        return del(current, [...path, index]);
      });
    },
    [form]
  );

  const add = useCallback(() => {
    updateFields((current) => {
      return push(current, path, builder());
    });
  }, [form]);

  return { remove, add };
};
