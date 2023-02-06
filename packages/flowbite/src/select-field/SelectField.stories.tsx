import React from "react";
import { SelectField } from "./SelectField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { country, options, getLabel, getValue } from "./country";

export default {
  title: "SelectField",
  component: SelectField,
};

export const Primary = Template.bind({});
Primary.args = {
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
};
