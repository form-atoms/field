import { booleanField } from "./booleanField";
import { RadioGroupField } from "../../components/radio-group/RadioGroupField.mock";
import { formStory, meta } from "../../scenarios/StoryForm";
import { CheckboxInput } from "../checkbox-field/CheckboxInput.mock";

export default {
  ...meta,
  title: "fields/booleanField",
};

const funeralTermsOptions = [
  {
    label: "Yes, I accept the Funeral terms.",
    value: true,
  },
  {
    label: "No, I don't accept the Funeral terms.",
    value: false,
  },
];

export const Required = formStory({
  args: {
    fields: {
      funeralTerms: booleanField({ name: "funeralTerms" }),
    },
    children: ({ fields }) => (
      <RadioGroupField
        field={fields.funeralTerms}
        label="Do you accept the Funeral terms?"
        options={funeralTermsOptions}
        getLabel={({ label }) => label}
        getValue={({ value }) => value}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Required _booleanField_ requires explicit `true` or `false` value. It starts with `undefined` unlike _checkoxField_ (which starts with `false`) so we know that the user interacted with the field.",
      },
    },
  },
});

const surveyOptions = [
  { label: "I like this experience", key: true },
  { label: "I don't like this", key: false },
];

export const Optional = formStory({
  args: {
    fields: {
      approved: booleanField().optional(),
    },
    children: ({ fields }) => (
      <RadioGroupField
        field={fields.approved}
        label="Survey"
        options={surveyOptions}
        getValue={({ key }) => key}
        getLabel={({ label }) => label}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Optional _booleanField_ can be submitted with the initial `undefined` value which indicates that the user didn't care to interact with the field.",
      },
    },
  },
});

export const OptionalCheckbox = formStory({
  args: {
    fields: {
      approved: booleanField().optional(),
    },
    children: ({ fields }) => (
      <CheckboxInput
        field={fields.approved}
        label="I preffer the digital form to the paper one"
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Optional _booleanField_ can be submitted with the initial `undefined` value which indicates that the user didn't care to interact with the field.",
      },
    },
  },
});
