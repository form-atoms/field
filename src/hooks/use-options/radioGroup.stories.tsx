import { ReactNode } from "react";

import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { StringFieldAtom, StringFieldValue, stringField } from "../../fields";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";
import { useOptionFieldProps } from "../use-option-field-props/useOptionFieldProps";

import { OptionProps, useOptions } from ".";

export default {
  ...meta,
  title: "hooks/useOptions/radioGroup",
};

const RadioGroup = <Option,>({
  field,
  label,
  getValue,
  getLabel,
  options,
}: { field: StringFieldAtom; label: ReactNode } & OptionProps<
  Option,
  StringFieldValue
>) => {
  const props = useOptionFieldProps(field);

  const { renderOptions } = useOptions({ field, getValue, getLabel, options });

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      {renderOptions.map(({ id, value, label, checked }) => (
        <div key={id}>
          <input
            {...props}
            type="radio"
            id={id}
            value={value}
            checked={checked}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
      <div>
        <FieldErrors field={field} />
      </div>
    </div>
  );
};

const bashAnswers = [
  { answer: "Bash, a Shell", key: "A" },
  { answer: "Bash Ain't Shell", key: "B" },
  { answer: "Bourne Again Shell", key: "C" },
  { answer: "Behold! Another Shell", key: "D" },
];

export const Required: FormStory = {
  args: fixArgs({
    fields: {
      bash: stringField(),
    },
    children: ({ fields }) => (
      <RadioGroup
        field={fields.bash}
        label="Bash stands for ____?"
        options={bashAnswers}
        getValue={({ key }) => key}
        getLabel={({ answer }) => answer}
      />
    ),
  }),
};
