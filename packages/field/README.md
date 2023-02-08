<div align="center">
  <img width="240" style="margin: 32px" src="../../form-atoms-field.svg">
  <h1>@form-atoms/field</h1>
</div>

Set of headless components composing form-atoms in common patterns:

### [ArrayField](./src/array-field/)

The array field enables you to capture list of items with the same attributes.
It offers `add` and `remove` callbacks to append new item or create existing one.

#### Common use cases

- capture list of user addresses `{street: string, city: string, state: string}[]`
- capture list of env variables `{name: string, value: string}[]`

#### Example - [codesandbox](https://codesandbox.io/s/form-atoms-field-arrayfield-example-8wdwo4?file=/src/App.tsx)

```tsx
const hobbiesForm = formAtom({
  hobbies: [{ name: fieldAtom({ value: "gardening" }) }],
});

const Hobbies = () => (
  <ArrayField
    form={hobbiesForm}
    path={["hobbies"]}
    builder={() => ({ name: fieldAtom({ value: "" }) })}
  >
    {({ fieldAtoms, index, DeleteItemButton }) => (
      <>
        <TextField field={fieldAtoms.name} label={`Hobby ${index}`} />
        {/* calls remove(index) when clicked*/}
        <DeleteItemButton />
      </>
    )}
  </ArrayField>
);
```

#### Props

| Name             | Type                                                            | Required? | Description                                                                                              |
| ---------------- | --------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| form             | `FormAtom<Fields>`                                              | Yes       | A form atom                                                                                              |
| path             | `K1 = [keyof Fields] \| [K1, K2 = keyof Field[K1]] \| ...`      | Yes       | A keypath to an array in form fields                                                                     |
| builder          | `() => FormFields[...path]`                                     | Yes       | A function returning item fields as existing on keypath in the form                                      |
| children         | `(props: {fieldAtoms, index, DeleteItemButton}) => JSX.Element` | Yes       | A render prop accepting item fields and `DeleteButton` component for current array field item at `index` |
| AddItemButton    | `(props: {add: () => void}) => JSX.Element`                     | No        | A render prop accepting `add` prop to instantiate new array items                                        |
| DeleteItemButton | `(props: {remove: () => void}) => JSX.Element`                  | No        | A render prop accepting `remove` prop to delete current item                                             |

```

```
