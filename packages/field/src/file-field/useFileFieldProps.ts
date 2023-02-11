import { ChangeEvent } from "react";
import { FieldProps } from "../field";
import { useFieldProps } from "../field";
import { FileFieldAtom } from "./fileField";

export type FileFieldProps = FieldProps<FileFieldAtom>;

const getFiles = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.files ?? undefined;

export const useFileFieldProps = (field: FileFieldAtom) =>
  useFieldProps(field, getFiles);
