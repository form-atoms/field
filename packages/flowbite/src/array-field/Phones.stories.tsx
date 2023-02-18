import {
  Radio as RadioOption,
  arrayFieldAtoms,
  numberField,
  selectField,
  textField,
} from "@form-atoms/field";
import { HelperText, Label, Radio } from "flowbite-react";
import { Fragment } from "react";

import { ArrayField } from "./ArrayField";
import { FormStory, VariantProps, meta } from "../stories";
import { TextField } from "../text-field";

export default {
  title: "ArrayField",
  ...meta,
};

type Phone = {
  number: string;
  primary?: boolean;
};

const phoneBuilder = (
  { number }: Phone | undefined = {
    number: "",
  }
) => ({
  number: textField({
    name: "number",
    value: number,
  }),
});

const formFields = {
  primaryPhone: selectField({ name: "primaryPhone" }),
  phones: arrayFieldAtoms(phoneBuilder, [
    { number: "+421 933 888 999" },
    { number: "+420 905 100 200" },
  ]),
};

export const PhonesArrayField: FormStory = {
  args: {
    fields: formFields,
    children: ({ form }: VariantProps<typeof formFields>) => (
      <ArrayField
        keyFrom="number"
        path={["phones"]}
        form={form}
        builder={phoneBuilder}
      >
        {({ fields, index }) => (
          <Fragment key={index}>
            <TextField label="number" field={fields.number} />
            <RadioOption field={formFields.primaryPhone} value={`${index}`}>
              {({ id, ref, error, ...props }) => (
                <>
                  <div className="flex items-center gap-2">
                    <Radio role="radio" id={id} {...props} />
                    <div className="flex flex-col">
                      <Label htmlFor={id} color={error ? "failure" : undefined}>
                        Primary number
                      </Label>
                      <HelperText
                        className="mt-0 text-xs"
                        color={error ? "failure" : undefined}
                      >
                        {error ??
                          "SMS to this phone will be used for authentication purposes"}
                      </HelperText>
                    </div>
                  </div>
                </>
              )}
            </RadioOption>
          </Fragment>
        )}
      </ArrayField>
    ),
  },
};
