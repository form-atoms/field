import { ReactNode } from "react";

import { CheckboxGroup } from "./CheckboxGroup";
import { UseCheckboxGroupProps } from "./useCheckboxGroup";
import { stringArrayField } from "../../fields/array-field/stringArrayField";
import { ZodArrayField } from "../../hooks";
import { formStory, meta } from "../../scenarios/StoryForm";
import { FieldErrors } from "../field-errors";
import { FieldLabel } from "../field-label";

export default {
  ...meta,
  title: "components/CheckboxGroup",
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

const CheckboxGroupField = <Option, Field extends ZodArrayField>({
  field,
  label,
  getValue,
  getLabel,
  options,
}: { label: ReactNode } & UseCheckboxGroupProps<Option, Field>) => (
  <div style={{ margin: "20px 0" }}>
    <FieldLabel field={field} label={label} />
    <CheckboxGroup
      field={field}
      getLabel={getLabel}
      getValue={getValue}
      options={options}
    />
    <FieldErrors field={field} />
  </div>
);

export const Required = formStory({
  args: {
    fields: {
      languages: stringArrayField(),
    },
    children: ({ fields }) => (
      <CheckboxGroupField
        field={fields.languages}
        label="What programming languages are you proficient with?"
        options={languagesOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  },
});

export const Optional = formStory({
  args: {
    fields: {
      attachment: stringArrayField().optional(),
    },
    children: ({ fields }) => (
      <CheckboxGroupField
        field={fields.attachment}
        label="What programming languages are you proficient with?"
        options={languagesOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  },
});
