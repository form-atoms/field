import { ReactNode } from "react";

import { NumberFieldAtom, numberField } from "./numberField";
import { useNumberFieldProps } from "./useNumberFieldProps";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/numberField",
};

const NumberInput = ({
  field,
  label,
}: {
  field: NumberFieldAtom;
  label: ReactNode;
}) => {
  const props = useNumberFieldProps(field);

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      <input type="number" {...props} />
      <div>
        <FieldErrors field={field} />
      </div>
    </div>
  );
};

export const Required: FormStory = {
  args: fixArgs({
    fields: {
      profilePic: numberField(),
    },
    children: ({ fields }) => (
      <NumberInput field={fields.profilePic} label="Your height" />
    ),
  }),
};

export const Optional: FormStory = {
  args: fixArgs({
    fields: {
      attachment: numberField({
        optional: true,
      }),
    },
    children: ({ fields }) => (
      <NumberInput field={fields.attachment} label="Pet count" />
    ),
  }),
};
