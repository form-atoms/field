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

const Template = () => <SingleAtomForm />;

export const Primary = Template.bind({});

const form = formAtom({
  termsOfService: fieldAtom({
    name: "tos",
    value: false,
    validate: zodValidate(z.literal(true), { on: "change" }),
  }),
});

function SingleAtomForm() {
  const { fieldAtoms, submit } = useForm(form);

  return (
    <StoryForm submit={submit}>
      <CheckboxField
        field={fieldAtoms.termsOfService}
        helperText="Better read those"
        label="Terms of Service"
      />
    </StoryForm>
  );
}
