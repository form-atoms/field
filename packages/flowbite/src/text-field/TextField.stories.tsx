import React, { ComponentProps, PropsWithChildren } from "react";
import { TextField } from "./TextField";
import { fieldAtom, FormAtom, formAtom, useForm, read } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { StoryForm } from "../stories";
import { Story } from "@storybook/react";

export default {
  title: "TextField",
  component: TextField,
};

const ControlledForm = ({
  form,
  children,
}: PropsWithChildren<{ form: FormAtom<any> }>) => {
  const { submit } = useForm(form);

  return <StoryForm submit={submit}>{children}</StoryForm>;
};

const Template: Story<ComponentProps<typeof ControlledForm>> = (args) => {
  return <ControlledForm {...args} />;
};

const username = fieldAtom({
  value: "",
  validate: zodValidate(z.string().min(4), { on: "change" }),
});

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ username }),
  children: <TextField field={username} label="User Name" />,
};

const email = fieldAtom({
  value: "",
  validate: zodValidate(z.string().email(), { on: "change" }),
});

export const Email = Template.bind({});
Email.args = {
  form: formAtom({ email }),
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
};

const passwordInitial = fieldAtom({
  value: "",
  validate: zodValidate(z.string().min(6), { on: "change" }),
});

const password = fieldAtom({
  value: "",
  validate: zodValidate(
    (get) => {
      const initialPassword = get(get(passwordInitial).value);

      return z.string().min(6).and(z.literal(initialPassword));
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
      <TextField
        type="password"
        field={password}
        label="Confirm password"
        colors={["success", "failure"]}
      />
    </>
  ),
};
