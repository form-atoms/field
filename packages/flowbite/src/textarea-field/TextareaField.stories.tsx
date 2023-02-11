import { TextareaField } from "./TextareaField";
import { StoryForm, FormStory } from "../stories";
import { textField } from "@form-atoms/field";

export default {
  title: "TextareaField",
  component: StoryForm,
};

const bio = textField();

export const Primary: FormStory = {
  args: {
    fields: { bio },
    children: <TextareaField field={bio} label="Biography" />,
  },
};
