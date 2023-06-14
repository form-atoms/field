import { z } from "zod";

import { SelectField } from "./SelectField.mock";
import { booleanField, numberField, stringField, zodField } from "../../fields";
import { countryOptions } from "../../scenarios/mocks";
import { formStory, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "components/Select",
};

export const RequiredString = formStory({
  args: {
    fields: {
      country: stringField(),
    },
    children: ({ fields }) => (
      <SelectField
        field={fields.country}
        label="Country of Origin"
        options={countryOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  },
});

export const OptionalString = formStory({
  args: {
    fields: {
      country: stringField().optional(),
    },
    children: ({ fields }) => (
      <SelectField
        field={fields.country}
        label="Country of Origin"
        options={countryOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  },
});

const ratingOptions = [5, 4, 3, 2, 1];

export const RequiredNumber = formStory({
  args: {
    fields: {
      rating: numberField(),
    },
    children: ({ fields }) => (
      <SelectField
        field={fields.rating}
        label="How do you rate this docs?"
        options={ratingOptions}
        getValue={(value) => value}
        getLabel={(value) => Array(value + 1).join("🌟")}
      />
    ),
  },
});

const approvalOptions = [
  { label: "I approve this message", key: true },
  { label: "I have some comments", key: false },
];

export const RequiredBoolean = formStory({
  args: {
    fields: {
      approved: booleanField(),
    },
    children: ({ fields }) => (
      <SelectField
        field={fields.approved}
        label="Do you approve this message?"
        options={approvalOptions}
        getValue={({ key }) => key}
        getLabel={({ label }) => label}
      />
    ),
  },
});

const customers = [
  { name: "Github", city: "San Francisco" },
  { name: "Microsoft", city: "Seattle" },
  { name: "basic IT", city: "Bratislava" },
];

export const RequiredCustomer = formStory({
  name: "Required custom type (Customer)",
  parameters: {
    docs: {
      description: {
        story:
          "For custom type, here `{name: string, city: string}`, pass a custom zodField",
      },
    },
  },
  args: {
    fields: {
      names: zodField({
        value: undefined,
        schema: z.object(
          { name: z.string(), city: z.string() },
          { required_error: "Please select a customer." }
        ),
      }),
    },
    children: ({ fields }) => (
      <SelectField
        field={fields.names}
        label="Pick a customer"
        options={customers}
        getValue={(addr) => addr}
        getLabel={({ name, city }) => `${name} in ${city}`}
      />
    ),
  },
});
