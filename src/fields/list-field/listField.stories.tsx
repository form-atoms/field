import type { StoryObj } from "@storybook/react-vite";

import {
  createList,
  type ListAtom,
  type ListComponents,
} from "@form-atoms/list-atom";
import { FormFields, InputField } from "form-atoms";

import { listField, textField } from "..";
import { StoryForm } from "../../scenarios/StoryForm";
import { FieldLabel } from "../../components";
import { PicoFieldErrors } from "../../scenarios/PicoFieldErrors";

export const render = <Fields extends FormFields>({
  atom,
  children,
}: ListStoryArgs<Fields>) => {
  const { List } = createList(atom);

  return children({ List, atom });
};

const meta = {
  title: "fields/listField",
  render,
};

export default meta;

type ListStoryArgs<Fields extends FormFields> = {
  label?: React.ReactNode;
  hideFormActions?: boolean;
  atom: ListAtom<Fields>;
  children: (
    props: ListComponents<Fields> & {
      atom: ListAtom<Fields>;
    },
  ) => React.ReactNode;
};

export const listStory = <Fields extends FormFields>(
  storyObj: {
    args: ListStoryArgs<Fields>;
  } & Omit<StoryObj<typeof meta>, "args">,
) => ({
  decorators: [
    (Story: () => JSX.Element) => (
      <>
        {storyObj.args.label && (
          <FieldLabel field={storyObj.args.atom} label={storyObj.args.label} />
        )}
        <Story />
        <PicoFieldErrors field={storyObj.args.atom} />
      </>
    ),
    (Story: () => JSX.Element) => (
      <StoryForm fields={{ field: storyObj.args.atom }}>
        {() => <Story />}
      </StoryForm>
    ),
  ],

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
    label: "Environment variables (at least one required):",
    atom: listField({
      name: "environment",
      fields: () => ({
        variable: textField({ name: "variable", value: "" }),
        value: textField({ name: "value", value: "" }),
      }),
    }),
    children: ({ List }) => (
      <List>
        <List.Item>
          {({ fields, remove }) => (
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
                  render={(props) => (
                    <input {...props} placeholder="Variable Name" />
                  )}
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
                <button
                  type="button"
                  className="outline secondary"
                  onClick={() => remove()}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </List.Item>
        <List.Add />
      </List>
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
    label: "Environment variables (optional, can be empty):",
    atom: listField({
      name: "environment",
      fields: () => ({
        variable: textField({ name: "variable", value: "" }),
        value: textField({ name: "value", value: "" }),
      }),
    }).optional(),
    children: ({ List }) => (
      <List>
        <List.Item>
          {({ fields, remove }) => (
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
                  render={(props) => (
                    <input {...props} placeholder="Variable Name" />
                  )}
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
                <button
                  type="button"
                  className="outline secondary"
                  onClick={() => remove()}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </List.Item>
        <List.Add />
      </List>
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
    label: "Recovery phrases (1-2 required):",
    atom: listField({
      name: "recoveryPhrases",
      schema: (s) => s.max(2),
      fields: () => ({
        hint: textField({ name: "hint", value: "" }),
        phrase: textField({ name: "phrase", value: "" }),
      }),
      invalidItemError:
        "Some of your phrases are empty. Please remove or complete them.",
    }),
    children: ({ List }) => (
      <List
        initialValue={[
          {
            phrase: "pinkipinkyponky",
            hint: "favorite song (lower case; no spaces)",
          },
          {
            phrase: "cherry walnut walnut",
            hint: "trees in garden, front to back, lower case, spaced",
          },
        ]}
      >
        <List.Item>
          {({ fields, remove }) => (
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
                  render={(props) => (
                    <input {...props} placeholder="Phrase hint" />
                  )}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="outline secondary"
                  onClick={() => remove()}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </List.Item>
        <List.Add />
      </List>
    ),
  },
});
