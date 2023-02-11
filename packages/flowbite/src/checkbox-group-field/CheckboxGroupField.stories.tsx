import { multiSelectField } from "@form-atoms/field";
import { CheckboxGroupField } from "./CheckboxGroupField";
import { FormStory, StoryForm } from "../stories";
import { options, getLabel, getValue } from "./languages";

export default {
  title: "CheckboxGroupField",
  component: StoryForm,
};

const proficientLanguages = multiSelectField();

export const Primary: FormStory = {
  args: {
    fields: { proficientLanguages },
    children: () => (
      <CheckboxGroupField
        field={proficientLanguages}
        label="What programming languages are you proficient?"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
