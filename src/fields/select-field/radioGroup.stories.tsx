import { selectField } from "./selectField";
import { useSelectFieldProps } from "./useSelectFieldProps";
import { SelectFieldProps, useSelectOptions } from "./useSelectOptions";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/selectField/radioGroup",
};

const RadioGroup = <Option,>({
  field,
  label,
  getValue,
  getLabel,
  options,
  placeholder,
}: SelectFieldProps<Option>) => {
  const props = useSelectFieldProps(field);

  const { renderOptions } = useSelectOptions(field, {
    getValue,
    getLabel,
    options,
    placeholder,
  });

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      {renderOptions.map(({ id, value, label, isActive }) => (
        <div key={id}>
          <input
            {...props}
            type="radio"
            id={id}
            value={value}
            checked={isActive}
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
