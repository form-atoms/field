import React, { useCallback } from "react";
import { SelectField } from "./SelectField";
import { fieldAtom, formAtom, useForm } from "form-atoms";
import { StoryForm } from "../stories";

export default {
  title: "SelectField",
  component: SelectField,
};

const options = [
  { code: "SK", name: "Slovak Republic" },
  { code: "CZ", name: "Czech Republic" },
] as const;

const form = formAtom({
  country: fieldAtom({
    value: "SK",
  }),
});

const Template = (args: any[]) => {
  const { fieldAtoms, submit } = useForm(form);

  const getValue = useCallback(
    (opt: { code: string; name: string }) => opt.code,
    []
  );

  return (
    <StoryForm submit={submit}>
      <SelectField
        field={fieldAtoms.country}
        label="Country of Origin"
        options={options}
        getValue={getValue}
        getLabel={(opt) => opt?.name}
        {...args}
      />
    </StoryForm>
  );
};

export const Primary = Template.bind({});
