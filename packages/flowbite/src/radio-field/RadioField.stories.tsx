import { RadioField } from "./RadioField";
import { meta, FormStory } from "../stories";
import { country, getValue, getLabel, options } from "../select-field/country";

export default {
  title: "RadioField",
  ...meta,
};

export const Primary: FormStory = {
  args: {
    fields: { country },
    children: () => (
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
