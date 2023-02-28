import { Meta, StoryObj } from "@storybook/react";
import { FormFields, formAtom, useForm, useFormActions } from "form-atoms";
import { useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

export const StoryForm = <Fields extends FormFields>({
  fields,
  children,
}: { fields: Fields } & RenderProp<{ fields: Fields }>) => {
  const form = useMemo(() => formAtom(fields), []);
  const { reset, submit } = useFormActions(form);
  const { fieldAtoms } = useForm(form);

  return (
    <form
      onSubmit={submit((values) => {
        window.alert(JSON.stringify(values));
      })}
    >
      {children({ fields: fieldAtoms as Fields })}
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
