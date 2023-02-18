import { arrayFieldAtoms, numberField, textField } from "@form-atoms/field";
import { Button } from "flowbite-react";
import { Fragment } from "react";

import { ArrayField } from "./ArrayField";
import { NumberField } from "../number-field";
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

type Person = {
  age: number;
  name: string;
};

const personBuilder = (
  { name, age }: Person | undefined = {
    name: "",
    age: 0,
  }
) => ({
  name: textField({
    name: "name",
    value: name,
  }),
  age: numberField({
    name: "age",
    value: age,
  }),
});

const addressWithPeopleBuilder = (
  { city, street, people }: (Address & { people: Person[] }) | undefined = {
    city: "",
    street: "",
    people: [],
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
  people: arrayFieldAtoms(personBuilder, people),
});

const fields = {
  addresses: arrayFieldAtoms(addressWithPeopleBuilder, [
    {
      city: "Stockholm",
      street: "Carl Gustav Street",
      people: [{ name: "Simon", age: 20 }],
    },
    {
      city: "Bratislava",
      street: "Kosicka",
      people: [{ name: "Arnold", age: 33 }],
    },
  ]),
};

export const AddressesWithPeopleArrayField: FormStory = {
  args: {
    fields,
    children: ({ form }: VariantProps<typeof fields>) => (
      <ArrayField
        keyFrom="street"
        path={["addresses"]}
        form={form}
        builder={addressWithPeopleBuilder}
        AddItemButton={({ add }) => (
          <Button color="gray" onClick={add}>
            Add Address
          </Button>
        )}
      >
        {({ fields, index }) => (
          <Fragment key={index}>
            <div className="grid grid-flow-col grid-cols-2 gap-4">
              <TextField label="City" field={fields.city} />
              <TextField label="Street" field={fields.street} />
            </div>
            <ArrayField
              keyFrom="name"
              path={["addresses", index, "people"]}
              builder={personBuilder}
              form={form}
              AddItemButton={({ add }) => (
                <Button color="gray" onClick={add}>
                  Add Person
                </Button>
              )}
            >
              {({ fields, index }) => (
                <div
                  key={index}
                  className="grid grid-flow-col grid-cols-2 gap-4"
                >
                  <TextField label="Name" field={fields.name} />
                  <NumberField label="Age" field={fields.age} />
                </div>
              )}
            </ArrayField>
          </Fragment>
        )}
      </ArrayField>
    ),
  },
};
