import { ArrayField as HeadlessArrayField } from "@form-atoms/field";
import { Button, Card, Label } from "flowbite-react";

export const ArrayField: typeof HeadlessArrayField = ({
  label,
  children,
  AddItemButton = ({ add }: any) => (
    <Button color="gray" onClick={add}>
      Add Item
    </Button>
  ),
  ...props
}: any) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <HeadlessArrayField
        {...props}
        DeleteItemButton={({ remove }) => (
          <Button color="failure" onClick={remove}>
            Delete
          </Button>
        )}
        AddItemButton={AddItemButton}
      >
        {(props) => (
          <>
            <Card>
              <div className="flex justify-between">
                {props.index}
                <props.DeleteItemButton />
              </div>
              {children(props)}
            </Card>
          </>
        )}
      </HeadlessArrayField>
    </>
  );
};
