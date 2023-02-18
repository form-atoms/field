<div align="center">
  <img width="240" style="margin: 32px" src="../../form-atoms-field.svg">
  <h1>@form-atoms/field</h1>
</div>

Set of headless components composing form-atoms in common patterns:

### [<ArrayField />](./src/array-field/)

The array field enables you to capture list of items with the same attributes.
It offers `add` and `remove` callbacks to append new item or drop existing one.

#### Common use cases

- capture list of user addresses `{street: string, city: string, state: string}[]`
- capture list of env variables `{name: string, value: string}[]`

#### Props

| Name             | Type                                                        | Required? | Description                                                                                                                                              |
| ---------------- | ----------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| form             | `FormAtom<Fields>`                                          | Yes       | A form atom                                                                                                                                              |
| path             | `(string \| number)[]`                                      | Yes       | A keypath to an array in the form fields                                                                                                                 |
| builder          | `() => GetAt<FormFields, Path>`                             | Yes       | A function returning new item fields to be appended to the field array at the specified path                                                             |
| keyFrom          | `string`                                                    | Yes\*     | A keyof the array item pointing to some `FieldAtom`. When the item is of type `FormFields`. \*Optional when the array items are of type `FieldAtom<any>` |
| children         | `(props: {fields, index, DeleteItemButton}) => JSX.Element` | Yes       | A render prop accepting item fields and `DeleteButton` component for current array field item at `index`                                                 |
| AddItemButton    | `(props: {add: () => void}) => JSX.Element`                 | No        | A render prop accepting `add` prop to instantiate new array items                                                                                        |
| DeleteItemButton | `(props: {remove: () => void}) => JSX.Element`              | No        | A render prop accepting `remove` prop to delete current item                                                                                             |

#### Features

- **Optimized rendering**. the `keyFrom` prop will use the array item's field as stable render key. This is done internally, so you don't have to specify the `key` when the list is being rendered.
  This works thanks to Jotai's atom having `toString()` method providing stable `atomKey`.

#### Example - [CodeSandbox](https://codesandbox.io/s/form-atoms-field-arrayfield-example-8wdwo4?file=/src/App.tsx)

```tsx
const hobbiesForm = formAtom({
  hobbies: [{ name: fieldAtom({ value: "gardening" }) }],
});

const Hobbies = () => (
  <ArrayField
    form={hobbiesForm}
    keyFrom="name"
    path={["hobbies"]}
    builder={() => ({ name: fieldAtom({ value: "" }) })}
  >
    {({ fields, index, DeleteItemButton }) => (
      <>
        <TextField field={fields.name} label={`Hobby ${index}`} />
        {/* calls remove(index) when clicked */}
        <DeleteItemButton />
      </>
    )}
  </ArrayField>
);
```

#### Flat example

Traditionally the field array produces list of objects matching interface `FormFields[]`.
For some cases, you might want to capture list of primitives e.g. `FieldAtom<string>[]`:

```tsx
const phonesForm = formAtom({
  phones: [fieldAtom({ value: "" })], // NOTE: array of fieldAtoms
});

// NOTE: keyFrom is automatic since the array item is itself a field.
const Phones = () => (
  <ArrayField
    form={phonesForm}
    path={["phones"]}
    builder={() => fieldAtom({ value: "" })}
  >
    {({ fields, index, DeleteItemButton }) => (
      <>
        {/* NOTE: the item is itself field! */}
        <TextField field={fields} label={`Phone ${index}`} />
        {/* calls remove(index) when clicked */}
        <DeleteItemButton />
      </>
    )}
  </ArrayField>
);
```

#### Advanced example

ArrayField supports nested array fields.
For example to capture multiple people with multiple banking accounts:

```tsx
const peopleForm = formAtom({
  // level 0
  people: [
    {
      name: fieldAtom({ value: "Jerry" }),
      // level 1 (nested)
      accounts: [{ iban: fieldAtom({ value: "DE10 ..." }) }],
    },
  ],
});

// Note that for nested component we stil provide the root form instance
// the path prop to array also starts from the root
const AdvancedNestedExample = () => {
  return (
    <ArrayField
      form={peopleForm}
      keyFrom="name"
      path={["people"]}
      builder={() => ({
        name: fieldAtom({ value: "" }),
        accounts: [],
      })}
    >
      {({ fields, index, add, DeleteItemButton }) => (
        <>
          <label>Person #{index}</label> <DeleteItemButton />
          <TextField field={fields.name} label="Name" />
          <ArrayField
            form={peopleForm}
            keyFrom="iban"
            path={["people", index, "accounts"]}
            builder={() => ({ iban: fieldAtom({ value: "" }) })}
          >
            {({ fields, index, DeleteItemButton }) => (
              <>
                <label>Account #{index}</label> <DeleteItemButton />
                <TextField field={fields.iban} label="IBAN" />
              </>
            )}
          </ArrayField>
        </>
      )}
    </ArrayField>
  );
};
```
