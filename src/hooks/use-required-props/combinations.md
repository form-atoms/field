| field config `optional` flag | JSX `required` prop          | UI Behavior when submitting empty form                                                   |
| ---------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| `optional: false`            | `required: true` (computed)  | Default behavior for required field. Displays the native 'field required' browser popup. |
| `optional: false`            | `required: false` (manual)   | Manually opt-out of the native browser popup. Renders error message instead.             |
| `optional: true`             | `required: true` (manual)    | ⚠️ The JSX prop is ignored (invalid state) ⚠️                                            |
| `optional: true`             | `required: false` (computed) | Default behavior for optional field, no need for the prop.                               |
