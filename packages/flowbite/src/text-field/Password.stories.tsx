import {
  password,
  passwordInitial,
} from "@form-atoms/field/dist/scenarios/password";

import { TextField } from "./TextField";
import { FormStory, StoryForm } from "../stories";

export default {
  title: "TextField",
  component: StoryForm,
};

export const Password: FormStory = {
  args: {
    fields: { password, passwordInitial },
    children: () => (
      <>
        <TextField
          type="password"
          field={passwordInitial}
          label="New password"
          helperText="Your password must be at least 6 characters long"
        />
        <TextField
          type="password"
          field={password}
          label="Confirm password"
          colors={["success", "failure"]}
        />
      </>
    ),
  },
};
