import { ReactNode } from "react";
import { object, z } from "zod";

import { MultiSelect, MultiSelectProps } from "./MultiSelect";
import { FieldLabel } from "..";
import { ZodArrayField, arrayField, stringArrayField } from "../../fields";
import { Country, countryOptions } from "../../scenarios/mocks";
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
  <>
    <FieldLabel field={field} label={label} />
    <MultiSelect field={field} {...props} />
    <FieldErrors field={field} />
  </>
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

/**
 * NOTE: the props (initialValue, options, getValue, getLabel) must be stable between renders
 * e.g. created with useCallback or defined outside of the component like here.
 *
 */
const objectProps = {
  initialValue: [countryOptions[1]!],
  options: countryOptions,
  getValue(value: Country) {
    return value;
  },
  getLabel: ({ name, flag }: Country) => (
    <>
      {flag} {name}
    </>
  ),
};

export const WithObjectValue = formStory({
  name: "Custom element schema",
  parameters: {
    docs: {
      description: {
        story:
          "Here the submit value is an object, not a primitive type. The field is based on the `arrayField`.",
      },
    },
  },
  args: {
    fields: {
      countries: arrayField({
        elementSchema: z.object({ key: z.string(), name: z.string() }),
      }),
    },
    children: ({ fields }) => (
      <MultiSelectField
        field={fields.countries}
        label="Visited countries"
        {...objectProps}
      />
    ),
  },
});
