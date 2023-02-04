import { Stack, Button } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import { FormFields, UseForm } from "form-atoms";
import { PropsWithChildren } from "react";

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
