import { multiSelectField } from "./multiSelectField";
import { useMultiSelectFieldProps } from "./useMultiSelectFieldProps";
import {
  MultiSelectFieldProps,
  useMultiSelectOptions,
} from "./useMultiSelectOptions";
import { FieldErrors } from "../../components/field-errors";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "multiSelectField",
};

const CheckboxGroup = <Option,>({
  field,
  label,
  getValue,
  getLabel,
  options,
  placeholder,
}: MultiSelectFieldProps<Option>) => {
  const props = useMultiSelectFieldProps(field);

  const { renderOptions } = useMultiSelectOptions(field, {
    getValue,
    getLabel,
    options,
    placeholder,
  });

  // when one option is selected, thats enough for the required multiselect to be filled
  const required = props.value.length === 0 ? props.required : false;

  return (
    <div style={{ margin: "20px 0" }}>
      <label>{label}</label>
      {renderOptions.map(({ value, label, id, isActive }) => (
        <div key={id}>
          <input
            type="checkbox"
            {...props}
            checked={isActive}
            id={id}
            value={value}
            required={required}
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
