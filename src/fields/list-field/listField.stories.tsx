import {
  AddButtonProps,
  List,
  ListProps,
  RemoveButtonProps,
} from "@form-atoms/list-atom";
import { StoryObj } from "@storybook/react";
import { FormFields, InputField } from "form-atoms";

import { ListField } from "./ListField.mock";
import { listField, textField } from "..";
import { StoryForm } from "../../scenarios/StoryForm";

const meta = {
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
  ...storyObj,
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
