import { ReactNode } from "react";

import { FileFieldAtom, fileField } from "./fileField";
import { useFileFieldProps } from "./useFileFieldProps";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/fileField",
};

const FileInput = ({
  field,
  label,
}: {
  field: FileFieldAtom;
  label: ReactNode;
}) => {
  const { value, ...props } = useFileFieldProps(field);

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      <input type="file" {...props} />
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
      attachment: fileField({
        optional: true,
      }),
    },
    children: ({ fields }) => (
      <FileInput field={fields.attachment} label="Upload attachment" />
    ),
  }),
};
