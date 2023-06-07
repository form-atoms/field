### Fields

#### Primitives

|                                                         |                                                                                               |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [booleanField()](?path=/docs/fields-booleanfield--docs) | 3-state checkbox with `true`, `false` or `undefined` value.                                   |
| [dateField()](?path=/docs/fields-datefield--docs)       | A field to hold a `Date` value.                                                               |
| [numberField()](?path=/docs/fields-numberfield--docs)   | A field to hold a `number` value.                                                             |
| [stringField()](?path=/docs/fields-stringfield--docs)   | A generic field to hold one of options. Compatible with `<select>` or `<input type="radio">`. |

#### Advanced

|                                                                         |                                                                                         |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [arrayField()](?path=/docs/fields-arrayfield--docs)                     | A generic field to hold options of multi-choice inputs.                                 |
| [checkboxField()](?path=/docs/fields-checkboxfield--docs#checkboxfield) | A true boolean 2-state checkbox field.                                                  |
| [filesField()](?path=/docs/fields-filesfield--docs)                     | A field to hold a `File[]` value.                                                       |
| [textField()](?path=/docs/fields-textfield--docs)                       | A field to hold a `string` value compatible with `<input type="text">` or `<textarea>`. |

### Components

|                                                                           |                                                                                      |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [CheckboxGroup](?path=/docs/components-checkboxgroup--docs)               | Select multiple values from a list of generic options via `<input type="checkbox">`. |
| [FieldErrors](?path=/docs/components-fielderrors--docs)                   | A headless component providing the field errors.                                     |
| [FieldLabel](?path=/docs/components-fieldlabel--docs)                     | A headless component with accessible label.                                          |
| [ListField](?path=/docs/components-listfield--docs)                       | An advanced headless component to control `FieldAtom<>[]` or `FormFields[]`.         |
| [MultiSelect](?path=/docs/components-multiselect--docs)                   | Select multiple values via `<select multiple>`.                                      |
| [RadioGroup](?path=/docs/components-radiogroup--docs)                     | Select a generic option via `<input type="radio">`.                                  |
| [RequirementIndicator](?path=/docs/components-requirementindicator--docs) | Displays an indicator whether a field is required or optional.                       |
| [Select](?path=/docs/components-select--docs)                             | Select a generic option via `<select>`.                                              |

### Hooks

|                                                                            |                                                                                          |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [useClearInputAction](?path=/docs/hooks-useclearinputaction--docs)         | Hook providing action to clear input value via its ref.                                  |
| [useClearFileInputEffect](?path=/docs/hooks-useclearfileinputeffect--docs) | An effect hook to clear file input when its field is reset.                              |
| [useOptions](?path=/docs/hooks-useoptions--docs)                           | A data hook to evaluate which of option(s) is(are) active with respect to a field.       |
| [useSelectOptions](?path=/docs/hooks-useselectoptions--docs)               | An extension of `useOptions` hook which returns `<option>` elements instead of raw data. |
| [useOptionFieldProps](?path=/docs/hooks-useoptionfieldprops--docs)         | A generic hook to manage a field holding active option from primitive options.           |
| [useRequiredProps](?path=/docs/hooks-userequiredprops--docs)               | Provides the `required` prop for input based on field optionality.                       |
