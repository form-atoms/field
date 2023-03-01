import { ReactNode } from "react";

import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import {
  SelectFieldAtom,
  selectField,
} from "../../fields/select-field/selectField";
import { useSelectFieldProps } from "../../fields/select-field/useSelectFieldProps";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

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
}: { field: SelectFieldAtom; label: ReactNode } & OptionProps<Option>) => {
  const props = useSelectFieldProps(field);

  const { renderOptions } = useOptions(field, {
    getValue,
    getLabel,
    options,
  });

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
      bash: selectField(),
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
