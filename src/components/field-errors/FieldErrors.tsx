import { type FieldAtom, useFieldErrors } from "form-atoms";

export type FieldErrorsProps<Value> = {
  field: FieldAtom<Value>;
  children?: (props: {
    errors: ReturnType<typeof useFieldErrors>;
  }) => React.ReactElement;
};

export function FieldErrors<Value>({
  field,
  children = ({ errors }) => <>{errors.join("\n")}</>,
}: FieldErrorsProps<Value>) {
  return children({ errors: useFieldErrors(field) });
}
