import React from "react";
import { RadioField } from "./RadioField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { selectFieldAtom } from "@react-last-field/field";

export default {
  title: "RadioField",
  component: RadioField,
};

const options = [
  { code: "SK", name: "Slovak Republic" },
  { code: "CZ", name: "Czech Republic" },
] as const;

const country = selectFieldAtom({ name: "foo" });

const getValue = (opt: { code: string; name: string }) => opt.code;

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ country }),
  children: (
    <RadioField
      field={country}
      label="Country of Origin"
      options={options}
      getValue={getValue}
      getLabel={(opt) => opt.name}
    />
  ),
};
