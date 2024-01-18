import { checkboxField } from "./checkboxField";
import { CheckboxInput } from "./CheckboxInput.mock";
import { formStory, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/checkboxField",
};

export const Required = formStory({
  args: {
    fields: {
      termsOfService: checkboxField({ name: "termsOfService" }),
    },
    children: ({ fields, required }) => (
      <CheckboxInput
        field={fields.termsOfService}
        label="Terms of Service"
        required={required}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form with an required checkboxField cannot be submitted unless the checkbox is checked.",
      },
    },
  },
});

export const Optional = formStory({
  args: {
    fields: {
      newsletter: checkboxField({ name: "newsletter" }).optional(),
    },
    children: ({ fields }) => (
      <CheckboxInput
        field={fields.newsletter}
        label="Subscribe to Newsletter"
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Optional _checkboxField_ will have `true` or `false` value in the submit data. (Never `undefined` like the _booleanField_ can)",
      },
    },
  },
});

export const Initialized = formStory({
  args: {
    fields: {
      visible: checkboxField({ name: "visible" }).optional(),
    },
    children: ({ fields }) => (
      <CheckboxInput
        field={fields.visible}
        label="Product is visible"
        initialValue={true}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example uses the `initialValue` option passed to the `useCheckboxFieldProps(field, options)`",
      },
    },
  },
});
