import { InputField } from "form-atoms";

import { ListField, RemoveButtonProps } from "./ListField";
import { checkboxField, listField, textField } from "../../fields";
import { formStory, meta } from "../../scenarios/StoryForm";
import { FieldLabel } from "../field-label";
import { Radio, RadioControl } from "../radio";

export default {
  ...meta,
  title: "components/ListField",
};

export const Experimental_WithRadioControl = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "The item fields are regular fields and can be managed from outside. Here we have an advanced example where the `<ListField />` is wrapped in a custom `<RadioControl /`> which manages the item's primary field realized as a `booleanField()`.",
      },
    },
  },
  args: {
    fields: {
      phones: listField({
        value: [
          {
            number: "+421 200 400 600",
            isPrimary: false,
          },
          {
            number: "+420 900 700 500",
            isPrimary: true,
          },
        ],
        builder: ({ number }) => ({
          number: textField({ value: number }),
          isPrimary: checkboxField({ name: "primaryPhone" }).optional(),
        }),
      }),
    },
    children: ({ fields }) => (
      <RadioControl>
        {({ control }) => (
          <ListField
            field={fields.phones}
            AddButton={({ add }) => (
              <button type="button" className="outline" onClick={add}>
                Add contact phone
              </button>
            )}
            RemoveButton={RemoveButton}
          >
            {({ fields, RemoveButton }) => (
              <>
                <div
                  style={{
                    display: "grid",
                    gridGap: 16,
                    gridTemplateColumns: "auto min-content",
                  }}
                >
                  <InputField
                    atom={fields.number}
                    render={(props) => (
                      <input
                        {...props}
                        placeholder="Phone number in format +421 xxx xxx xxx"
                      />
                    )}
                  />

                  <RemoveButton />
                </div>
                <Radio control={control} field={fields.isPrimary}>
                  {(props) => (
                    <div style={{ marginBottom: 40 }}>
                      <input
                        {...props}
                        type="radio"
                        id={`${fields.isPrimary}`}
                      />
                      <FieldLabel
                        label="Primary, receive 2FA SMS on this phone."
                        field={fields.isPrimary}
                      />
                    </div>
                  )}
                </Radio>
              </>
            )}
          </ListField>
        )}
      </RadioControl>
    ),
  },
});

const RemoveButton = ({ remove }: RemoveButtonProps) => (
  <button type="button" className="outline secondary" onClick={remove}>
    Remove
  </button>
);
