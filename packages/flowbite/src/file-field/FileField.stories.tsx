import { FileField } from "./FileField";
import { FormStory, StoryForm } from "../stories";
import { fileField } from "@form-atoms/field";

export default {
  title: "FileField",
  component: StoryForm,
};

const profilePicture = fileField();

export const Primary: FormStory = {
  args: {
    fields: { profilePicture },
    children: <FileField field={profilePicture} label="Profile Picture" />,
  },
};
