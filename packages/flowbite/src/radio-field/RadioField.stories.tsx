import { RadioField } from "./RadioField";
import { StoryForm, FormStory } from "../stories";
import { country, getValue, getLabel, options } from "../select-field/country";

export default {
  title: "RadioField",
  component: StoryForm,
};

export const Primary: FormStory = {
  args: {
    fields: { country },
    children: (
      <RadioField
        field={country}
        label="Country of Origin"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
