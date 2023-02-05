import { fieldAtom, FieldAtom, FieldAtomConfig } from "form-atoms";
import { ChangeEvent, useMemo } from "react";
import { LastFieldProps } from "../last-field";
import { useLastFieldProps } from "../last-field";

export type FileFieldAtom = FieldAtom<FileList>;

export type FileFieldProps = LastFieldProps<FileFieldAtom>;

const getFiles = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.files ?? undefined;

export function useFileFieldProps(field: FileFieldAtom) {
  const props = useLastFieldProps(field, getFiles);

  return useMemo(() => props, [props]);
}

const emptyFileList = () => {
  const input = document.createElement("input");
  input.type = "file";

  // will be problem with SSR
  return input.files!;
};

export const fileFieldAtom = (config?: Partial<FieldAtomConfig<FileList>>) =>
  fieldAtom({ ...config, value: emptyFileList() });
