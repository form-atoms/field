<div align="center">
  <img width="120" style="margin: 32px" src="../../form-atoms-field.svg">
  <h1>@form-atoms/flowbite</h1>
</div>

### `@form-atoms/field` bindings to [`@flowbite/react`](https://flowbite-react.com/forms) components

### Installation

```
yarn add @form-atoms/flowbite
```

## Field Components

### Common behavior

#### `required` prop

By default, when the field atoms are required, all the field components will have `required=true`. This will cause the browser to focus
the first empty & required input & display warning tooltip over it.

Sometimes this browser UX might be undesirable. All the fields accept
the `required` prop which when set to `undefined` or `false` will turn off the default behavior. Instead, when required & empty input is submitted,
the UI will display error message.

Note that the prop controls only the UI/input required behavior. The actual data/field requirement is controlled by the
fieldAtom config. This means that `aria-required` will be `true` when the fieldAtom is not optional.

### SelectField

| prop                  | Default                     | Description                                      |
| --------------------- | --------------------------- | ------------------------------------------------ |
| `placeholder: string` | `"Please select an option"` | Sets label on fake placeholder = disabled option |
