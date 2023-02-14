import { FlowbiteStateColors } from "flowbite-react/lib/esm/components/Flowbite/FlowbiteTheme";
import { FieldAtom, useFieldState } from "form-atoms";

export type InputColors = (keyof FlowbiteStateColors)[];

export type FlowbiteStateColor = keyof FlowbiteStateColors;

export const useFieldError = <Value,>(
  field: FieldAtom<Value>,
  colors: InputColors = ["failure"]
) => {
  const { validateStatus, errors, touched } = useFieldState(field);
  const color =
    validateStatus === "invalid"
      ? "failure"
      : validateStatus === "valid"
      ? "success"
      : undefined;

  return {
    color:
      color && touched
        ? colors.includes(color)
          ? (color as FlowbiteStateColor)
          : undefined
        : undefined,
    error: errors[0],
    errors,
  };
};
