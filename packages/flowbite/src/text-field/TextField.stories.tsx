import { TextField } from "./TextField";
import { z } from "zod";

import { StoryForm, FormStory } from "../stories";
import { textField } from "@form-atoms/field";

export default {
  title: "TextField",
  component: StoryForm,
};

const username = textField({
  schema: z.string().min(4),
});

export const Primary: FormStory = {
  args: {
    fields: { username },
    children: <TextField field={username} label="User Name" />,
  },
};

const email = textField({
  schema: z.string().email(),
});

export const Email: FormStory = {
  args: {
    fields: { email },
    children: (
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
      />
    ),
  },
};
