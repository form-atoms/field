import { InputHTMLAttributes } from "react";

import { FieldErrors, FieldLabel } from "../../components";
import { type FilesFieldProps, useFilesFieldProps } from "../../hooks";

export const FilesInput = ({
  field,
  label,
  ...inputProps
}: FilesFieldProps & InputHTMLAttributes<HTMLInputElement>) => {
  const props = useFilesFieldProps(field);

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
