import { StoryObj } from "@storybook/react";
import { z } from "zod";

import { RadioGroup, RadioGroupProps } from "./RadioGroup";
import { RadioGroupField } from "./RadioGroupField.mock";
import {
  booleanField,
  numberField,
  stringArrayField,
  stringField,
  zodField,
} from "../../fields";
import { SelectField } from "../../hooks";
import { StoryForm } from "../../scenarios/StoryForm";

const meta = {
  component: RadioGroup,
  title: "components/RadioGroup",
};

export default meta;

const radioGroupStory = <Option, Field extends SelectField>(
  storyObj: {
    args: Pick<RadioGroupProps<Option, Field>, "field"> &
      Omit<Partial<RadioGroupProps<Option, Field>>, "field">;
  } & Omit<StoryObj<typeof meta>, "args">,
) => ({
  ...storyObj,
  decorators: [
    (Story: () => JSX.Element) => (
      <StoryForm fields={{ field: storyObj.args.field }}>
        {() => (
          <p>
            <Story />
          </p>
        )}
      </StoryForm>
    ),
  ],
});

const bashAnswers = [
  { answer: "Bash, a Shell", key: "A" },
  { answer: "Bash Ain't Shell", key: "B" },
  { answer: "Bourne Again Shell", key: "C" },
  { answer: "Behold! Another Shell", key: "D" },
];

export const RequiredString = radioGroupStory({
  parameters: {
    docs: {
      description: {
        story: "With `stringField()`, the submit value is `string`.",
      },
    },
  },
  args: {
    field: stringField(),
    options: bashAnswers,
    getValue: ({ key }) => key,
    getLabel: ({ key, answer }) => (
      <>
        <strong>({key})</strong> {answer}
      </>
    ),
  },
});

const ratingOptions = [5, 4, 3, 2, 1];

export const RequiredNumber = radioGroupStory({
  parameters: {
    docs: {
      description: {
        story: "With `numberField()`, the submit value is `number`.",
      },
    },
  },
  args: {
    field: numberField(),
    options: ratingOptions,
    getValue: (value) => value,
    getLabel: (value) => Array(value + 1).join("⭐"),
    // label="How do you like the RadioGroup component?"
  },
});

const approvalOptions = [
  { label: "I approve this message", key: true },
  { label: "I have some comments", key: false },
];

export const RequiredBoolean = radioGroupStory({
  parameters: {
    docs: {
      description: {
        story: "With `booleanField()`, the submit value is `boolean`.",
      },
    },
  },
  args: {
    field: booleanField(),
    options: approvalOptions,
    getValue: ({ key }) => key,
    getLabel: ({ label }) => label,
    // label="Do you approve this message?"
  },
});

const namePairs = [
  ["Marta", "Peter"],
  ["Andrea", "Kristine"],
  ["Lincoln", "Tugg"],
  ["Lambda", "Xavier"],
];

export const RequiredArrayString = radioGroupStory({
  name: "Required Array<string>",
  parameters: {
    docs: {
      description: {
        story:
          "To capture non-primitive value of type `string[]`, you can use the `stringArrayField()` field.",
      },
    },
  },
  args: {
    field: stringArrayField(),
    options: namePairs,
    getValue: (pair) => pair,
    getLabel: (pair) => pair.join(" and "),
    // label="Which name pair you like the most?"
  },
});

const addresses = [
  { street: "Kosicka", city: "Bratislava" },
  { street: "Hlavna", city: "Kosice" },
];

export const RequiredCustomAddress = radioGroupStory({
  name: "Required custom type (Address)",
  parameters: {
    docs: {
      description: {
        story:
          "For an entity type, here `type Address = {street: string, city: string}`, pass a custom schema `const addressSchema = z.object({street: z.string(), city: z.string()})` as  `zodField({schema: addressSchema})`",
      },
    },
  },
  args: {
    field: zodField({
      value: undefined,
      schema: z.object(
        { street: z.string(), city: z.string() },
        { required_error: "Please choose shipping address." },
      ),
    }),
    options: addresses,
    getValue: (addr) => addr,
    getLabel: ({ street, city }) => `${street}, ${city}`,
    // label="Pick a shipping address"
  },
});

export const ComposedField = radioGroupStory({
  parameters: {
    docs: {
      description: {
        story:
          "In practice, you will want to display the `RadioGroup` together with the `FieldErrors`, `FieldLabel` or `RequirementIndicator` in a custom UI & layout. Here is an example for a `RadioGroupField`:",
      },
    },
  },
  args: { ...RequiredString.args, field: stringField() },
  render: (props) => {
    return <RadioGroupField {...props} label="Bash stands for ____?" />;
  },
});
