import { StoryObj } from "@storybook/react";

import { CheckboxGroup, type CheckboxGroupProps } from "./CheckboxGroup";
import { CheckboxGroupField } from "./CheckboxGroupField.mock";
import { ZodArrayField, stringArrayField } from "../../fields";
import { type Language, languageOptions } from "../../scenarios/mocks";
import { StoryForm } from "../../scenarios/StoryForm";

const meta = {
  component: CheckboxGroup,
  title: "components/CheckboxGroup",
  args: {
    options: languageOptions,
    getValue: ({ key }: Language) => key,
    getLabel: ({ name }: Language) => name,
  },
};

export default meta;

const checkboxGroupStory = <Option, Field extends ZodArrayField>(
  storyObj: {
    args: Pick<CheckboxGroupProps<Option, Field>, "field"> &
      Omit<Partial<CheckboxGroupProps<Option, Field>>, "field">;
  } & Omit<StoryObj<typeof meta>, "args">,
) => ({
  decorators: [
    (Story: () => JSX.Element) => (
      <StoryForm fields={{ field: storyObj.args.field }}>
        {() => (
          <p>
            <Story />
          </p>
        )}
      </StoryForm>
    ),
  ],
  ...storyObj,
});

export const Required = checkboxGroupStory({
  args: {
    field: stringArrayField(),
  },
});

export const Optional = checkboxGroupStory({
  args: {
    field: stringArrayField().optional(),
  },
});

export const Initialized = checkboxGroupStory({
  args: {
    field: stringArrayField().optional(),
    initialValue: ["ts", "hc"],
  },
});

export const ComposedField = checkboxGroupStory({
  args: {
    field: stringArrayField(),
  },
  render: (props) => {
    return (
      // @ts-expect-error not able to infer generics
      <CheckboxGroupField
        label="What programming languages are you proficient with?"
        {...props}
      />
    );
  },
});
