import { InputField, fieldAtom } from "form-atoms";

import { AddButtonProps, ListField, RemoveButtonProps } from "./ListField";
import { listField, textField } from "../../fields";
import { formStory, meta } from "../../scenarios/StoryForm";
import { FieldLabel } from "../field-label";

export default {
  ...meta,
  title: "components/ListField",
};

export const Primary = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "The list field enables you to capture list of items with the same attributes. It offers `add`, `remove` & `move` callbacks to manage the list items.",
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
        AddButton={({ add }) => (
          <button type="button" className="outline" onClick={add}>
            Add environment variable
          </button>
        )}
        RemoveButton={RemoveButton}
      >
        {({ fields, RemoveButton }) => (
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
            <RemoveButton />
          </div>
        )}
      </ListField>
    ),
  },
});

export const ListOfPrimitiveValues = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "Your `listField` builder can produce plain field atoms, as opposed to the common `FormFields` object. This is usefull when you want to capture list of primitives, e.g. `string[]` or `number[]`. For example we can capture list of pros (and cons) as if in eshop product review:",
      },
    },
  },
  args: {
    fields: {
      benefits: listField({
        value: ["quality materials used", "not so heavy"],
        builder: (value) => textField({ value }),
      }),
    },
    children: ({ fields }) => (
      <>
        <label style={{ marginBottom: 16 }}>
          What do you like about the product?
        </label>
        <ListField
          field={fields.benefits}
          AddButton={AddButton}
          RemoveButton={RemoveButton}
        >
          {({ fields, RemoveButton }) => (
            <div
              style={{
                display: "grid",
                gridGap: 16,
                gridTemplateColumns: "auto min-content",
              }}
            >
              <InputField atom={fields} component="input" />
              <RemoveButton />
            </div>
          )}
        </ListField>
      </>
    ),
  },
});

export const EmptyRenderProp = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "Provide `Empty` render prop, to render a blank slate when the list is empty.",
      },
    },
  },
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
          AddButton={AddHobbyButton}
          RemoveButton={RemoveButton}
          Empty={() => (
            <article>
              <p style={{ textAlign: "center" }}>
                You don't have any hobbies in your list. Start by adding your
                first one.
              </p>
            </article>
          )}
        >
          {({ fields, RemoveButton }) => (
            <div
              style={{
                display: "grid",
                gridGap: 16,
                gridTemplateColumns: "auto min-content",
              }}
            >
              <InputField atom={fields} component="input" />
              <RemoveButton />
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
      hobbies: listField({
        value: ["gardening"],
        builder: (value) => textField({ value }),
      }),
    },
    children: ({ fields }) => (
      <ListField
        field={fields.hobbies}
        AddButton={AddHobbyButton}
        RemoveButton={RemoveButton}
      >
        {({ fields, RemoveButton, add, item }) => (
          <div
            style={{
              display: "grid",
              gridGap: 16,
              gridTemplateColumns: "auto min-content min-content",
            }}
          >
            <InputField atom={fields} component="input" />
            <button type="button" className="outline" onClick={() => add(item)}>
              Prepend
            </button>
            <RemoveButton />
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
        AddButton={AddHobbyButton}
        RemoveButton={RemoveButton}
      >
        {({ fields, RemoveButton, moveDown, moveUp }) => (
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
            <RemoveButton />
          </div>
        )}
      </ListField>
    ),
  },
});

export const NestedListField = formStory({
  args: {
    fields: {
      users: listField({
        name: "users",
        value: [
          {
            name: "Jerry",
            lastName: "Park",
            accounts: [{ iban: "SK89 7500 0000 0000 1234 5671" }],
          },
        ],
        builder: ({ name, lastName, accounts = [] }) => ({
          name: fieldAtom({ value: name }),
          lastName: fieldAtom({ value: lastName }),
          accounts: listField({
            name: "accounts",
            value: accounts,
            builder: ({ iban }) => ({ iban: textField({ value: iban }) }),
          }),
        }),
      }),
    },
    children: ({ fields }) => (
      <ListField
        field={fields.users}
        AddButton={({ add }) => (
          <button type="button" className="outline" onClick={add}>
            Add Person
          </button>
        )}
      >
        {({ fields, index, item, remove }) => (
          <article>
            <header>
              <nav>
                <ul>
                  <li>
                    <strong>Person #{index + 1}</strong>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a
                      href="#"
                      role="button"
                      className="outline secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        remove(item);
                      }}
                    >
                      Remove
                    </a>
                  </li>
                </ul>
              </nav>
            </header>
            <div className="grid">
              <div>
                <FieldLabel field={fields.name} label="First Name" />
                <InputField
                  atom={fields.name}
                  render={(props) => <input {...props} placeholder="Name" />}
                />
              </div>
              <div>
                <FieldLabel field={fields.lastName} label="Last Name" />
                <InputField
                  atom={fields.lastName}
                  render={(props) => (
                    <input {...props} placeholder="Last Name" />
                  )}
                />
              </div>
            </div>
            <ListField
              field={fields.accounts}
              AddButton={({ add }) => (
                <button type="button" className="outline" onClick={add}>
                  Add Bank Account
                </button>
              )}
              RemoveButton={RemoveButton}
            >
              {({ fields, index, RemoveButton: RemoveIban }) => (
                <>
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
                    <RemoveIban />
                  </div>
                </>
              )}
            </ListField>
          </article>
        )}
      </ListField>
    ),
  },
});

const AddHobbyButton = ({ add }: AddButtonProps) => (
  <button type="button" className="outline" onClick={add}>
    Add hobby
  </button>
);

const RemoveButton = ({ remove }: RemoveButtonProps) => (
  <button type="button" className="outline secondary" onClick={remove}>
    Remove
  </button>
);

const AddButton = ({ add }: AddButtonProps) => (
  <button type="button" className="outline" onClick={add}>
    Add item
  </button>
);
