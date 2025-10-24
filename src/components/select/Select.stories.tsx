import { StoryObj } from "@storybook/react-vite";
import { z } from "zod";

import { Select, SelectProps } from "./Select";
import { booleanField, numberField, stringField, zodField } from "../../fields";
import { type SelectField as TSelectField } from "../../hooks";
import {
  type Language,
  addresses,
  languageOptions,
} from "../../scenarios/mocks";
import { StoryForm, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  component: Select,
  args: {
    options: languageOptions,
    getValue: ({ key }: Language) => key,
    getLabel: ({ name }: Language) => name,
  },
};

const selectStory = <Option, Field extends TSelectField>(
  storyObj: {
    args: Pick<SelectProps<Option, Field>, "field"> &
      Omit<Partial<SelectProps<Option, Field>>, "field">;
  } & Omit<StoryObj<typeof meta>, "args">,
) => ({
  decorators: [
    (Story: () => JSX.Element) => (
      <StoryForm fields={{ field: storyObj.args.field }}>
        {() => <Story />}
      </StoryForm>
    ),
  ],
  ...storyObj,
});

export const RequiredString = selectStory({
  args: {
    field: stringField(),
  },
});

export const OptionalString = selectStory({
  parameters: {
    docs: {
      description: {
        story:
          "Tip: With optional field you can select an option and then clear the select by selecting the placeholder (empty).",
      },
    },
  },
  args: {
    field: stringField().optional(),
  },
});

export const Initialized = selectStory({
  parameters: {
    docs: {
      description: {
        story:
          "Field is initialized via the `initialValue` prop. It must be one of the values returned by the `getValue`",
      },
    },
  },
  args: {
    field: stringField(),
    initialValue: languageOptions[2]!.key,
  },
});

const ratingOptions = [5, 4, 3, 2, 1];

export const RequiredNumber = selectStory({
  parameters: {
    docs: {
      description: {
        story:
          "Here, options `[5, 4, 3, 2, 1]` set the value in `numberField()`.",
      },
    },
  },
  args: {
    placeholder: "How is the weather today?",
    field: numberField(),
    options: ratingOptions,
    getValue: (value) => value,
    getLabel: (value) => Array(value + 1).join("🌟"),
  },
});

const approvalOptions = [
  { label: "I approve this message", key: true },
  { label: "I have some comments", key: false },
];

export const RequiredBoolean = selectStory({
  args: {
    field: booleanField(),
    options: approvalOptions,
    getValue: ({ key }) => key,
    getLabel: ({ label }) => label,
  },
});

export const RequiredAddress = selectStory({
  name: "Required custom type (Address)",
  parameters: {
    docs: {
      description: {
        story:
          "For custom type, here `{street: string, city: string, zip: string}`, pass a custom `zodField`",
      },
    },
  },
  args: {
    placeholder: "Select delivery address",
    field: zodField({
      value: undefined,
      schema: z.object(
        {
          street: z.string(),
          city: z.string(),
          zip: z.string(),
        },
        { error: "Please select address." },
      ),
    }),
    options: addresses,
    getValue: (addr) => addr,
    getLabel: ({ street, city, zip }) => `${street}, ${city}, ${zip}`,
  },
});
