import React from "react";
import { RatingField } from "./RatingField";
import { fieldAtom, formAtom } from "form-atoms";
import { Template } from "../stories";

export default {
  title: "RatingField",
  component: RatingField,
};

const formFields = {
  rating: fieldAtom({
    value: 0,
  }),
};

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom(formFields),
  children: (
    <RatingField field={formFields.rating} label="Rate your experience" />
  ),
};
