import { ChangeEvent } from "react";

import { StringFieldAtom } from "./stringField";
import { useFieldProps } from "../../hooks";

const getEventValue = (
  event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
) => event.target.value || undefined;

// TODO: Coerce primitives & make generic
export const useSelectFieldProps = (field: StringFieldAtom) =>
  useFieldProps<string | undefined, HTMLSelectElement | HTMLInputElement>(
    field,
    getEventValue
  );
