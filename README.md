<div align="center">
  <img width="180" style="margin: 32px" src="./form-atoms-field.svg">
  <h1>@form-atoms/field</h1>
</div>

A `zod`-powered [`fieldAtoms`](https://github.com/form-atoms/form-atoms?tab=readme-ov-file#fieldatom) with pre-configured schemas for type & runtime safety.

```
npm install jotai jotai-effect form-atoms @form-atoms/field zod
```

<a aria-label="Minzipped size" href="https://bundlephobia.com/result?p=%40form-atoms/field">
  <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/%40form-atoms/field?style=for-the-badge&labelColor=24292e">
</a>
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
- [x] **Conditionally required fields** - the required state can depend on other jotai atoms
- [x] **Generic Single-choice Components** [RadioGroup](https://form-atoms.github.io/field/?path=/docs/components-radiogroup--docs) and [Select](https://form-atoms.github.io/field/?path=/docs/components-select--docs)
- [x] **Generic Multi-choice Components** [CheckboxGroup](https://form-atoms.github.io/field/?path=/docs/components-checkboxgroup--docs) and [MultiSelect](https://form-atoms.github.io/field/?path=/docs/components-multiselect--docs)

### Quick Start

```tsx
import { textField, numberField, stringField, Select } from "@form-atoms/field";
import { fromAtom, useForm, Input } from "form-atoms";
import { z } from "zod";

const personForm = formAtom({
  name: textField(),
  age: numberField({ schema: (s) => s.min(18) }); // extend the default schema
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

See [Storybook docs](https://form-atoms.github.io/field/) for more.

## Integrations

`@form-atoms/field` comes pre-wired to popular UI libraries:

| 📦Package                                          | 🎨 Storybook                                              | About                                          |
| -------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------- |
| [flowbite](https://github.com/form-atoms/flowbite) | [Flowbite Fields](https://form-atoms.github.io/flowbite/) | Bindigs to Tailwind component library Flowbite |
