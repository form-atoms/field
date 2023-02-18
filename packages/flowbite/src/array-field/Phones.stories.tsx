import {
  Radio as RadioOption,
  arrayFieldAtoms,
  checkboxField,
  numberField,
  selectField,
  textField,
} from "@form-atoms/field";
import { Fragment } from "react";

import { ArrayField } from "./ArrayField";
import { RadioControl, RadioField } from "../radio";
import { FormStory, VariantProps, meta } from "../stories";
import { TextField } from "../text-field";

export default {
  title: "ArrayField",
  ...meta,
};

type Phone = {
  number: string;
  primary: boolean;
};

const phoneBuilder = (
  { number, primary }: Phone | undefined = {
    number: undefined,
    primary: false,
  }
) => ({
  number: textField({ name: "number", value: number }),
  primary: checkboxField({
    optional: true,
    name: "primaryPhone",
    value: primary,
  }),
});

const formFields = {
  phones: arrayFieldAtoms(phoneBuilder, [
    { number: "+421 933 888 999", primary: true },
    { number: "+420 905 100 200", primary: false },
  ]),
};

export const PhonesArrayField: FormStory = {
  args: {
    fields: formFields,
    children: ({ required, form }: VariantProps<typeof formFields>) => (
      <RadioControl name="primaryPhone">
        {({ control }) => (
          <ArrayField
            keyFrom="primary"
            form={form}
            path={["phones"]}
            builder={phoneBuilder}
          >
            {({ fields }) => (
              <>
                <TextField
                  field={fields.number}
                  required={required}
                  label="Phone Number"
                />
                <RadioField
                  field={fields.primary}
                  required={required}
                  control={control}
                  label="Primary Phone"
                  helperText="SMS to this phone will be used for authentication purposes"
                />
              </>
            )}
          </ArrayField>
        )}
      </RadioControl>
    ),
  },
};
