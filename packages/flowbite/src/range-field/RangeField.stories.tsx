import React from "react";
import { RangeField } from "./RangeField";
import { fieldAtom, formAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { Template } from "../stories";

export default {
  title: "RangeField",
  component: RangeField,
};

const rating = fieldAtom({
  value: 0,
  validate: zodValidate(z.number().min(1).max(20)),
});

export const Primary = {
  render: Template.bind({}),

  args: {
    form: formAtom({ rating }),
    children: <RangeField min={1} max={20} field={rating} label="Rating" />,
  },
};
