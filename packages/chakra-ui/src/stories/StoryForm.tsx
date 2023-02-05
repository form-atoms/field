import { Stack, Button } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { FormAtom, FormFields, useForm, UseForm } from "form-atoms";
import { ComponentProps, PropsWithChildren } from "react";

export const StoryForm = <T extends FormFields>({
  submit,
  children,
}: PropsWithChildren<Pick<UseForm<T>, "submit">>) => (
  <form
    onSubmit={submit((values) => {
      action("submit")(values);
    })}
  >
    <Stack spacing={6}>
      {children}
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </Stack>
  </form>
);

const ControlledForm = ({
  form,
  children,
}: PropsWithChildren<{ form: FormAtom<any> }>) => {
  const { submit } = useForm(form);

  return <StoryForm submit={submit}>{children}</StoryForm>;
};

export const Template: Story<ComponentProps<typeof ControlledForm>> =
  ControlledForm;
