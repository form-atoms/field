import React, { useCallback } from "react";
import { RangeField } from "./RangeField";
import { fieldAtom, formAtom, useForm } from "form-atoms";
import { StoryForm } from "../stories";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { NumberFieldAtom } from "@react-last-field/field/src";

export default {
  title: "RangeField",
  component: RangeField,
};

const form = formAtom({
  rating: fieldAtom({
    value: undefined,
    validate: zodValidate(z.number().min(0).max(20)),
  }) as NumberFieldAtom, // TODO: Improve typing
});

const Template = () => {
  const { fieldAtoms, submit } = useForm(form);

  return (
    <StoryForm submit={submit}>
      <RangeField
        field={fieldAtoms.rating}
        defaultValue={3} // TODO: Field atom value should be set to defaultValue when defined
        min={0}
        max={20}
        label="Rating"
      />
    </StoryForm>
  );
};

export const Default = Template.bind({});
