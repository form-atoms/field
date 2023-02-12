import { multiSelectField } from "@form-atoms/field";

import { CheckboxGroupField } from "./CheckboxGroupField";
import { getLabel, getValue, options } from "./languages";
import { FormStory, StoryForm } from "../stories";

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
