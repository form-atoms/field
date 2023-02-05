import React  from "react";
import { FileField } from "./FileField";
import { formAtom,  } from "form-atoms";
import { Template } from "../stories";
import { fileFieldAtom } from "@react-last-field/field";

export default {
  title: "FileField",
  component: FileField,
};

const profilePicture = fileFieldAtom();

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ profilePicture }),
  children: <FileField field={profilePicture} label="Profile Picture" />,
};
