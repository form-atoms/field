import React from "react";
import { SelectField } from "./SelectField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { selectFieldAtom } from "@react-last-field/field";

export default {
  title: "SelectField",
  component: SelectField,
};

const options = [
  { code: "SK", name: "Slovak Republic" },
  { code: "CZ", name: "Czech Republic" },
] as const;

const getValue = (opt: { code: string; name: string }) => opt.code;

const country = selectFieldAtom<string>({ name: "country" });

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
