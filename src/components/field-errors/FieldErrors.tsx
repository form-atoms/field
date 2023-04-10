import { useFieldErrors } from "form-atoms";
import type { FieldAtom } from "form-atoms";
import { RenderProp } from "react-render-prop-type";

type Props = RenderProp<{ errors: ReturnType<typeof useFieldErrors> }>;

export const FieldErrors = ({
  field,
  children = ({ errors }) => <>{errors.join("\n")}</>,
}: {
  field: FieldAtom<any>;
} & Partial<Props>) => children({ errors: useFieldErrors(field) });
