import React from "react";
import { TextField } from "./TextField";
import { formAtom } from "form-atoms";
import {
  password,
  passwordInitial,
} from "@react-last-field/field/dist/scenarios/password";
import { Template } from "../stories";

export default {
  title: "TextField",
  component: TextField,
};

export const Password = Template.bind({});
Password.args = {
  form: formAtom({ password }),
  children: (
    <>
      <TextField
        type="password"
        field={passwordInitial}
        label="New password"
        helperText="Your password must be at least 6 characters long"
      />
      <TextField type="password" field={password} label="Confirm password" />
    </>
  ),
};
