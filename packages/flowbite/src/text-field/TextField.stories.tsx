import { textField } from "@form-atoms/field";
import { z } from "zod";

import { TextField } from "./TextField";
import { FormStory, meta, optionalField } from "../stories";

export default {
  title: "TextField",
  ...meta,
};

const username = textField({
  schema: z.string().min(4),
});

export const Required: FormStory = {
  args: {
    fields: { username },
    children: ({ required }) => (
      <TextField field={username} label="User Name" required={required} />
    ),
  },
};

const nickname = textField({
  optional: true,
  schema: z.string().min(4),
});

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { nickname },
    children: () => <TextField field={nickname} label="Nick Name" />,
  },
};

const email = textField({
  schema: z.string().email(),
});

export const Email: FormStory = {
  args: {
    fields: { email },
    children: ({ required }) => (
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
        required={required}
      />
    ),
  },
};
