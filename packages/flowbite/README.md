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

The table sums it up:

| field config `optional` flag | JSX `required` prop          | UI Behavior when submitting empty form                                               | Storybook example                                                                                                |
| ---------------------------- | ---------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `optional: false`            | `required: true` (computed)  | Default behavior for required field. Displays native 'field required' browser popup. | [required text field](https://form-atoms-field.netlify.app/?path=/story/textfield--required)                     |
| `optional: false`            | `required: false` (manual)   | Manually opt-out of the native browser popup. Renders error message instead.         | [required text field](https://form-atoms-field.netlify.app/?path=/story/textfield--required&args=required:false) |
| `optional: true`             | `required: true` (manual)    | ⚠️ The JSX prop is ignored (invalid state) ⚠️                                        | [optional text field](https://form-atoms-field.netlify.app/?path=/story/textfield--optional)                     |
| `optional: true`             | `required: false` (computed) | Default behavior for optional field, no need for the prop.                           | [optional text field](https://form-atoms-field.netlify.app/?path=/story/textfield--optional)                     |

Note, that this is reflected in our storybook examples. The `required` prop is enabled as story control only for `Required` stories.
For the `Optional` stories, you won't see the `required prop` control, as it would have no effect.

### SelectField

| prop                  | Default                     | Description                                      |
| --------------------- | --------------------------- | ------------------------------------------------ |
| `placeholder: string` | `"Please select an option"` | Sets label on fake placeholder = disabled option |
