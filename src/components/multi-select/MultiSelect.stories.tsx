import { ReactNode } from "react";

import { MultiSelect, MultiSelectProps } from "./MultiSelect";
import { FieldLabel } from "..";
import { ZodArrayField, stringArrayField } from "../../fields";
import { countryOptions } from "../../scenarios/mocks";
import { formStory, meta } from "../../scenarios/StoryForm";
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

export const RequiredArrayString = formStory({
  name: "Required Array<string>",
  args: {
    fields: {
      visitedCountries: stringArrayField(),
    },
    children: ({ fields }) => (
      <MultiSelectField
        field={fields.visitedCountries}
        label="Visited countries"
        options={countryOptions}
        getValue={({ key }) => key}
        getLabel={({ name, flag }) => (
          <>
            {flag} {name}
          </>
        )}
      />
    ),
  },
});

export const Initialized = formStory({
  name: "Initialized Required Array<string>",
  args: {
    fields: {
      visitedCountries: stringArrayField(),
    },
    children: ({ fields }) => (
      <MultiSelectField
        initialValue={["CZ", "SK"]}
        field={fields.visitedCountries}
        label="Visited countries"
        options={countryOptions}
        getValue={({ key }) => key}
        getLabel={({ name, flag }) => (
          <>
            {flag} {name}
          </>
        )}
      />
    ),
  },
});
