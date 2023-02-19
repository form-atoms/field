import {
  Radio,
  RadioControl,
  checkboxField,
  textField,
} from "@form-atoms/field";

import { ArrayField } from "./ArrayField";
import { RadioOption } from "../radio-option";
import { FormStory, VariantProps, meta } from "../stories";
import { TextField } from "../text-field";

export default {
  title: "ArrayField",
  ...meta,
};

type Phone = {
  number?: string;
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
    name: "primaryPhone",
    value: primary,
  }),
});

const formFields = {
  phones: [
    { number: "+421 933 888 999", primary: true },
    { number: "+420 905 100 200", primary: false },
  ].map(phoneBuilder),
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
                <Radio control={control} field={fields.primary}>
                  {() => (
                    <RadioOption
                      field={fields.primary}
                      required={required}
                      label="Primary Phone"
                      helperText="SMS to this phone will be used for authentication purposes"
                    />
                  )}
                </Radio>
              </>
            )}
          </ArrayField>
        )}
      </RadioControl>
    ),
  },
};
