import { textField } from "@form-atoms/field";
import { z } from "zod";

import { TextField } from "./TextField";
import { FormStory, meta } from "../stories";

export default {
  title: "TextField",
  ...meta,
};

const username = textField({
  schema: z.string().min(4),
});

export const Primary: FormStory = {
  args: {
    fields: { username },
    children: (args) => (
      <TextField field={username} label="User Name" {...args} />
    ),
  },
};

const email = textField({
  schema: z.string().email(),
});

export const Email: FormStory = {
  args: {
    fields: { email },
    children: (args) => (
      <TextField
        field={email}
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
        {...args}
      />
    ),
  },
};
