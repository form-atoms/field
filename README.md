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

### Key differences to other form libraries

#### No 'dotted keypath' access

Some libraries use `path.to.field` approach with field-dependent validation or when reading field at other place. We don't need such paths, as fields can be moved arround in regular JavaScript variables, as they are jotai atoms in reality.

#### Persistent form state by default

With others libraries you often lose form state when your component or page unmounts. Thats because the rendered form hook maintains the store. If the library provides a contextual API, you can opt-in into the persistence, so form state lives even when you unmount the form.

`form-atoms` on the other hand keeps the form state until you clear it, because it lives in jotai atoms. This way, you don't have to warn users about data loss if they navigate out of filled & unsubmitted form. Instead you can display 'continue where you left off' message when they return to the form.

#### Atomic headless components

The `form-atoms` library provides atomic form primitives capable of tracking input value, touch state, validation status and more.

`@form-atoms/field` extends these primitives & packages them into hooks & headless components (think 'smart components'), which can be easily wired to UI (think dumb components) checkbox, select or array field.

## Docs

[The documentation](https://miroslavpetrik.github.io/form-atoms-field/) will be enough for any application work. (Eventually, as it's a work in progress).
For more generic and custom constructs you will need the original [`form-atoms` docs](https://github.com/jaredLunde/form-atoms).

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

## Integrations

`@form-atoms/field` comes pre-wired to popular UI libraries:

| 📦Package                                                           | 🎨 Storybook                                                             | About                                          |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------- |
| [flowbite](https://github.com/MiroslavPetrik/form-atoms-flowbite)   | [Flowbite Fields](https://miroslavpetrik.github.io/form-atoms-flowbite/) | Bindigs to Tailwind component library Flowbite |
| [chakra-ui](https://github.com/MiroslavPetrik/form-atoms-chakra-ui) | 🚧 WIP                                                                   | Bindings to CSS-in-JS library Chakra UI        |
