import { InputField } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";

import { FieldErrors, FieldLabel } from "../../components";
import { textField } from "../../fields/text-field";
import { FormStory, fixArgs, meta } from "../StoryForm";

export default {
  ...meta,
  title: "guides/PasswordValidation",
};

const password = textField({
  name: "password",
  schema: z.string().min(6),
});

const confirmPassword = textField({
  name: "confirmPassword",
  validate: zodValidate(
    (get) => {
      const initialPassword = get(get(password).value);

      console.log("hm");

      return z.literal(initialPassword);
    },
    {
      on: "change",
      formatError: ({ issues }) => {
        return issues.map(({ code, message }) =>
          code === "invalid_literal" ? "Passwords must match" : message
        );
      },
    }
  ),
});

export const Primary: FormStory = {
  args: fixArgs({
    fields: {
      password,
      confirmPassword,
    },
    children: ({ fields }) => (
      <>
        <InputField
          atom={fields.password}
          render={(props) => (
            <>
              <FieldLabel field={fields.password} label="Password" />
              <input {...props} placeholder="Password" />
              <FieldErrors field={fields.password} />
            </>
          )}
        />
        <InputField
          atom={fields.confirmPassword}
          render={(props) => (
            <>
              <FieldLabel
                field={fields.confirmPassword}
                label="Confirm Password"
              />
              <input {...props} placeholder="Confirm password" />
              <FieldErrors field={fields.confirmPassword} />
            </>
          )}
        />
      </>
    ),
  }),
};
