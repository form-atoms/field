import { digitField } from "..";
import { ListField, listFieldBuilder } from "../../components";
import { formStory, meta } from "../../scenarios/StoryForm";
import { NumberInput } from "../number-field/NumberInput.mock";

export default {
  ...meta,
  title: "fields/digitField",
};

const digitsBuilder = listFieldBuilder((value) =>
  digitField({ name: "pin-digit", value }),
);

// TODO: typing number in focused field should set the digit
// TOOD: if there is empty input after current one, focus it after digit pressed
// TODO: hide default browser UI for number input
export const PinCodeListField = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "The array items can be plain field atoms. This is usefull when you want to capture list of primitives, e.g. strings or numbers. Here our Pin Code contains `FieldAtom<number>` items.",
      },
    },
  },
  args: {
    fields: {
      pinCode: digitsBuilder([1, 2, 3, 4]),
    },
    children: ({ form }) => (
      <div style={{ display: "flex" }}>
        <ListField
          form={form}
          path={["pinCode"]}
          AddItemButton={AddHobbyField}
          RemoveItemButton={RemoveButton}
          builder={digitsBuilder}
        >
          {({ fields }) => (
            <NumberInput
              style={{ width: 100 }}
              maxLength={1}
              //  @ts-expect-error digit fit number
              field={fields}
            />
          )}
        </ListField>
      </div>
    ),
  },
});

const AddHobbyField = () => <></>;

const RemoveButton = () => <></>;
