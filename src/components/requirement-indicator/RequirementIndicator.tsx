import { useAtomValue } from "jotai";

import { ZodField } from "../../fields/zod-field/zodField";

export type Props<Field extends ZodField<any>> = {
  field: Field;
  kind?: "icon" | "label";
};

/**
 * Indicates field's required state by using the useRequiredProps() hook.
 */
export const RequirementIndicator = <Field extends ZodField<any>>({
  kind = "icon",
  field,
}: Props<Field>) => {
  const atom = useAtomValue(field);
  const isFieldRequired = useAtomValue(atom.required);

  const requiredIndicator = kind === "icon" ? "*" : "(required)"; // TODO: i18n
  const opitonalIndicator = kind === "icon" ? "" : "(optional)";

  return (
    <span aria-hidden="true">
      {isFieldRequired ? requiredIndicator : opitonalIndicator}
    </span>
  );
};
