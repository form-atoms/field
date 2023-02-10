import { multiSelectField } from "@form-atoms/field";
import { CheckboxGroupField } from "./CheckboxGroupField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { options, getLabel, getValue } from "./languages";

export default {
  title: "CheckboxGroupField",
  component: CheckboxGroupField,
};

const proficientLanguages = multiSelectField();

export const Primary = {
  render: Template.bind({}),

  args: {
    form: formAtom({ proficientLanguages }),
    children: (
      <CheckboxGroupField
        field={proficientLanguages}
        label="What programming languages are you proficient?"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
