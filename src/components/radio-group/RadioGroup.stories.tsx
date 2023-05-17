import { z } from "zod";

import { RadioGroupField } from "./RadioGroupField";
import {
  booleanField,
  numberField,
  stringArrayField,
  stringField,
  zodField,
} from "../../fields";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "components/RadioGroup",
};

const bashAnswers = [
  { answer: "Bash, a Shell", key: "A" },
  { answer: "Bash Ain't Shell", key: "B" },
  { answer: "Bourne Again Shell", key: "C" },
  { answer: "Behold! Another Shell", key: "D" },
];

export const RequiredString: FormStory = {
  args: fixArgs({
    fields: {
      bash: stringField(),
    },
    children: ({ fields }) => (
      <RadioGroupField
        field={fields.bash}
        label="Bash stands for ____?"
        options={bashAnswers}
        getValue={({ key }) => key}
        getLabel={({ key, answer }) => (
          <>
            <strong>({key})</strong> {answer}
          </>
        )}
      />
    ),
  }),
};

const ratingOptions = [5, 4, 3, 2, 1];

export const RequiredNumber: FormStory = {
  args: fixArgs({
    fields: {
      rating: numberField(),
    },
    children: ({ fields }) => (
      <RadioGroupField
        field={fields.rating}
        label="How do you like the RadioGroup component?"
        options={ratingOptions}
        getValue={(value) => value}
        getLabel={(value) => Array(value + 1).join("⭐")}
      />
    ),
  }),
};

const approvalOptions = [
  { label: "I approve this message", key: true },
  { label: "I have some comments", key: false },
];

export const RequiredBoolean: FormStory = {
  args: fixArgs({
    fields: {
      approved: booleanField(),
    },
    children: ({ fields }) => (
      <RadioGroupField
        field={fields.approved}
        label="Do you approve this message?"
        options={approvalOptions}
        getValue={({ key }) => key}
        getLabel={({ label }) => label}
      />
    ),
  }),
};

const namePairs = [
  ["Marta", "Peter"],
  ["Andrea", "Kristine"],
  ["Lincoln", "Tugg"],
  ["Lambda", "Xavier"],
];

export const RequiredArrayString: FormStory = {
  name: "Required Array<string>",
  parameters: {
    docs: {
      description: {
        story:
          "To capture non-primitive value of type `string[]`, you can use the `stringArrayField()` field.",
      },
    },
  },
  args: fixArgs({
    fields: {
      names: stringArrayField(),
    },
    children: ({ fields }) => (
      <RadioGroupField
        field={fields.names}
        label="Which name pair you like the most?"
        options={namePairs}
        getValue={(pair) => pair}
        getLabel={(pair) => pair.join(" and ")}
      />
    ),
  }),
};

const addresses = [
  { street: "Kosicka", city: "Bratislava" },
  { street: "Hlavna", city: "Kosice" },
];

export const RequiredCustomAddress: FormStory = {
  name: "Required custom type (Address)",
  parameters: {
    docs: {
      description: {
        story:
          "For custom type, here `{street: string, city: string}`, pass a custom zodField",
      },
    },
  },
  args: fixArgs({
    fields: {
      names: zodField({
        value: undefined,
        schema: z.object(
          { street: z.string(), city: z.string() },
          { required_error: "Please choose shipping address." }
        ),
      }),
    },
    children: ({ fields }) => (
      <RadioGroupField
        field={fields.names}
        label="Pick a shipping address"
        options={addresses}
        getValue={(addr) => addr}
        getLabel={({ street, city }) => `${street}, ${city}`}
      />
    ),
  }),
};
