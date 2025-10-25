import type { ChangeEvent } from "react";
import type { UseFieldOptions } from "form-atoms";

import { type FieldProps, useFieldProps } from "../";
import type { FilesField, FilesFieldValue } from "../../fields";

// Usually we don't have File objects ready, when an item is being edited.
// So the initialValue is not needed for the filesField
export type FilesFieldProps = Omit<FieldProps<FilesField>, "initialValue">;

const getFiles = (event: ChangeEvent<HTMLInputElement>) =>
  Array.from(event.currentTarget.files ?? []);

export const useFilesFieldProps = (
  field: FilesField,
  options?: Omit<UseFieldOptions<FilesFieldValue>, "initialValue">,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { value, ...props } = useFieldProps(field, getFiles, options);

  return { ...props, type: "file" as const };
};
