import { useFieldErrors } from "form-atoms";
import type { FieldAtom } from "form-atoms";
import { RenderProp } from "react-render-prop-type";

type ChildrenProp = RenderProp<{ errors: ReturnType<typeof useFieldErrors> }>;

export type FieldErrorsProps = {
  field: FieldAtom<any>;
} & Partial<ChildrenProp>;

export const FieldErrors = ({
  field,
  children = ({ errors }) => <>{errors.join("\n")}</>,
}: FieldErrorsProps) => children({ errors: useFieldErrors(field) });
