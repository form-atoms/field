import { numberField } from "@form-atoms/field";
import { formAtom, useForm } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import React from "react";
import { z } from "zod";

import { RangeField } from "./RangeField";
import { StoryForm } from "../stories";

export default {
  title: "RangeField",
  component: RangeField,
};

const form = formAtom({
  rating: numberField({
    validate: zodValidate(z.number().min(0).max(20)),
  }),
});

const Template = () => {
  const { fieldAtoms, submit } = useForm(form);

  return (
    <StoryForm submit={submit}>
      <RangeField
        field={fieldAtoms.rating}
        defaultValue={3}
        min={0}
        max={20}
        label="Rating"
      />
    </StoryForm>
  );
};

export const Default = Template.bind({});
