import { RadioField } from "./RadioField";
import { country, getLabel, getValue, options } from "../select-field/country";
import { FormStory, meta } from "../stories";

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
