import { InputField } from "form-atoms";
import { z } from "zod";

import { FieldErrors, FieldLabel } from "../../components";
import { numberField } from "../../fields/number-field";
import { NumberInput } from "../../fields/number-field/NumberInput.mock";
import { textField } from "../../fields/text-field";
import { formStory, meta } from "../StoryForm";

export default {
  ...meta,
  title: "scenarios/DependentValidation",
};

const min = numberField({
  name: "min",
  schema: z.number().min(0),
});

const max = numberField({
  name: "max",
  // @ts-expect-error https://github.com/microsoft/TypeScript/issues/54539
  schema: (s, get) => {
    const minVal = get(get(min).value);
    return z.number().min(minVal ?? 0);
  },
});

export const Range = formStory({
  args: {
    fields: {
      min,
      max,
    },
    children: ({ fields }) => (
      <>
        <NumberInput field={fields.min} label="Min" />
        <NumberInput field={fields.max} label="Max" />
      </>
    ),
  },
});

const password = textField({
  name: "password",
  schema: z.string().min(6),
});

// TODO: custom error
const confirmPassword = textField({
  name: "confirmPassword",
  // @ts-expect-error https://github.com/microsoft/TypeScript/issues/54539
  schema: (s, get) => {
    const initialPassword = get(get(password).value);

    return z.literal(initialPassword);
  },
});

export const PasswordValidation = formStory({
  args: {
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
  },
});
