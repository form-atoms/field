import { fieldAtom, formAtom, useForm } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import React from "react";
import { z } from "zod";

import { NumberField } from "./NumberField";
import { StoryForm } from "../stories";

export default {
  title: "NumberField",
  component: NumberField,
};

const Template = () => <SingleAtomForm />;

export const Primary = Template.bind({});

const formFields = {
  quantity: fieldAtom({
    value: 0,
    validate: zodValidate(z.number().min(1).max(5), { on: "change" }),
  }),
};

const form = formAtom(formFields);

function SingleAtomForm() {
  const { fieldAtoms, submit } = useForm(form);

  return (
    <StoryForm submit={submit}>
      <NumberField field={fieldAtoms.quantity} label="Qty." />
    </StoryForm>
  );
}
