import { country, getLabel, getValue, options } from "./country";
import { RadioField } from "./RadioField";
import { FormStory, meta } from "../stories";

export default {
  title: "RadioField",
  ...meta,
};

// const country = selectField({
//   value: options[0]?.code,
// });

export const Required: FormStory = {
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
