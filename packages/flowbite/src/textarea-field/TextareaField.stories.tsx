import React from "react";
import { TextareaField } from "./TextareaField";
import { fieldAtom, formAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";

import { Template } from "../stories";

export default {
  title: "TextareaField",
  component: TextareaField,
};

const bio = fieldAtom({
  value: "",
  validate: zodValidate(z.string()),
});

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ bio }),
  children: <TextareaField field={bio} label="Biography" />,
};
