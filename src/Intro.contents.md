### Fields

|                                                           |                                                                                               |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [checkboxField()](?path=/docs/fields-checkboxfield--docs) | A true boolean 2-state checkbox field.                                                        |
| [booleanField()](?path=/docs/fields-booleanfield--docs)   | 3-state checkbox with `true`, `false` or `undefined` value.                                   |
| [fileField()](?path=/docs/fields-filefield--docs)         | A field to hold a `FileList` value.                                                           |
| [arrayField()](?path=/docs/fields-arrayfield--docs)       | A generic field to hold multiple values of some options.                                      |
| [numberField()](?path=/docs/fields-numberfield--docs)     | A field to hold a `number` value.                                                             |
| [textField()](?path=/docs/fields-textfield--docs)         | A field to hold a `string` value compatible with `<input type="text">` or `<textarea>`.       |
| [stringField()](?path=/docs/fields-stringfield--docs)     | A generic field to hold one of options. Compatible with `<select>` or `<input type="radio">`. |

### Components

|                                                                           |                                                                |
| ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [ArrayField](?path=/docs/components-arrayfield--docs)                     | A headless component to control `FieldAtom<>[]`.               |
| [FieldErrors](?path=/docs/components-fielderrors--docs)                   | A headless component providing the field errors.               |
| [FieldLabel](?path=/docs/components-fieldlabel--docs)                     | A headless component with accessible label.                    |
| [RequirementIndicator](?path=/docs/components-requirementindicator--docs) | Displays an indicator whether a field is required or optional. |

### Hooks

|                                                                            |                                                                                    |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [useClearInputAction](?path=/docs/hooks-useclearinputaction--docs)         | Hook providing action to clear input value via its ref.                            |
| [useClearFileInputEffect](?path=/docs/hooks-useclearfileinputeffect--docs) | An effect hook to clear file input when its field is reset.                        |
| [useOptions](?path=/docs/hooks-useoptions--docs)                           | A data hook to evaluate which of option(s) is(are) active with respect to a field. |
