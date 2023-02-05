import React from "react";
import { SelectField } from "./SelectField";
import { fieldAtom, formAtom, useForm } from "form-atoms";
import { Template } from "../stories";

export default {
  title: "SelectField",
  component: SelectField,
};

const options = [
  { code: "SK", name: "Slovak Republic" },
  { code: "CZ", name: "Czech Republic" },
] as const;

const getValue = (opt: { code: string; name: string }) => opt.code;

const country = fieldAtom({
  value: "SK",
});

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ country }),
  children: (
    <SelectField
      field={country}
      label="Country of Origin"
      options={options}
      getValue={getValue}
      getLabel={(opt) => opt?.name}
    />
  ),
};
