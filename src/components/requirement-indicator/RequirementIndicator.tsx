import { ValidatedFieldAtom } from "../../fields/validatedFieldAtom";
import { useRequiredProps } from "../../hooks/use-required-props";

export type Props<Field extends ValidatedFieldAtom<any>> = {
  field: Field;
  kind?: "icon" | "label";
};

/**
 * Indicates field's required state by using the useRequiredProps() hook.
 */
export const RequirementIndicator = <Field extends ValidatedFieldAtom<any>>({
  kind = "icon",
  field,
}: Props<Field>) => {
  const { isFieldRequired } = useRequiredProps(field);

  const requiredIndicator = kind === "icon" ? "*" : "(required)"; // TODO: i18n
  const opitonalIndicator = kind === "icon" ? "" : "(optional)";

  return (
    <span aria-hidden="true">
      {isFieldRequired ? requiredIndicator : opitonalIndicator}
    </span>
  );
};