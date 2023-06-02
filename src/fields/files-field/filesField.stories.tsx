import type { InputHTMLAttributes, ReactNode } from "react";
import { z } from "zod";

import { FilesField, filesField } from "./filesField";
import { useFilesFieldProps } from "./useFilesFieldProps";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { useClearFileInputEffect } from "../../hooks";
import { formStory, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/filesField",
};

const FileInput = ({
  field,
  label,
  ...inputProps
}: {
  field: FilesField;
  label: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) => {
  const { value, ...props } = useFilesFieldProps(field);

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

export const Required = formStory({
  args: {
    fields: {
      profilePic: filesField(),
    },
    children: ({ fields }) => (
      <FileInput field={fields.profilePic} label="Your avatar" />
    ),
  },
});

export const Optional = formStory({
  args: {
    fields: {
      attachment: filesField().optional(),
    },
    children: ({ fields }) => (
      <FileInput field={fields.attachment} label="Upload attachment" />
    ),
  },
});

export const Multiple = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "Pass custom schema to field config e.g. `z.array(z.instanceof(File)).nonempty().max(2)` to limit min/max number of files.",
      },
    },
  },
  args: {
    fields: {
      attachments: filesField({
        schema: z.array(z.instanceof(File)).nonempty().max(2),
      }),
    },
    children: ({ fields }) => (
      <FileInput
        field={fields.attachments}
        label="Upload attachments (max 2)"
        multiple
      />
    ),
  },
});
