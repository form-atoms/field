import { TextareaField } from "./TextareaField";
import { FormStory, meta } from "../stories";
import { textField } from "@form-atoms/field";

export default {
  title: "TextareaField",
  ...meta,
};

const bio = textField();

export const Primary: FormStory = {
  args: {
    fields: { bio },
    children: (args) => (
      <TextareaField field={bio} label="Biography" {...args} />
    ),
  },
};
