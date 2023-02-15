import {
  password,
  passwordInitial,
} from "@form-atoms/field/dist/scenarios/password";
import React from "react";

import { TextField } from "./TextField";
import { FormStory, meta } from "../stories";

export default {
  title: "TextField",
  ...meta,
};

export const Password: FormStory = {
  args: {
    fields: { password, passwordInitial },
    children: ({ required }) => (
      <>
        <TextField
          type="password"
          required={required}
          field={passwordInitial}
          label="New password"
          helperText="Your password must be at least 6 characters long"
        />
        <TextField
          type="password"
          required={required}
          field={password}
          label="Confirm password"
        />
      </>
    ),
  },
};
