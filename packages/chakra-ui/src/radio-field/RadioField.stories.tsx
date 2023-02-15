import { country, getLabel, getValue, options } from "./country";
import { RadioField } from "./RadioField";
import { FormStory, meta } from "../stories";

export default {
  title: "RadioField",
  ...meta,
};

export const Required: FormStory = {
  args: {
    fields: { country },
    children: ({ required }) => (
      <RadioField
        field={country}
        required={required}
        label="Country of Origin"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
