import { fileField } from "@form-atoms/field";

import { FileField } from "./FileField";
import { FormStory, meta } from "../stories";

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
