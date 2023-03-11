import { ReactNode } from "react";

import { MultiSelect, MultiSelectProps } from "./MultiSelect";
import { FieldLabel } from "..";
import { stringArrayField } from "../../fields";
import { ZodArrayField } from "../../hooks";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";
import { FieldErrors } from "../field-errors";

export default {
  ...meta,
  title: "components/MultiSelect",
};

const MultiSelectField = <Option, Field extends ZodArrayField>({
  field,
  label,
  ...props
}: {
  label: ReactNode;
} & MultiSelectProps<Option, Field>) => (
  <div style={{ margin: "20px 0" }}>
    <FieldLabel field={field} label={label} />
    <MultiSelect field={field} {...props} />
    <FieldErrors field={field} />
  </div>
);

const countryOptions = [
  { name: "Slovak Republic", key: "SK" },
  { name: "Czech Republic", key: "CZ" },
  { name: "Poland", key: "PL" },
  { name: "Hungary", key: "HU" },
];

export const RequiredArrayString: FormStory = {
  name: "Required Array<string>",
  args: fixArgs({
    fields: {
      visitedCountries: stringArrayField(),
    },
    children: ({ fields }) => (
      <MultiSelectField
        field={fields.visitedCountries}
        label="Visited countried"
        options={countryOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  }),
};
