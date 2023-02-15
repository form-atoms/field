import { textField } from "@form-atoms/field";

import { TextField } from "./TextField";
import { FormStory, meta } from "../stories";

export default {
  title: "TextField",
  ...meta,
};

const username = textField();

export const Required: FormStory = {
  args: {
    fields: { username },
    children: ({ required }) => (
      <TextField field={username} label="User Name" required={required} />
    ),
  },
};

const email = textField();

export const Email: FormStory = {
  args: {
    fields: { email },
    children: ({ required }) => (
      <TextField
        field={email}
        required={required}
        label="Email address"
        placeholder="example@email.com"
        helperText={
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
        }
      />
    ),
  },
};
