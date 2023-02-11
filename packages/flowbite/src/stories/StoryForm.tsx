import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "flowbite-react";
import { formAtom, FormFields, useForm, UseForm } from "form-atoms";
import { PropsWithChildren, useMemo } from "react";

export const StoryForm = ({
  fields,
  children,
}: PropsWithChildren<{ fields: FormFields }>) => {
  const form = useMemo(() => formAtom(fields), [] )

  const { submit, reset } = useForm(form);

  return (
    <form
      onSubmit={submit((values) => {
        action("submit")(values);
      })}
      className="flex flex-col gap-4"
    >
      {children}
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button color="gray" onClick={reset}>Reset</Button>
      </div>
    </form>
  );
};

export const meta = {
  component: StoryForm,
} satisfies Meta<typeof StoryForm>;

export type FormStory = StoryObj<typeof meta>;
