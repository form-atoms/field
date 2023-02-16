import { RenderProp } from "react-render-prop-type";

import { FieldProps, ValidatedFieldAtom } from "../field";
import { useFieldError } from "../field/useFieldError";
import { useSelectFieldProps } from "../select-field";

type ChildrenProps = ReturnType<typeof useSelectFieldProps> & {
  checked: boolean;
  "aria-checked": boolean;
  role: "radio";
  error?: string;
};

export const Radio = <Field extends ValidatedFieldAtom<any>>({
  field,
  value,
  children,
  ...uiProps
}: FieldProps<Field> &
  RenderProp<ChildrenProps> & { value: string; name?: string }) => {
  const props = useSelectFieldProps(field);

  const { error } = useFieldError(field);

  const checked = props.value === value;

  return children({
    ...props,
    id: value,
    value,
    role: "radio",
    error,
    name: uiProps.name ?? props.name,
    checked,
    "aria-checked": checked,
  });
};
