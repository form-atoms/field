import { FileField } from "./FileField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { fileField } from "@react-last-field/field";

export default {
  title: "FileField",
  component: FileField,
};

const profilePicture = fileField();

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ profilePicture }),
  children: <FileField field={profilePicture} label="Profile Picture" />,
};
