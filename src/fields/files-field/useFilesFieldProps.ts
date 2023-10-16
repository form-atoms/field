import { ChangeEvent } from "react";

import { FilesField } from "./filesField";
import { FieldProps, useFieldProps } from "../../hooks";

export type FileFieldProps = FieldProps<FilesField>;

const getFiles = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.files ? Array.from(event.target.files) : [];

export const useFilesFieldProps = (field: FilesField) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { value, ...props } = useFieldProps(field, getFiles);

  return props;
};
