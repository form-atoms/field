import { SliderField } from "./SliderField";
import { formAtom } from "form-atoms";
import { z } from "zod";
import { Template } from "../stories";
import { numberField } from "@form-atoms/field";

export default {
  title: "SliderField",
  component: SliderField,
};

const rating = numberField({
  schema: z
    .number({ required_error: "Please adjust your confidence" })
    .min(0)
    .max(100),
});

export const Primary = {
  render: Template.bind({}),

  args: {
    form: formAtom({ rating }),
    children: (
      <SliderField min={0} max={100} field={rating} label="Confidence" />
    ),
  },
};
