import { ChangeEvent } from "react";

import { FileFieldAtom } from "./fileField";
import { FieldProps, useFieldProps } from "../../hooks";

export type FileFieldProps = FieldProps<FileFieldAtom>;

const getFiles = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.files ?? undefined;

export const useFileFieldProps = (field: FileFieldAtom) =>
  useFieldProps(field, getFiles);
