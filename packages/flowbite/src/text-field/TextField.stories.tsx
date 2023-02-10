import { TextField } from "./TextField";
import { fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";

import { StoryForm, FormStory } from "../stories";

export default {
  title: "TextField",
  component: StoryForm,
};

const username = fieldAtom({
  value: "",
  validate: zodValidate(z.string().min(4), { on: "change" }),
});

export const Primary: FormStory = {
  args: {
    fields: { username },
    children: <TextField field={username} label="User Name" />,
  },
};

const email = fieldAtom({
  value: "",
  validate: zodValidate(z.string().email(), { on: "change" }),
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
