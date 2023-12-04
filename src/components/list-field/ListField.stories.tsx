import { InputField, fieldAtom } from "form-atoms";

import {
  AddItemButtonProps,
  ListField,
  RemoveItemButtonProps,
} from "./ListField";
import { listFieldBuilder, textField } from "../../fields";
import { checkboxField } from "../../fields/checkbox-field";
import { formStory, meta } from "../../scenarios/StoryForm";
import { FieldLabel } from "../field-label";
import { Radio, RadioControl } from "../radio";

export default {
  ...meta,
  title: "components/ListField",
};

const envVarsBuilder = listFieldBuilder(({ variable, value }) => ({
  variable: textField({ name: "variable", value: variable }),
  value: textField({ name: "value", value: value }),
}));

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
      envVars: envVarsBuilder([
        { variable: "GITHUB_TOKEN", value: "ff52d09a" },
        { variable: "NPM_TOKEN", value: "deepsecret" },
      ]),
    },
    children: ({ form }) => (
      <ListField
        form={form}
        path={["envVars"]}
        keyFrom="variable"
        builder={envVarsBuilder}
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

const typescriptBenefits = listFieldBuilder((value) =>
  textField({ name: "ts-benefit", value }),
);

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
      benefits: typescriptBenefits(["safe function calls", "it's fast"]),
    },
    children: ({ form }) => (
      <>
        <label style={{ marginBottom: 16 }}>
          What are some benefits of TypeScript?
        </label>
        <ListField
          form={form}
          path={["benefits"]}
          AddItemButton={({ add }: AddItemButtonProps) => (
            <button type="button" className="outline" onClick={add}>
              Add Benefit
            </button>
          )}
          RemoveItemButton={RemoveButton}
          builder={typescriptBenefits}
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
      hobbies: [fieldAtom({ value: "gardening" })],
    },
    children: ({ form }) => (
      <ListField
        form={form}
        path={["hobbies"]}
        AddItemButton={AddHobbyField}
        RemoveItemButton={RemoveButton}
        builder={() => fieldAtom({ value: "" })}
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
      hobbies: [fieldAtom({ value: "gardening" })],
    },
    children: ({ form }) => (
      <ListField
        form={form}
        path={["hobbies"]}
        AddItemButton={AddHobbyField}
        RemoveItemButton={RemoveButton}
        builder={() => fieldAtom({ value: "" })}
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
      people: [
        {
          name: fieldAtom({ value: "Jerry" }),
          accounts: [{ iban: fieldAtom({ value: "DE10 ..." }) }],
        },
      ],
    },
    children: ({ form }) => (
      <ListField
        form={form}
        keyFrom="name"
        path={["people"]}
        builder={() => ({
          name: fieldAtom({ value: "" }),
          accounts: [],
        })}
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
              form={form}
              keyFrom="iban"
              path={["people", index, "accounts"]}
              builder={() => ({ iban: fieldAtom({ value: "" }) })}
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
      phones: [
        {
          number: fieldAtom({ value: "+421 200 300 500" }),
          isPrimary: checkboxField({
            name: "primaryPhone",
            value: true,
          }).optional(),
        },
      ],
    },
    children: ({ form }) => (
      <RadioControl>
        {({ control }) => (
          <ListField
            form={form}
            path={["phones"]}
            keyFrom="number"
            builder={() => ({
              number: fieldAtom({ value: "" }),
              isPrimary: checkboxField({ name: "primaryPhone" }).optional(),
            })}
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
