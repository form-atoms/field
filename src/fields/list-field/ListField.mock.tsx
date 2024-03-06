import { List, type ListProps } from "@form-atoms/list-atom";
import type { FormFields } from "form-atoms";
import type { ReactNode } from "react";

import { FieldLabel } from "../../components";
import { PicoFieldErrors } from "../../scenarios/PicoFieldErrors";

export const ListField = <Fields extends FormFields, Value>({
  atom,
  label,
  ...listProps
}: {
  label: ReactNode;
} & ListProps<Fields, Value>) => {
  return (
    <>
      <FieldLabel field={atom} label={label} />
      <List atom={atom} {...listProps} />
      <PicoFieldErrors field={atom} />
    </>
  );
};
