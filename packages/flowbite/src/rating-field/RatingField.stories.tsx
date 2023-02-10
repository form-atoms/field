import { RatingField } from "./RatingField";
import { fieldAtom, formAtom } from "form-atoms";
import { Template } from "../stories";
import { numberField } from "@form-atoms/field";

export default {
  title: "RatingField",
  component: RatingField,
};

const formFields = {
  rating: numberField(),
};

export const Primary = {
  render: Template.bind({}),

  args: {
    form: formAtom(formFields),
    children: (
      <RatingField field={formFields.rating} label="Rate your experience" />
    ),
  },
};
