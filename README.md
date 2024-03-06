<div align="center">
  <img width="180" style="margin: 32px" src="./form-atoms-field.svg">
  <h1>@form-atoms/field</h1>
</div>

A `zod`-powered [`fieldAtoms`](https://github.com/form-atoms/form-atoms?tab=readme-ov-file#fieldatom) with pre-configured schemas for type & runtime safety.

```
yarn add jotai jotai-effect form-atoms @form-atoms/field zod
```

<a aria-label="NPM version" href="https://www.npmjs.com/package/%40form-atoms/field">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/%40form-atoms/field?style=for-the-badge&labelColor=24292e">
</a>
<a aria-label="Code coverage report" href="https://codecov.io/gh/form-atoms/field">
  <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/form-atoms/field?style=for-the-badge&labelColor=24292e">
</a>

## Features

- [x] **Well-typed fields** required & validated by default
- [x] **Initialized field values**, commonly with `undefined` empty value
- [x] **Optional fields** with schema defaulting to `z.optional()`
- [x] **Conditionally required fields** - the required state can depend on other jotai atoms.

The fields are integrated with the following components:

#### Atomic Components

When implementing forms, there are subtle details which you must likely implement yourself. For example you might need to implement a placeholder for a select,
a clickable label which focuses the respective input, or a custom indicator whether the input is required or optional.

We take care of these details in atomic 'low-level' components like `PlaceholderOption`, `FieldLabel` and `RequirementIndicator` respectively.

#### Generic Components

With other form libraries you might find yourself repeatedly wiring them into recurring scenarios like checkbox multi select or radio group.
We've created highly reusable generic components which integrate the native components.
For example to select a value of generic type you can use the generic [RadioGroup](https://form-atoms.github.io/field/?path=/docs/components-radiogroup--docs) or [Select](https://form-atoms.github.io/field/?path=/docs/components-select--docs).

To select multiple values (array of values) you can use the generic [CheckboxGroup](https://form-atoms.github.io/field/?path=/docs/components-checkboxgroup--docs) or [MultiSelect](https://form-atoms.github.io/field/?path=/docs/components-multiselect--docs)

Lastly to capture a list of objects, you will find the [ListField](https://form-atoms.github.io/field/?path=/docs/components-listfield--docs) handy.

## Docs

See [Storybook docs](https://form-atoms.github.io/field/)

### Quick start

```tsx
import { textField, numberField, stringField, Select } from "@form-atoms/field";
import { fromAtom, useForm, Input } from "form-atoms";
import { z } from "zod";

const personForm = formAtom({
  name: textField(),
  age: numberField({ schema: z.number().min(18) }); // override default schema
  character: stringField().optional(); // make field optional
});

export const Form = () => {
  const { fieldAtoms, submit } = useForm(personForm);

  return (
    <form onSubmit={submit(console.log)}>
      <InputField atom={fieldAtoms.name} label="Your Name" />
      <InputField atom={fieldAtoms.age} label="Your age (min 18)" />
      <Select
        field={fieldAtoms.character}
        label="Character"
        options={["the good", "the bad", "the ugly"]}
        getValue={(option) => option}
        getLabel={(option) => option}
      />
    </form>
  );
};
```

## Integrations

`@form-atoms/field` comes pre-wired to popular UI libraries:

| 📦Package                                            | 🎨 Storybook                                              | About                                          |
| ---------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------- |
| [flowbite](https://github.com/form-atoms/flowbite)   | [Flowbite Fields](https://form-atoms.github.io/flowbite/) | Bindigs to Tailwind component library Flowbite |
| [chakra-ui](https://github.com/form-atoms/chakra-ui) | [ChakraUI Fields](https://form-atoms.github.io/chakra-ui) | Bindings to CSS-in-JS library Chakra UI        |
