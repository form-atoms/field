import { useRequiredProps } from "./useRequiredProps";
import { ValidatedFieldAtom } from "./validatedFieldAtom";

type Props<Field extends ValidatedFieldAtom<any>> = {
  field: Field;
  kind?: "icon" | "label";
};

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
