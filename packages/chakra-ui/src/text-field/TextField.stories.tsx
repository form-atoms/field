import React from "react";
import { TextField } from "./TextField";
import { fieldAtom, formAtom, useForm } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { StoryForm } from "../stories";

export default {
  title: "TextField",
  component: TextField,
};

const formFields = {
  username: fieldAtom({
    value: "",
    validate: zodValidate(z.string().min(4), { on: "change" }),
  }),
  email: fieldAtom({
    value: "",
    validate: zodValidate(z.string().email(), { on: "change" }),
  }),
};

const form = formAtom(formFields);

const Template = (args: any[]) => {
  const { fieldAtoms, submit } = useForm(form);

  return (
    <StoryForm submit={submit}>
      <TextField field={fieldAtoms.username} label="User Name" {...args} />
    </StoryForm>
  );
};

export const Primary = Template.bind({});

export const Email = Template.bind({});
Email.args = {
  field: formFields.email,
  label: "Email Address",
  placeholder: "my@email.com",
  helperText: (
    <>
      We’ll never share your details. Read our{" "}
      <a
        href="/forms"
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
      >
        Privacy Policy
      </a>
      .
    </>
  ),
};
