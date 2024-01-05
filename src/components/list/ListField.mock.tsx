import { ReactNode } from "react";

import { FieldErrors, FieldLabel } from "..";
import { ListAtomItems, ListAtomValue } from "../../atoms/list-atom";

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
      <div style={{ marginBottom: 16, color: "var(--del-color)" }}>
        <FieldErrors field={field} />
      </div>
    </>
  );
};
