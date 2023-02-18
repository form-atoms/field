import { arrayFieldAtoms, textField } from "@form-atoms/field";

import { ArrayField } from "./ArrayField";
import { FormStory, VariantProps, meta } from "../stories";
import { TextField } from "../text-field";

export default {
  title: "ArrayField",
  ...meta,
};

type Address = {
  city: string;
  street: string;
};

const addressBuilder = (
  { city, street }: Address | undefined = {
    city: "",
    street: "",
  }
) => ({
  city: textField({
    name: "city",
    value: city,
  }),
  street: textField({
    name: "street",
    value: street,
  }),
});

const fields = {
  addresses: arrayFieldAtoms(addressBuilder, [
    { city: "Stockholm", street: "Carl Gustav Street" },
    { city: "Bratislava", street: "Kosicka" },
  ]),
};

export const AddressesArrayField: FormStory = {
  args: {
    fields,
    children: ({ form }: VariantProps<typeof fields>) => (
      <ArrayField
        keyFrom="city"
        path={["addresses"]}
        form={form}
        builder={addressBuilder}
      >
        {({ fields, index }) => (
          <div key={index} className="grid grid-flow-col grid-cols-2 gap-4">
            <TextField label="City" field={fields.city} />
            <TextField label="Street" field={fields.street} />
          </div>
        )}
      </ArrayField>
    ),
  },
};
