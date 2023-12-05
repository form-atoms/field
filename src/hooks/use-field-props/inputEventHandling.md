| Input type             | Reading value         | Empty value             | Filled value type       |
| ---------------------- | --------------------- | ----------------------- | ----------------------- |
| `input[type=checkbox]` | `event.checked`       | `false`                 | `Boolean`               |
| `input[type=number]`   | `event.valueAsNumber` | `NaN`                   | `Number`                |
| `input[type=date]`     | `event.valueAsDate`   | `null`                  | `Date`                  |
| `input[type=file]`     | `event.files`         | `null`                  | `FileList`              |
| `<select multiple />`  | `event.options`       | `HTMLOptionsCollection` | `HTMLOptionsCollection` |
