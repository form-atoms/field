import { RadioField } from "./RadioField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { country, getValue, getLabel, options } from "../select-field/country";

export default {
  title: "RadioField",
  component: RadioField,
};

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ country }),
  children: (
    <RadioField
      field={country}
      label="Country of Origin"
      options={options}
      getValue={getValue}
      getLabel={getLabel}
    />
  ),
};
