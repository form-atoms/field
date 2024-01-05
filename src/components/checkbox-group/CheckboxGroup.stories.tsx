import { StoryObj } from "@storybook/react";

import { CheckboxGroup } from "./CheckboxGroup";
import { CheckboxGroupField } from "./CheckboxGroupField.mock";
import { stringArrayField } from "../../fields";
import { UseCheckboxGroupProps, ZodArrayField } from "../../hooks";
import { StoryForm } from "../../scenarios/StoryForm";

const languagesOptions = [
  { name: "Pascal", key: "pascal" },
  { name: "Typescript", key: "ts" },
  { name: "React", key: "react" },
  { name: "English", key: "en" },
  { name: "Holy C", key: "hc" },
  { name: "Tensorflow", key: "tf" },
  { name: "Na'vi", key: "navi" },
];

type Language = (typeof languagesOptions)[number];

const meta = {
  component: CheckboxGroup,
  title: "components/CheckboxGroup",
  args: {
    options: languagesOptions,
    getValue: ({ key }: Language) => key,
    getLabel: ({ name }: Language) => name,
  },
};

export default meta;

const checkboxGroupStory = <Option, Field extends ZodArrayField>(
  storyObj: {
    args: Pick<UseCheckboxGroupProps<Option, Field>, "field"> &
      Omit<Partial<UseCheckboxGroupProps<Option, Field>>, "field">;
  } & Omit<StoryObj<typeof meta>, "args">,
) => ({
  ...storyObj,
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
