import { country, getLabel, getValue, options } from "./country";
import { SelectField } from "./SelectField";
import { FormStory, meta } from "../stories";

export default {
  title: "SelectField",
  ...meta,
};

export const Primary: FormStory = {
  args: {
    fields: { country },
    children: (args) => (
      <SelectField
        field={country}
        label="Country of Origin"
        placeholder="Click to pick a country"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
        {...args}
      />
    ),
  },
};
