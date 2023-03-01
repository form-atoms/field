import { multiSelectField } from "./multiSelectField";
import {
  MultiSelectFieldProps,
  useMultiSelectFieldProps,
} from "./useMultiSelectFieldProps";
import { FieldErrors } from "../../components/field-errors";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";
import { useOptions } from "../select-field";

export default {
  ...meta,
  title: "fields/multiSelectField/checkboxGroup",
};

const CheckboxGroup = <Option,>({
  field,
  label,
  getValue,
  getLabel,
  options,
}: MultiSelectFieldProps<Option>) => {
  const props = useMultiSelectFieldProps(field);

  const { renderOptions } = useOptions(field, {
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
      languages: multiSelectField(),
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
      attachment: multiSelectField({
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
