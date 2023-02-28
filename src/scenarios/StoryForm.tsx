import { Meta, StoryObj } from "@storybook/react";
import { FormFields, formAtom, useForm, useFormActions } from "form-atoms";
import { ReactNode, useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

type Props<Fields extends FormFields> = { fields: Fields } & RenderProp<{
  fields: Fields;
}>;

export const StoryForm = <Fields extends FormFields>({
  fields,
  children,
}: Props<Fields>) => {
  const form = useMemo(() => formAtom(fields), []);
  const { reset, submit } = useFormActions(form);

  return (
    <form
      onSubmit={submit((values) => {
        window.alert(JSON.stringify(values));
      })}
    >
      {children({ fields })}
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
} satisfies Meta<typeof StoryForm>;

// The StoryObj meta type omits the generic parameter, so the fields in children args are untyped
// this way we build the args with generic fields BEFORE the FormStory runs over it
export const fixArgs = <Fields extends FormFields>({
  fields,
  children,
}: Props<Fields>) => ({ fields, children: () => children({ fields }) });
