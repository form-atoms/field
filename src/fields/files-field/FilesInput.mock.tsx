import { InputHTMLAttributes } from "react";

import { FieldLabel } from "../../components";
import { type FilesFieldProps, useFilesFieldProps } from "../../hooks";
import { PicoFieldErrors } from "../../scenarios/PicoFieldErrors";

export const FilesInput = ({
  field,
  label,
  ...inputProps
}: FilesFieldProps & InputHTMLAttributes<HTMLInputElement>) => {
  const props = useFilesFieldProps(field);

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      <input {...inputProps} {...props} />
      <div>
        <PicoFieldErrors field={field} />
      </div>
    </div>
  );
};
