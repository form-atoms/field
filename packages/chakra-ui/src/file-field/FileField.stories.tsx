import React, { ComponentProps, PropsWithChildren } from "react";
import { fieldAtom, FormAtom, formAtom, useForm } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { StoryForm } from "../stories";
import { FileField } from "./FileField";
import { Story } from "@storybook/react";
import { fileFieldAtom } from "@form-atoms/field";

export default {
  title: "FileField",
  component: FileField,
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

const profilePicture = fileFieldAtom();

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ profilePicture }),
  children: <FileField field={profilePicture} label="Profile Picture" />,
};
