import { InputHTMLAttributes, ReactNode } from "react";

import { FilesField } from "./filesField";
import { FieldErrors, FieldLabel } from "../../components";
import { useFilesFieldProps } from "../../hooks/";

export const FilesInput = ({
  field,
  label,
  ...inputProps
}: {
  field: FilesField;
  label: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) => {
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
