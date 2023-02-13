import { fileField } from "@form-atoms/field";

import { FileField } from "./FileField";
import { FormStory, meta, optionalField } from "../stories";

export default {
  title: "FileField",
  ...meta,
};

const profilePicture = fileField();

export const Required: FormStory = {
  args: {
    fields: { profilePicture },
    children: (args) => (
      <FileField field={profilePicture} label="Profile Picture" {...args} />
    ),
  },
};

const profilePictureOpitonal = fileField({ optional: true });

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { profilePicture: profilePictureOpitonal },
    children: () => (
      <FileField field={profilePictureOpitonal} label="Profile Picture" />
    ),
  },
};
