import { SelectField } from "./SelectField";
import { FormStory, StoryForm } from "../stories";
import { country, options, getLabel, getValue } from "./country";

export default {
  title: "SelectField",
  component: StoryForm,
};

export const Primary: FormStory = {
  args: {
    fields: { country },
    children: (
      <SelectField
        field={country}
        label="Country of Origin"
        placeholder="Click to pick a country"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
