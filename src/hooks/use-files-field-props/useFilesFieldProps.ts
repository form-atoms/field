import { ChangeEvent } from "react";

import { FieldProps, useFieldProps } from "../";
import { type FilesField } from "../../fields";

export type FileFieldProps = FieldProps<FilesField>;

const getFiles = (event: ChangeEvent<HTMLInputElement>) =>
  Array.from(event.currentTarget.files ?? []);

export const useFilesFieldProps = (field: FilesField) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { value, ...props } = useFieldProps(field, getFiles);

  return props;
};
