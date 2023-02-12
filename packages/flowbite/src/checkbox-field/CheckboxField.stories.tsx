import { checkboxField } from "@form-atoms/field";

import { CheckboxField } from "./CheckboxField";
import { FormStory, meta } from "../stories";

export default {
  title: "CheckboxField",
  ...meta,
};

const termsOfService = checkboxField();
const subscribeToNewsletter = checkboxField({ optional: true });

export const Default: FormStory = {
  args: {
    fields: { termsOfService, subscribeToNewsletter },
    children: (args) => (
      <>
        <CheckboxField
          field={termsOfService}
          label="Terms of Service"
          helperText="Better read those"
          {...args}
        />
        <CheckboxField
          field={subscribeToNewsletter}
          label="Subscribe to the newsletter"
          helperText="Get the latest news 👍"
        />
      </>
    ),
  },
};
