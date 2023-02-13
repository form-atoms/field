import { selectField } from "@form-atoms/field";

import { RadioField } from "./RadioField";
import { country, getLabel, getValue, options } from "../select-field/country";
import { FormStory, meta, optionalField } from "../stories";

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
        label="Country of Origin"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
        required={required}
      />
    ),
  },
};

const optional = selectField({ optional: true });

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { country: optional },
    children: () => (
      <RadioField
        field={optional}
        label="Country of Origin"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
