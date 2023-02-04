import React, { useCallback } from "react";
import { RadioField } from "./RadioField";
import { fieldAtom, formAtom, useForm } from "form-atoms";
import { StoryForm } from "../stories";

export default {
  title: "RadioField",
  component: RadioField,
};

const options = [
  { code: "SK", name: "Slovak Republic" },
  { code: "CZ", name: "Czech Republic" },
] as const;

const form = formAtom({
  country: fieldAtom({
    value: options[0]?.code,
  }),
});

const Template = (args: any[]) => {
  const { fieldAtoms, submit } = useForm(form);

  const getValue = useCallback(
    (opt: { code: string; name: string } | undefined) => opt?.code || "empty",
    []
  );

  return (
    <StoryForm submit={submit}>
      <RadioField
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
