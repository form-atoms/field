import { FileField } from "./FileField";
import { FormStory, meta } from "../stories";
import { fileField } from "@form-atoms/field";

export default {
  title: "FileField",
  ...meta,
};

const profilePicture = fileField();

export const Primary: FormStory = {
  args: {
    fields: { profilePicture },
    children: (args) => (
      <FileField field={profilePicture} label="Profile Picture" {...args} />
    ),
  },
};
