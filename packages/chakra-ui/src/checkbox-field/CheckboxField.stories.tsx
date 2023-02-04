import React from "react";
import { CheckboxField } from "./CheckboxField";
import { fieldAtom, formAtom, useForm } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { StoryForm } from "../stories";

export default {
  title: "CheckboxField",
  component: CheckboxField,
};

// TODO: buggy validation
// const atom = fieldAtom({
//   value: false,
//   validate: zodValidate(z.literal(true)),
// });

const Template = () => <SingleAtomForm />;

export const Primary = Template.bind({});

const form = formAtom({
  termsOfService: fieldAtom({
    value: false,
    validate({ value }) {
      return value ? [] : ["Please accept"];
    },
  }),
});

function SingleAtomForm() {
  const { fieldAtoms, submit } = useForm(form);

  return (
    <StoryForm submit={submit}>
      <CheckboxField field={fieldAtoms.termsOfService}>
        Terms and conditions
      </CheckboxField>
    </StoryForm>
  );
}
