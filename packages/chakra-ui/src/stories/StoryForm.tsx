import { Button, Stack } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { FormAtom, FormFields, formAtom, useForm } from "form-atoms";
import { useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

export type VariantProps<Fields extends FormFields> = {
  required: boolean;
  form: FormAtom<Fields>;
};

type StoryFormProps<Fields extends FormFields> = {
  fields: Fields;
  required?: boolean;
} & RenderProp<VariantProps<Fields>>;

export const StoryForm = <Fields extends FormFields>({
  fields,
  children,
  required = true,
}: StoryFormProps<Fields>) => {
  const form = useMemo(() => formAtom(fields), []);

  const { submit, reset } = useForm(form);

  return (
    <form
      onSubmit={submit((values) => {
        action("submit")(values);
      })}
    >
      <Stack>
        {children({ required, form })}
        <Stack direction="row" spacing="3">
          <Button type="submit" colorScheme="teal">
            Submit
          </Button>
          <Button colorScheme="gray" onClick={reset}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

/**
 * Spread into story object, to disable the `required` control to prevent misleading parameter.
 */
export const optionalField = {
  argTypes: {
    required: { table: { disable: true } },
  },
};

export const meta = {
  component: StoryForm,
  args: { required: true },
  argTypes: {
    required: {
      description: "Whether browser should require", // TODO: does not work
      table: {
        type: {
          summary: "Input prop to control browser focus.",
          detail: "Does NOT relate to the form validation!",
        },
      },
    },
    fields: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof StoryForm>;

export type FormStory = StoryObj<typeof meta>;
