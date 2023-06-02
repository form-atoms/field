import { Meta, StoryObj } from "@storybook/react";
import { FormFields, formAtom, useFormActions } from "form-atoms";
import { useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

type Props<Fields extends FormFields> = {
  fields: Fields;
  required?: boolean;
} & RenderProp<{
  fields: Fields;
  required: boolean;
}>;

export const StoryForm = <Fields extends FormFields>({
  fields,
  children,
  required = true,
}: Props<Fields>) => {
  const form = useMemo(() => formAtom(fields), []);
  const { reset, submit } = useFormActions(form);

  return (
    <form
      onSubmit={submit((values) => {
        window.alert(JSON.stringify(values));
      })}
    >
      {children({ fields, required })}
      <button>Submit</button>
      <button className="outline secondary" type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export type FormStory = StoryObj<typeof meta>;

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

// The StoryObj meta type omits the generic parameter, so the fields in children args are untyped
// this way we build the args with generic fields BEFORE the FormStory runs over it
export const formStory = <Fields extends FormFields>(
  props: {
    args: Props<Fields>;
  } & Omit<FormStory, "args">
) => props;
