import { ReactNode } from "react";

import { CheckboxFieldAtom, checkboxField } from "./checkboxField";
import { useCheckboxFieldProps } from "./useCheckboxFieldProps";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { FormStory, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "checkboxField",
};

const CheckboxInput = ({
  field,
  label,
}: {
  field: CheckboxFieldAtom;
  label: ReactNode;
}) => {
  const props = useCheckboxFieldProps(field);

  return (
    <div style={{ margin: "20px 0" }}>
      <input type="checkbox" {...props} />
      <FieldLabel field={field} label={label} />
      <div>
        <FieldErrors field={field} />
      </div>
    </div>
  );
};

export const Required: FormStory = {
  args: {
    fields: {
      termsOfService: checkboxField({
        name: "tos",
        required_error: "Please accept the terms of service to proceed.",
      }),
    },
    children: ({ fields }) => (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <CheckboxInput field={fields.termsOfService} label="Terms of Service" />
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
};

export const Optional: FormStory = {
  args: {
    fields: {
      newsletter: checkboxField({
        optional: true,
      }),
    },
    children: ({ fields }) => (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <CheckboxInput
        field={fields.newsletter}
        label="Subscribe to newsletter"
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Optional checkboxField will have true or false value in the submit data.",
      },
    },
  },
};
