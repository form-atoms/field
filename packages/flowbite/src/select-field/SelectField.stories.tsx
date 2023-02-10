import { SelectField } from "./SelectField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { country, options, getLabel, getValue } from "./country";

export default {
  title: "SelectField",
  component: SelectField,
};

export const Primary = {
  render: Template.bind({}),

  args: {
    form: formAtom({ country }),
    children: (
      <SelectField
        field={country}
        label="Country of Origin"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
