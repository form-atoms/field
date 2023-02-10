import { TextareaField } from "./TextareaField";
import { fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { StoryForm, FormStory } from "../stories";

export default {
  title: "TextareaField",
  component: StoryForm,
};

const bio = fieldAtom<string>({
  value: "",
  validate: zodValidate(z.string()),
});

export const Primary: FormStory = {
  args: {
    fields: { bio },
    children: <TextareaField field={bio} label="Biography" />,
  },
};
