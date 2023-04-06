import { ChangeEvent } from "react";

import { FileField } from "./fileField";
import { FieldProps, useFieldProps } from "../../hooks";

export type FileFieldProps = FieldProps<FileField>;

const getFiles = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.files ? Array.from(event.target.files) : undefined;

export const useFileFieldProps = (field: FileField) =>
  useFieldProps(field, getFiles);
