import { StoryObj } from "@storybook/react";
import { InputField } from "form-atoms";

import { AddButtonProps, List, ListProps, RemoveButtonProps } from "./List";
import { ListAtomItems, ListAtomValue } from "../../atoms/list-atom";
import { listField, textField } from "../../fields";
import { StoryForm } from "../../scenarios/StoryForm";
import { FieldLabel } from "../field-label";

const RemoveButton = ({ remove }: RemoveButtonProps) => (
  <button type="button" className="outline secondary" onClick={remove}>
    Remove
  </button>
);

const meta = {
  component: List,
  title: "components/List",
  args: {
    RemoveButton,
  },
};

export default meta;

const AddHobbyButton = ({ add }: AddButtonProps) => (
  <button type="button" className="outline" onClick={add}>
    Add hobby
  </button>
);

const AddButton = ({ add }: AddButtonProps) => (
  <button type="button" className="outline" onClick={add}>
    Add item
  </button>
);

const listFieldStory = <Fields extends ListAtomItems>(
  storyObj: {
    args: ListProps<Fields, ListAtomValue<Fields>>;
  } & Omit<StoryObj<typeof meta>, "args">,
) => ({
  ...storyObj,
  decorators: [
    (Story: () => JSX.Element) => (
      <StoryForm fields={{ field: storyObj.args.field }}>
        {() => <Story />}
      </StoryForm>
    ),
  ],
});

export const ListOfObjects = listFieldStory({
  parameters: {
    docs: {
      description: {
        story:
          "Usually the List is used to capture a list of objects like addresses or environment variables:.",
      },
    },
  },
  args: {
    AddButton,
    field: listField({
      value: [
        { variable: "GITHUB_TOKEN", value: "ff52d09a" },
        { variable: "NPM_TOKEN", value: "deepsecret" },
      ],
      builder: ({ variable, value }) => ({
        variable: textField({ name: "variable", value: variable }),
        value: textField({ name: "value", value: value }),
      }),
    }),
    children: ({ fields, RemoveButton }) => (
      <div
        style={{
          display: "grid",
          gridGap: 16,
          gridTemplateColumns: "auto auto min-content",
        }}
      >
        <InputField
          atom={fields.variable}
          render={(props) => <input {...props} placeholder="Variable Name" />}
        />
        <InputField
          atom={fields.value}
          render={(props) => <input {...props} placeholder="Variable Value" />}
        />
        <RemoveButton />
      </div>
    ),
  },
});

// TODO
{
  /* <label style={{ marginBottom: 16 }}>
What do you like about the product?
</label> */
}
export const ListOfPrimitiveValues = listFieldStory({
  parameters: {
    docs: {
      description: {
        story:
          "Your `listField` builder can produce plain field atoms, as opposed to the common `FormFields` object. This is usefull when you want to capture list of primitives, e.g. `string[]` or `number[]`. For example we can capture list of pros (and cons) as if in eshop product review:",
      },
    },
  },
  args: {
    AddButton,
    field: listField({
      value: ["quality materials used", "not so heavy"],
      builder: (value) => textField({ value }),
    }),
    children: ({ fields, RemoveButton }) => (
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
    ),
  },
});

export const EmptyRenderProp = listFieldStory({
  parameters: {
    docs: {
      description: {
        story:
          "Provide `Empty` render prop, to render a blank slate when the list is empty.",
      },
    },
  },
  args: {
    field: listField({
      value: [],
      builder: (value) => textField({ value }),
    }),
    AddButton: AddHobbyButton,
    Empty: () => (
      <article>
        <p style={{ textAlign: "center" }}>
          You don't have any hobbies in your list. Start by adding your first
          one.
        </p>
      </article>
    ),
    children: ({ fields, RemoveButton }) => (
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
    ),
  },
});

export const Prepend = listFieldStory({
  parameters: {
    docs: {
      description: {
        story: "New list items can be prepended to any of the existing items.",
      },
    },
  },
  args: {
    field: listField({
      name: "hobbies",
      value: ["gardening"],
      builder: (value) => textField({ value }),
    }),
    AddButton: AddHobbyButton,
    children: ({ fields, RemoveButton, add, item }) => (
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
    ),
  },
});

export const Ordering = listFieldStory({
  parameters: {
    docs: {
      description: {
        story:
          "Items can be reordered by calling the moveUp and moveDown actions.",
      },
    },
  },
  args: {
    field: listField({
      name: "hobbies",
      value: ["gardening"],
      builder: (value) => textField({ value }),
    }),
    AddButton: AddHobbyButton,
    children: ({ fields, RemoveButton, moveDown, moveUp }) => (
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
    ),
  },
});

export const NestedListField = listFieldStory({
  args: {
    field: listField({
      name: "users",
      value: [
        {
          name: "Jerry",
          lastName: "Park",
          accounts: [{ iban: "SK89 7500 0000 0000 1234 5671" }],
        },
      ],
      builder: ({ name, lastName, accounts = [] }) => ({
        name: textField({ value: name }),
        lastName: textField({ value: lastName }),
        accounts: listField({
          name: "accounts",
          value: accounts,
          builder: ({ iban }) => ({ iban: textField({ value: iban }) }),
        }),
      }),
    }),
    AddButton: ({ add }) => (
      <button type="button" className="outline" onClick={add}>
        Add Person
      </button>
    ),
    children: ({ fields, index, remove }) => (
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
                    remove();
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
              render={(props) => <input {...props} placeholder="Last Name" />}
            />
          </div>
        </div>
        <List
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
                  render={(props) => <input {...props} placeholder="IBAN" />}
                />
                <RemoveIban />
              </div>
            </>
          )}
        </List>
      </article>
    ),
  },
});
