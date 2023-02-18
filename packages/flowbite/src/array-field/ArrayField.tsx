import {
  ArrayFieldProps,
  ArrayField as HeadlessArrayField,
} from "@form-atoms/field";
import { Button, Card, Label } from "flowbite-react";
import { FormFields } from "form-atoms";
import { ReactNode } from "react";

export const ArrayField = <
  Fields extends FormFields,
  Path extends (string | number)[]
>({
  label,
  children,
  ...arrayProps
}: ArrayFieldProps<Fields, Path> & Partial<{ label: ReactNode }>) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      {/**
       *  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
       *  @ts-ignore */}
      <HeadlessArrayField
        {...arrayProps}
        DeleteItemButton={({ remove }) => (
          <Button color="failure" onClick={remove}>
            Delete
          </Button>
        )}
        AddItemButton={({ add }) => (
          <Button color="gray" onClick={add}>
            Add Item
          </Button>
        )}
      >
        {(props) => (
          <Card>
            <div className="flex justify-between">
              {props.index}
              <props.DeleteItemButton />
            </div>
            {children(props)}
          </Card>
        )}
      </HeadlessArrayField>
    </>
  );
};
