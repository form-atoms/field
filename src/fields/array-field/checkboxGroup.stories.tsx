import { stringArrayField } from "./stringArrayField";
import {
  StringArrayFieldProps,
  useArrayFieldProps,
} from "./useArrayFieldProps";
import { FieldErrors } from "../../components/field-errors";
import { useOptions } from "../../hooks";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/arrayField/checkboxGroup",
};

const CheckboxGroup = <Option,>({
  field,
  label,
  getValue,
  getLabel,
  options,
}: StringArrayFieldProps<Option>) => {
  const props = useArrayFieldProps(field);

  const { renderOptions } = useOptions({
    field,
    getValue,
    getLabel,
    options,
    isChecked: (optionValue, fieldValue) => fieldValue.includes(optionValue),
  });

  // when one option is selected, thats enough for the required multiselect to be filled
  const required = props.value.length === 0 ? props.required : false;

  return (
    <div style={{ margin: "20px 0" }}>
      <label>{label}</label>
      {renderOptions.map(({ label, id, value, checked }) => (
        <div key={id}>
          <input
            type="checkbox"
            {...props}
            required={required}
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

const languagesOptions = [
  { name: "Pascal", key: "pascal" },
  { name: "Typescript", key: "ts" },
  { name: "React", key: "react" },
  { name: "English", key: "en" },
  { name: "Holy C", key: "hc" },
  { name: "Tensorflow", key: "tf" },
  { name: "Na'vi", key: "navi" },
];

export const Required: FormStory = {
  args: fixArgs({
    fields: {
      languages: stringArrayField(),
    },
    children: ({ fields }) => (
      <CheckboxGroup
        field={fields.languages}
        label="What programming languages are you proficient with?"
        options={languagesOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  }),
};

export const Optional: FormStory = {
  args: fixArgs({
    fields: {
      attachment: stringArrayField({
        optional: true,
      }),
    },
    children: ({ fields }) => (
      <CheckboxGroup
        field={fields.attachment}
        label="What programming languages are you proficient with?"
        options={languagesOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  }),
};
