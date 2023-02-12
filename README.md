<div align="center">
  <img width="180" style="margin: 32px" src="./form-atoms-field.svg">
  <h1>Atomic Form Fields for React</h1>
</div>

Declarative & headless form fields build on top of [`jotai & form-atoms`](https://github.com/jaredLunde/form-atoms).

```
yarn add jotai form-atoms @form-atoms/field
```

## Motivation

`form-atoms` is the 'last-mile' of your app's form stack. It has layered, bottom-up architecture with clear separation of concerns.
We provide you with stable pre-fabricated UI fields, while you still can go one level down and take the advantage of form primitives to develop anything you need.

To contrast it with formik or react-hook-form, our form state thanks to `jotai` lives outside of the react tree, so you never lose it when the component unmounts.
Moreover, jotai's external state unlike redux-form has compact API with 'atom-local reducer' and automatic dependency tracking leading to unmatched rendering performance.

![architecture](./architecture.png)

### What's in the box?

The `form-atoms` library provides atomic form primitives capable of tracking input value, touch state, validation status and more.

`@form-atoms/field` extends these primitives & packages them into hooks & headless components (think 'smart components'), which can be easily wired to UI (think dumb components) checkbox, select or array field.

### What is a `<Field />`?

Most UI libraries provide styled primitive `<Input>` components, form `<Label>` and form `<Control>`. These must be integrated together with state & validation libraries, so when the input value is invalid, the error is propagated to the form control or the label is colored to red. The work to get this right is non-trivial and error prone.

`@form-atoms/field` provides you with **integrated field components**:

```
<Field> = <Control> + <Input> + <Label> + <HelpText> + <Error>
```

## Fields

For well-known field types we export data type specific `fieldAtom` constructors. These come with
pre-defined empty value of `undefined` and a specific zod validation schema.
Similarly to `zod` schema fields, by default all the fieldAtoms are required.

### Usage

```tsx
import { numberField } from "@form-atoms/field";
import { fromAtom } from "form-atoms";
import { z } from "zod";
import { NumberField } from "@form-atoms/flowbite"; // or /chakra-ui


const height = numberField();
const age = numberField({ schema: z.number().min(18) }); // override default schema
const numOfKids = numberField({ optional: true }); // make field optional

const personForm = formAtom({ height, age, numOfKids });

export const Form = () => {
  const { submit } = useForm(personForm);

  return (
    <form onSubmit={submit(console.log)}>
      <NumberField field={height} label="Height (in cm)" />
      <NumberField field={age} label="Your age (min 18)" />
      <NumberField field={numOfKids} label="Number of kids" />
    </form>
  );
};
```

| Field atom                                             | Default 'required' validation | Use with                 |
| ------------------------------------------------------ | ----------------------------- | ------------------------ |
| `checkboxField(config?): FieldAtom<boolean>`           | `z.literal(true)`             | CheckboxField            |
| `numberField(config?): FieldAtom<number \| undefined>` | `z.number()`                  | NumberField, SliderField |
| `selectField(config?): FieldAtom<string \| undefined>` | `z.string()`                  | RadioField, SelectField  |
| `fileField(config?): FieldAtom<FileList \| undefined>` | `z.instanceof(FileList)`      | FileField                |

### Integrations

`@form-atoms/field` comes with `<Fields />` pre-wired to popular UI libraries.

| 📦Package Docs                     | 🎨 Storybook                                             | 📃Official Docs                                                 | About                                          |
| ---------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------- |
| [flowbite](./packages/flowbite/)   | [Flowbite Fields](https://form-atoms-field.netlify.app/) | [flowbite-react](https://flowbite-react.com/forms)              | Bindigs to Tailwind component library Flowbite |
| [chakra-ui](./packages/chakra-ui/) | 🚧 WIP                                                   | [chakra-ui](https://chakra-ui.com/docs/components/form-control) | Bindings to CSS-in-JS library Chakra UI        |
