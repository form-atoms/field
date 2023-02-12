import { fileFieldAtom } from "@form-atoms/field";
import { Story } from "@storybook/react";
import { FormAtom, fieldAtom, formAtom, useForm } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import React, { ComponentProps, PropsWithChildren } from "react";
import { z } from "zod";

import { FileField } from "./FileField";
import { StoryForm } from "../stories";

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
