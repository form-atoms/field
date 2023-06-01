import type { InputHTMLAttributes, ReactNode } from "react";
import { z } from "zod";

import { FileField, fileField } from "./fileField";
import { useFileFieldProps } from "./useFileFieldProps";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { useClearFileInputEffect } from "../../hooks";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";
export default {
  ...meta,
  title: "fields/fileField",
};

const FileInput = ({
  field,
  label,
  ...inputProps
}: {
  field: FileField;
  label: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) => {
  const { value, ...props } = useFileFieldProps(field);

  useClearFileInputEffect(field);

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      <input type="file" {...inputProps} {...props} />
      <div>
        <FieldErrors field={field} />
      </div>
    </div>
  );
};

export const Required: FormStory = {
  args: fixArgs({
    fields: {
      profilePic: fileField(),
    },
    children: ({ fields }) => (
      <FileInput field={fields.profilePic} label="Your avatar" />
    ),
  }),
};

export const Optional: FormStory = {
  args: fixArgs({
    fields: {
      attachment: fileField().optional(),
    },
    children: ({ fields }) => (
      <FileInput field={fields.attachment} label="Upload attachment" />
    ),
  }),
};

export const Multiple: FormStory = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass custom schema to field config e.g. `z.array(z.instanceof(File)).max(2)` to limit min/max number of files.",
      },
    },
  },
  args: fixArgs({
    fields: {
      attachments: fileField({
        schema: z.array(z.instanceof(File)).max(2),
      }),
    },
    children: ({ fields }) => (
      <FileInput
        field={fields.attachments}
        label="Upload attachments (max 2)"
        multiple
      />
    ),
  }),
};
