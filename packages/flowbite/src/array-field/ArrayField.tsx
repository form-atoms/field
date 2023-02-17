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
  ...arrayProps
}: ArrayFieldProps<Fields, Path> & { label: ReactNode }) => {
  return (
    <>
      {arrayProps.label && <Label>{arrayProps.label}</Label>}
      <HeadlessArrayField<Fields, Path>
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
          <>
            <Card>
              <div className="flex justify-between">
                {props.index}
                <props.DeleteItemButton />
              </div>
              {arrayProps.children(props)}
            </Card>
          </>
        )}
      </HeadlessArrayField>
    </>
  );
};
