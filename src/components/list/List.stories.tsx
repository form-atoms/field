import { StoryObj } from "@storybook/react";
import { InputField } from "form-atoms";

import { AddButtonProps, List, ListProps, RemoveButtonProps } from "./List";
import { ListField } from "./ListField.mock";
import { ListAtomItems, ListAtomValue } from "../../atoms/list-atom";
import {
  type ListField as TListField,
  listField,
  textField,
} from "../../fields";
import { PicoFieldName } from "../../scenarios/PicoFieldName";
import { StoryForm } from "../../scenarios/StoryForm";
import { FieldLabel } from "../field-label";

const RemoveButton = ({ remove }: RemoveButtonProps) => (
  <button type="button" className="outline secondary" onClick={remove}>
    Remove
  </button>
);

const AddButton = ({ add }: AddButtonProps) => (
  <button type="button" className="outline" onClick={() => add()}>
    Add item
  </button>
);

const meta = {
  component: List,
  title: "components/List",
  args: {
    AddButton,
    RemoveButton,
  },
};

export default meta;

const AddHobbyButton = ({ add }: AddButtonProps<any>) => (
  <button type="button" className="outline" onClick={() => add()}>
    Add hobby
  </button>
);

const listStory = <Fields extends ListAtomItems>(
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

export const ListOfObjects = listStory({
  parameters: {
    docs: {
      description: {
        story:
          "Usually the List is used to capture a list of objects like addresses or environment variables:.",
      },
    },
  },
  args: {
    field: listField({
      name: "environment",
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
        <div>
          <InputField
            atom={fields.variable}
            render={(props) => <input {...props} placeholder="Variable Name" />}
          />
          <PicoFieldName field={fields.variable} />
        </div>
        <div>
          <InputField
            atom={fields.value}
            render={(props) => (
              <input {...props} placeholder="Variable Value" />
            )}
          />
          <PicoFieldName field={fields.variable} />
        </div>
        <div>
          <RemoveButton />
        </div>
      </div>
    ),
  },
});

export const ListOfPrimitiveValues = listStory({
  parameters: {
    docs: {
      description: {
        story:
          "Your `listField` builder can produce plain field atoms, as opposed to the common `FormFields` object. This is useful when you want to capture list of primitives, e.g. `string[]` or `number[]`. For example we can capture list of pros (and cons) as if in eshop product review:",
      },
    },
  },
  args: {
    field: listField({
      name: "productReview",
      value: ["quality materials used", "not so heavy"],
      builder: (value) => textField({ value }),
    }),
    children: ({ fields, RemoveButton }) => (
      <fieldset role="group">
        <InputField atom={fields} component="input" />
        <RemoveButton />
      </fieldset>
    ),
  },
});

type ListFields<T> = T extends TListField<infer Fields, any> ? Fields : never;

const productPros = listField({
  name: "productReview",
  value: ["quality materials used", "not so heavy"],
  builder: (value) => textField({ value }),
});

export const CustomAddButton = listStory({
  parameters: {
    docs: {
      description: {
        story:
          "The `AddButton` render prop allows not only to render a custom button. It also enables you to supply custom `FormFields` object to the `add` action. This is useful when you want to create a customized list item (e.g. with initial value).",
      },
    },
  },
  args: {
    field: productPros,
    AddButton: ({ add }: AddButtonProps<ListFields<typeof productPros>>) => (
      <button
        type="button"
        className="outline"
        onClick={() => add(textField({ value: "beautiful colors" }))}
      >
        Add initialized item
      </button>
    ),
    children: ({ fields, RemoveButton }) => (
      <fieldset role="group">
        <InputField atom={fields} component="input" />
        <RemoveButton />
      </fieldset>
    ),
  },
});

export const EmptyRenderProp = listStory({
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
      <fieldset role="group">
        <InputField atom={fields} component="input" />
        <RemoveButton />
      </fieldset>
    ),
  },
});

export const Prepend = listStory({
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

export const OrderingItems = listStory({
  parameters: {
    docs: {
      description: {
        story:
          "The list items can be reordered by calling the `moveUp` and `moveDown` actions.",
      },
    },
  },
  args: {
    initialValue: ["coding", "gardening", "mountain bike"],
    field: listField({
      value: [],
      name: "hobbies",
      builder: (value) => textField({ value }),
    }),
    AddButton: AddHobbyButton,
    children: ({ fields, moveUp, moveDown, RemoveButton }) => (
      <fieldset role="group">
        <InputField atom={fields} component="input" />
        <button type="button" className="outline" onClick={moveUp}>
          Up
        </button>
        <button type="button" className="outline" onClick={moveDown}>
          Down
        </button>
        <RemoveButton />
      </fieldset>
    ),
  },
});

export const NestedList = listStory({
  parameters: {
    docs: {
      description: {
        story:
          "Since the `listField()` supports nesting, we can render `<List />` within `<List />`. As an example we capture multiple people with multiple banking accounts:",
      },
    },
  },
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
        name: textField({ value: name, name: "name" }),
        lastName: textField({ value: lastName, name: "lastName" }),
        accounts: listField({
          name: "accounts",
          value: accounts,
          builder: ({ iban }) => ({
            iban: textField({ value: iban, name: "iban" }),
          }),
        }),
      }),
    }),
    AddButton: ({ add }) => (
      <button type="button" className="outline" onClick={() => add()}>
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
            <button type="button" className="outline" onClick={() => add()}>
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

export const ComposedListField = listStory({
  parameters: {
    docs: {
      description: {
        story:
          "In practice, you will want to display List together with `FieldErrors`, `FieldLabel` or `RequirementIndicator` in a custom layout. Here is an example for a `ListField`:",
      },
    },
  },
  args: {
    field: listField({
      value: [],
      name: "hobbies",
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
  render: (props) => {
    return <ListField label="Please insert one or more hobbies:" {...props} />;
  },
});
