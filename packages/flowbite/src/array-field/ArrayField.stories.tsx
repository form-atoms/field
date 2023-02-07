import React from "react";
import { fieldAtom, formAtom, useForm } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { StoryForm } from "../stories";
import { arrayFieldAtoms } from "@form-atoms/field";
import { ArrayField } from "./ArrayField";
import { TextField } from "../text-field";
import { ImageField } from "../image-field";
import { NumberField } from "../number-field";
import { Button } from "flowbite-react";

export default {
  title: "ArrayField",
  component: ArrayField,
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
  city: fieldAtom({
    name: "city",
    value: city,
    validate: zodValidate(z.string().min(3), { on: "change" }),
  }),
  street: fieldAtom({
    name: "street",
    value: street,
  }),
});

const street = fieldAtom({
  name: "street",
  value: "",
});

const userFields = {
  first: fieldAtom({
    value: "",
  }),
  last: fieldAtom({
    value: "",
  }),
};

const userForm = formAtom(userFields);

const testForm = {
  street,
  s2: street,
  kek: {
    bar: street,
  },
};

const form = formAtom({
  addresses: arrayFieldAtoms(addressBuilder, [
    { city: "Stockholm", street: "Carl Gustav Street" },
    { city: "Bratislava", street: "Kosicka" },
  ]),
});

const vals = {
  addresses: arrayFieldAtoms(addressBuilder, [
    { city: "Stockholm", street: "Carl Gustav Street" },
    { city: "Bratislava", street: "Kosicka" },
  ]),
};

const addressesFields = {
  addresses: [
    {
      city: fieldAtom({ value: "Stockholm" }),
      street: fieldAtom({ value: "Carl Gustav Street" }),
    },
    {
      city: fieldAtom({ value: "Bratislava" }),
      street: fieldAtom({ value: "Kosicka" }),
    },
  ],
};

export function AddressesArrayField() {
  const { submit } = useForm(form);

  return (
    <StoryForm submit={submit}>
      <ArrayField path={["addresses"]} form={form} builder={addressBuilder}>
        {({ fieldAtoms }) => (
          <div className="grid grid-flow-col grid-cols-2 gap-4">
            <TextField label="City" field={fieldAtoms.city} />
            <TextField label="Street" field={fieldAtoms.street} />
          </div>
        )}
      </ArrayField>
    </StoryForm>
  );
}

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
  name: fieldAtom({
    name: "name",
    value: name,
    validate: zodValidate(z.string().min(3), { on: "change" }),
  }),
  age: fieldAtom({
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
  city: fieldAtom({
    name: "city",
    value: city,
    validate: zodValidate(z.string().min(3), { on: "change" }),
  }),
  street: fieldAtom({
    name: "street",
    value: street,
  }),
  people: arrayFieldAtoms(personBuilder, people),
});

const addressWithPeopleForm = formAtom({
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
});

export function AddressesWithPeopleArrayField() {
  const { submit } = useForm(addressWithPeopleForm);

  return (
    <StoryForm submit={submit}>
      <ArrayField
        path={["addresses"]}
        form={addressWithPeopleForm}
        builder={addressWithPeopleBuilder}
        AddItemButton={({ add }) => (
          <Button color="gray" onClick={add}>
            Add Address
          </Button>
        )}
      >
        {({ fieldAtoms, index }) => (
          <>
            <div className="grid grid-flow-col grid-cols-2 gap-4">
              <TextField label="City" field={fieldAtoms.city} />
              <TextField label="Street" field={fieldAtoms.street} />
            </div>
            <ArrayField
              path={["addresses", index, "people"]}
              builder={personBuilder}
              form={addressWithPeopleForm}
              AddItemButton={({ add }) => (
                <Button color="gray" onClick={add}>
                  Add Person
                </Button>
              )}
            >
              {({ fieldAtoms }) => (
                <div className="grid grid-flow-col grid-cols-2 gap-4">
                  <TextField label="Name" field={fieldAtoms.name} />
                  <NumberField label="Age" field={fieldAtoms.age} />
                </div>
              )}
            </ArrayField>
          </>
        )}
      </ArrayField>
    </StoryForm>
  );
}

type Image = {
  id: string;
  url: string;
};

const imageBuilder = (
  { id, url }: Image | undefined = {
    id: "",
    url: "",
  }
) =>
  fieldAtom({
    value: { id, url },
    validate: zodValidate(
      z.object({
        url: z.string(),
        id: z.string().cuid(),
      }),
      {
        on: "change",
      }
    ),
  });

const imageForm = formAtom({
  images: arrayFieldAtoms(imageBuilder, [
    { id: "1", url: "https://" },
    { id: "2", url: "https://" },
  ]),
});

const imageFields = {
  images: [
    fieldAtom({
      value: { id: "1", url: "https://" },
    }),
    fieldAtom({
      value: { id: "2", url: "https://" },
    }),
  ],
};

export function ImageUploadArrayField() {
  const { submit } = useForm(imageForm);

  return (
    <StoryForm submit={submit}>
      <ArrayField path={["images"]} form={imageForm} builder={imageBuilder}>
        {({ fieldAtoms }) => (
          <>
            <ImageField field={fieldAtoms} />
          </>
        )}
      </ArrayField>
    </StoryForm>
  );
}
