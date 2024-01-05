import { ReactNode } from "react";

import { FieldLabel } from "..";
import { ListAtomItems, ListAtomValue } from "../../atoms/list-atom";
import { PicoFieldErrors } from "../../scenarios/PicoFieldErrors";

import { List, ListProps } from ".";

export const ListField = <Fields extends ListAtomItems>({
  field,
  label,
  ...listProps
}: {
  label: ReactNode;
} & ListProps<Fields, ListAtomValue<Fields>>) => {
  return (
    <>
      <FieldLabel field={field} label={label} />
      <List field={field} {...listProps} />
      <PicoFieldErrors field={field} />
    </>
  );
};
