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

#### Atomic Components

|                                                                           |                                                                |
| ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [FieldErrors](?path=/docs/components-fielderrors--docs)                   | A headless component providing the field errors.               |
| [FieldLabel](?path=/docs/components-fieldlabel--docs)                     | A headless component with accessible label.                    |
| [PlaceholderOption](?path=/docs/components-placeholderoption--docs)       | A special `<option>` to be rendered in an empty `<Select>`.    |
| [RequirementIndicator](?path=/docs/components-requirementindicator--docs) | Displays an indicator whether a field is required or optional. |

#### Native Generic Components

|                                                             |                                                                                      |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [CheckboxGroup](?path=/docs/components-checkboxgroup--docs) | Select multiple values from a list of generic options via `<input type="checkbox">`. |
| [ListField](?path=/docs/components-listfield--docs)         | An advanced headless component to control `FieldAtom<>[]` or `FormFields[]`.         |
| [MultiSelect](?path=/docs/components-multiselect--docs)     | Select multiple values via `<select multiple>`.                                      |
| [RadioGroup](?path=/docs/components-radiogroup--docs)       | Select a generic option via `<input type="radio">`.                                  |
| [Select](?path=/docs/components-select--docs)               | Select a generic option via `<select>`.                                              |

### Hooks

|                                                                        |                                                                                          |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [useClearInputAction](?path=/docs/hooks-useclearinputaction--docs)     | Hook providing action to clear input value via its ref.                                  |
| [useCheckboxFieldProps](?path=/docs/hooks-usecheckboxfieldprops--docs) | Adapts fields having `boolean` values to controlled checkbox inputs.                     |
| [useFilesFieldProps](?path=/docs/hooks-useFilesfieldprops--docs)       | Adapts fields having `File[]` values to controlled `input[type=file]`.                   |
| [useNumberFieldProps](?path=/docs/hooks-usenumberfieldprops--docs)     | Adapts fields having `number` values to controlled numeric inputs.                       |
| [useOptions](?path=/docs/hooks-useoptions--docs)                       | A data hook to evaluate which of option(s) is(are) active with respect to a field.       |
| [useRequiredProps](?path=/docs/hooks-userequiredprops--docs)           | Provides the `required` prop for input based on field optionality.                       |
| [useSelectFieldProps](?path=/docs/hooks-useselectfieldprops--docs)     | A generic hook to manage a field holding active option from primitive options.           |
| [useSelectOptions](?path=/docs/hooks-useselectoptions--docs)           | An extension of `useOptions` hook which returns `<option>` elements instead of raw data. |
