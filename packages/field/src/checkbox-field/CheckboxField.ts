import { fieldAtom, FieldAtomConfig } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { CheckboxValue } from "./useCheckboxFieldProps";

type CheckboxConfig = Partial<
  FieldAtomConfig<CheckboxValue> & { required: boolean }
>;

type CheckboxConfigBuilder = (zod: {
  zodValidate: typeof zodValidate;
  z: typeof z;
}) => CheckboxConfig;

export const checkboxField = (
  config: CheckboxConfig | CheckboxConfigBuilder = {}
) => {
  const { required, ...cfg } =
    typeof config === "function" ? config({ zodValidate, z }) : config;

  return fieldAtom({
    value: false,
    validate: required
      ? zodValidate(
          z.literal(true, {
            errorMap: (issue) =>
              issue.code === "invalid_literal"
                ? { message: "This field is required" }
                : { message: "invalid" },
          }),
          { on: "change" }
        )
      : undefined,
    ...cfg,
  });
};
