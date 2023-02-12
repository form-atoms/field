import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "flowbite-react";
import { FormFields, formAtom, useForm } from "form-atoms";
import { useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

type Props = {
  fields: FormFields;
  required?: boolean;
} & RenderProp<{
  required: boolean;
}>;

export const StoryForm = ({ fields, children, required = true }: Props) => {
  const form = useMemo(() => formAtom(fields), []);

  const { submit, reset } = useForm(form);

  return (
    <form
      onSubmit={submit((values) => {
        action("submit")(values);
      })}
      className="flex flex-col gap-4"
    >
      {children({ required })}
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button color="gray" onClick={reset}>
          Reset
        </Button>
      </div>
    </form>
  );
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
