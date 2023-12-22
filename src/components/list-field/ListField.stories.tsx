import { InputField, fieldAtom } from "form-atoms";

import {
  AddItemButtonProps,
  ListField,
  RemoveItemButtonProps,
} from "./ListField";
import { checkboxField, listField, textField } from "../../fields";
import { formStory, meta } from "../../scenarios/StoryForm";
import { FieldErrors } from "../field-errors";
import { FieldLabel } from "../field-label";
import { Radio, RadioControl } from "../radio";

export default {
  ...meta,
  title: "components/ListField",
};

export const Primary = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "The array field enables you to capture list of items with the same attributes. It offers `add` and `remove` callbacks to append new item or drop an existing one.",
      },
    },
  },
  args: {
    fields: {
      envVars: listField({
        value: [
          { variable: "GITHUB_TOKEN", value: "ff52d09a" },
          { variable: "NPM_TOKEN", value: "deepsecret" },
        ],
        builder: ({ variable, value }) => ({
          variable: textField({ name: "variable", value: variable }),
          value: textField({ name: "value", value: value }),
        }),
      }),
    },
    children: ({ fields }) => (
      <ListField
        field={fields.envVars}
        AddItemButton={({ add }) => (
          <button type="button" className="outline" onClick={add}>
            Add environment variable
          </button>
        )}
        RemoveItemButton={RemoveButton}
      >
        {({ fields, RemoveItemButton }) => (
          <div
            style={{
              display: "grid",
              gridGap: 16,
              gridTemplateColumns: "auto auto min-content",
            }}
          >
            <InputField
              atom={fields.variable}
              render={(props) => (
                <input {...props} placeholder="Variable Name" />
              )}
            />
            <InputField
              atom={fields.value}
              render={(props) => (
                <input {...props} placeholder="Variable Value" />
              )}
            />
            <RemoveItemButton />
          </div>
        )}
      </ListField>
    ),
  },
});

export const Flat = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "The array items can be plain field atoms. This is usefull when you want to capture list of primitives, e.g. strings or numbers. Here our list of TypeScript benefits contains `FieldAtom<string>` items.",
      },
    },
  },
  args: {
    fields: {
      benefits: listField({
        value: ["safe function calls", "it's fast"],
        builder: (value) => textField({ name: "ts-benefit", value }),
      }),
    },
    children: ({ fields }) => (
      <>
        <label style={{ marginBottom: 16 }}>
          What are some benefits of TypeScript?
        </label>
        <ListField
          field={fields.benefits}
          AddItemButton={({ add }: AddItemButtonProps) => (
            <button type="button" className="outline" onClick={add}>
              Add Benefit
            </button>
          )}
          RemoveItemButton={RemoveButton}
        >
          {({ fields, RemoveItemButton }) => (
            <div
              style={{
                display: "grid",
                gridGap: 16,
                gridTemplateColumns: "auto min-content",
              }}
            >
              <InputField atom={fields} component="input" />
              <RemoveItemButton />
            </div>
          )}
        </ListField>
      </>
    ),
  },
});

export const Empty = formStory({
  args: {
    fields: {
      hobbies: listField({
        value: [],
        builder: (value) => textField({ value }),
      }),
    },
    children: ({ fields }) => (
      <>
        <ListField
          field={fields.hobbies}
          AddItemButton={AddHobbyField}
          RemoveItemButton={RemoveButton}
          Empty={() => (
            <p>
              You don't have any hobbies in your list. Start by adding the
              first.
            </p>
          )}
        >
          {({ fields, RemoveItemButton }) => (
            <div
              style={{
                display: "grid",
                gridGap: 16,
                gridTemplateColumns: "auto min-content min-content",
              }}
            >
              <InputField atom={fields} component="input" />
              <RemoveItemButton />
            </div>
          )}
        </ListField>
        <FieldErrors field={fields.hobbies} />
      </>
    ),
  },
});

export const Prepend = formStory({
  parameters: {
    docs: {
      description: {
        story: "New list items can be prepended to any of the existing items.",
      },
    },
  },
  args: {
    fields: {
      hobbies: listField({
        value: ["gardening"],
        builder: (value) => textField({ value }),
      }),
    },
    children: ({ fields }) => (
      <ListField
        field={fields.hobbies}
        AddItemButton={AddHobbyField}
        RemoveItemButton={RemoveButton}
      >
        {({ fields, RemoveItemButton, add, atom }) => (
          <div
            style={{
              display: "grid",
              gridGap: 16,
              gridTemplateColumns: "auto min-content min-content",
            }}
          >
            <InputField atom={fields} component="input" />
            <button type="button" className="outline" onClick={() => add(atom)}>
              Prepend
            </button>
            <RemoveItemButton />
          </div>
        )}
      </ListField>
    ),
  },
});

