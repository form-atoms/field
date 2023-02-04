import { action } from "@storybook/addon-actions";
import { Button } from "flowbite-react";
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
    className="flex flex-col gap-4"
  >
    {children}
    <div>
      <Button type="submit">Submit</Button>
    </div>
  </form>
);
