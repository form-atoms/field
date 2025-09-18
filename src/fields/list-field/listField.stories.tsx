import {
  AddButtonProps,
  List,
  ListProps,
  RemoveButtonProps,
} from "@form-atoms/list-atom";
import { StoryObj } from "@storybook/react-vite";
import { FormFields, InputField } from "form-atoms";

import { ListField } from "./ListField.mock";
import { TextField, listField, textField } from "..";
import { StoryForm } from "../../scenarios/StoryForm";

const meta = {
  title: "fields/listField",
  component: List,
  args: {
    AddButton: ({ add }: AddButtonProps) => (
      <button type="button" className="outline" onClick={() => add()}>
        Add variable
      </button>
    ),
    RemoveButton: ({ remove }: RemoveButtonProps) => (
      <button
        type="button"
        className="outline secondary"
        onClick={() => remove()}
      >
        Remove
      </button>
    ),
  },
};

export default meta;

const listStory = <Fields extends FormFields, Value>(
  storyObj: {
    args: ListProps<Fields, Value>;
  } & Omit<StoryObj<typeof meta>, "args">,
) => ({
  decorators: [
    (Story: () => JSX.Element) => (
      <StoryForm fields={{ field: storyObj.args.atom }}>
        {() => <Story />}
      </StoryForm>
    ),
  ],
  render: (props: ListProps<Fields, Value>) => {
    return <ListField label="Set your environment variables:" {...props} />;
  },
  ...storyObj,
});

export const RequiredListField = listStory({
  parameters: {
    docs: {
      description: {
        story:
          "Required `listField` (default) must have at least 1 item of valid fields. When submitted empty, the field will get the `required_error` message.",
      },
    },
  },
  args: {
    atom: listField({
      name: "environment",
      value: [],
      fields: ({ variable, value }) => ({
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
        </div>
        <div>
          <InputField
            atom={fields.value}
            render={(props) => (
              <input {...props} placeholder="Variable Value" />
            )}
          />
        </div>
        <div>
          <RemoveButton />
        </div>
      </div>
    ),
  },
});

export const OptionalListField = listStory({
  parameters: {
    docs: {
      description: {
        story: "Optional `listField` can be submitted empty.",
      },
    },
  },
  args: {
    atom: listField({
      name: "environment",
      value: [],
      fields: ({ variable, value }) => ({
        variable: textField({ name: "variable", value: variable }),
        value: textField({ name: "value", value: value }),
      }),
    }).optional(),
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
        </div>
        <div>
          <InputField
            atom={fields.value}
            render={(props) => (
              <input {...props} placeholder="Variable Value" />
            )}
          />
        </div>
        <div>
          <RemoveButton />
        </div>
      </div>
    ),
  },
});

export const RequiredListFieldWithCustomSchema = listStory({
  parameters: {
    docs: {
      description: {
        story:
          "The required list length can be constrained with custom `schema` passed to the `listField`, here `z.array(z.any()).nonempty().max(2)`.",
      },
    },
  },
  args: {
    AddButton: ({
      add,
    }: AddButtonProps<{ phrase: TextField; hint: TextField }>) => (
      <button type="button" className="outline" onClick={() => add()}>
        New phrase
      </button>
    ),
    atom: listField({
      name: "recoveryPhrases",
      value: [
        {
          phrase: "pinkipinkyponky",
          hint: "favorite song (lower case; no spaces)",
        },
        {
          phrase: "cherry walnut walnut",
          hint: "trees in garden, front to back, lower case, spaced",
        },
      ],
      schema: (s) => s.max(2),
      fields: ({ hint, phrase }) => ({
        hint: textField({ name: "hint", value: hint }),
        phrase: textField({ name: "phrase", value: phrase }),
      }),
      invalidItemError:
        "Some of your phrases are empty. Please remove or complete them.",
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
            atom={fields.phrase}
            render={(props) => (
              <input {...props} placeholder="Recovery phrase" />
            )}
          />
        </div>
        <div>
          <InputField
            atom={fields.hint}
            render={(props) => <input {...props} placeholder="Phrase hint" />}
          />
        </div>
        <div>
          <RemoveButton />
        </div>
      </div>
    ),
  },
  render: (props) => {
    return <ListField {...props} label="Specify up to 3 recovery phrases:" />;
  },
});
