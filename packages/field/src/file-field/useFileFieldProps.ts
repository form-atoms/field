import { ChangeEvent } from "react";
import { LastFieldProps } from "../last-field";
import { useLastFieldProps } from "../last-field";
import { FileFieldAtom } from "./fileField";

export type FileFieldProps = LastFieldProps<FileFieldAtom>;

const getFiles = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.files ?? undefined;

export const useFileFieldProps = (field: FileFieldAtom) =>
  useLastFieldProps(field, getFiles);
