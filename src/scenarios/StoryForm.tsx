import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { FormAtom, FormFields, formAtom, useFormActions } from "form-atoms";
import { useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

type Props<Fields extends FormFields> = {
  fields: Fields;
  resettable?: boolean;
  required?: boolean;
} & RenderProp<{
  form: FormAtom<Fields>;
  fields: Fields;
  required: boolean;
}>;

export const StoryForm = <Fields extends FormFields>({
  resettable = true,
  fields,
  children,
  required = true,
}: Props<Fields>) => {
  const form = useMemo(() => formAtom(fields), []);
  const { reset, submit } = useFormActions(form);

  return (
    <form onSubmit={submit(action("submit"))}>
      {children({ fields, required, form })}
      <div className="grid">
        <button type="submit">Submit</button>
        {resettable && (
          <button className="secondary" type="button" onClick={reset}>
            Reset
          </button>
        )}
      </div>
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
  storyObj: {
    args: Props<Fields>;
  } & Omit<FormStory, "args">,
) => storyObj;
