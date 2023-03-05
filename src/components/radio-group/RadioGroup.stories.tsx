import { ReactNode } from "react";

import { RadioGroup, RadioGroupProps } from "./RadioGroup";
import { FieldLabel } from "..";
import { booleanField, numberField, stringField } from "../../fields";
import { OptionFieldAtom } from "../../hooks";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";
import { FieldErrors } from "../field-errors";

export default {
  ...meta,
  title: "components/RadioGroup",
};

const RadioGroupField = <Option, Field extends OptionFieldAtom>({
  field,
  label,
  getValue,
  getLabel,
  options,
}: { label: ReactNode } & RadioGroupProps<Option, Field>) => (
  <div style={{ margin: "20px 0" }}>
    <FieldLabel field={field} label={label} />
    <RadioGroup
      field={field}
      getLabel={getLabel}
      getValue={getValue}
      options={options}
    />
    <FieldErrors field={field} />
  </div>
);

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
        getLabel={({ answer }) => answer}
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
