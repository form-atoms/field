import { CheckboxGroupField } from "./CheckboxGroupField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { options, getLabel, getValue } from "./country";
import { multiSelectField } from "@form-atoms/field";

export default {
  title: "CheckboxGroupField",
  component: CheckboxGroupField,
};

const visitedCountries = multiSelectField();

export const Primary = {
  render: Template.bind({}),

  args: {
    form: formAtom({ visitedCountries }),
    children: (
      <CheckboxGroupField
        field={visitedCountries}
        label="Please check countries you've visited"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