export const Ordering = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "Items can be reordered by calling the moveUp and moveDown actions.",
      },
    },
  },
  args: {
    fields: {
      hobbies: listField({
        value: ["gardening"],
        builder: (value) => textField({ value }),
      }),
    },
    children: ({ fields }) => (
      <ListField
        field={fields.hobbies}
        AddItemButton={AddHobbyField}
        RemoveItemButton={RemoveButton}
      >
        {({ fields, RemoveItemButton, moveDown, moveUp }) => (
          <div
            style={{
              display: "grid",
              gridGap: 16,
              gridTemplateColumns: "auto min-content min-content min-content",
            }}
          >
            <InputField atom={fields} component="input" />
            <button type="button" className="outline" onClick={moveUp}>
              Up
            </button>
            <button type="button" className="outline" onClick={moveDown}>
              Down
            </button>
            <RemoveItemButton />
          </div>
        )}
      </ListField>
    ),
  },
});

export const Nested = formStory({
  args: {
    fields: {
      people: listField({
        value: [
          {
            name: "Jerry",
            accounts: [{ iban: "DE10 ..." }],
          },
        ],
        builder: () => ({
          name: fieldAtom({ value: "" }),
          accounts: listField({
            value: [] as { iban: string }[],
            builder: ({ iban }) => ({ iban: textField({ value: iban }) }),
          }),
        }),
      }),
    },
    children: ({ fields }) => (
      <ListField
        field={fields.people}
        AddItemButton={({ add }) => (
          <button type="button" className="outline" onClick={add}>
            Add Person
          </button>
        )}
        RemoveItemButton={RemoveButton}
      >
        {({ fields, index, RemoveItemButton }) => (
          <>
            <div
              style={{
                display: "grid",
                gridGap: 16,
                gridTemplateColumns: "auto min-content",
              }}
            >
              <label>Person #{index + 1}</label> <RemoveItemButton />
            </div>
            <InputField
              atom={fields.name}
              render={(props) => <input {...props} placeholder="Name" />}
            />
            <ListField
              field={fields.accounts}
              AddItemButton={({ add }) => (
                <button type="button" className="outline" onClick={add}>
                  Add Bank Account
                </button>
              )}
              RemoveItemButton={RemoveButton}
            >
              {({ fields, index, RemoveItemButton }) => (
                <div style={{ marginLeft: 48 }}>
                  <label>Account #{index + 1}</label>
                  <div
                    style={{
                      display: "grid",
                      gridGap: 16,
                      gridTemplateColumns: "auto min-content",
                    }}
                  >
                    <InputField
                      atom={fields.iban}
                      render={(props) => (
                        <input {...props} placeholder="IBAN" />
                      )}
                    />
                    <RemoveItemButton />
                  </div>
                </div>
              )}
            </ListField>
          </>
        )}
      </ListField>
    ),
  },
});

export const WithRadioControl = formStory({
  args: {
    fields: {
      phones: listField({
        value: [
          {
            number: "+421 200 300 500",
            isPrimary: true,
          },
        ],
        builder: ({ number }) => ({
          number: fieldAtom({ value: number }),
          isPrimary: checkboxField({ name: "primaryPhone" }).optional(),
        }),
      }),
    },
    children: ({ fields }) => (
      <RadioControl>
        {({ control }) => (
          <ListField
            field={fields.phones}
            AddItemButton={({ add }) => (
              <button type="button" className="outline" onClick={add}>
                Add contact phone
              </button>
            )}
            RemoveItemButton={RemoveButton}
          >
            {({ fields, RemoveItemButton }) => (
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

                  <RemoveItemButton />
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

// This is a button that immutably pushes a new field atom to the hobbies array
const AddHobbyField = ({ add }: AddItemButtonProps) => (
  <button type="button" className="outline" onClick={add}>
    Add hobby
  </button>
);

// This is a button that removes current field atom from the hobbies array
const RemoveButton = ({ remove }: RemoveItemButtonProps) => (
  <button type="button" className="outline secondary" onClick={remove}>
    Remove
  </button>
);
