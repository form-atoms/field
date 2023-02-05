import React from "react";
import { RangeField } from "./RangeField";
import { fieldAtom, formAtom, useForm } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { StoryForm } from "../stories";

export default {
  title: "RangeField",
  component: RangeField,
};

const Template = () => <SingleAtomForm />;

export const Primary = Template.bind({});

const formFields = {
  rating: fieldAtom({
    value: 0,
    validate: zodValidate(z.number().min(1).max(20)),
  }),
};

const form = formAtom(formFields);

function SingleAtomForm() {
  const { fieldAtoms, submit } = useForm(form);

  return (
    <StoryForm submit={submit}>
      <RangeField min={1} max={20} field={fieldAtoms.rating} label="Rating" />
    </StoryForm>
  );
}
