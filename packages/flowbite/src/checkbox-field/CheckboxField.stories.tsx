import { CheckboxField } from "./CheckboxField";
import { StoryForm, FormStory } from "../stories";
import { checkboxField } from "@form-atoms/field";

export default {
  title: "CheckboxField",
  component: StoryForm,
};

const termsOfService = checkboxField();
const subscribeToNewsletter = checkboxField({ optional: true });

export const Default: FormStory = {
  args: {
    fields: { termsOfService, subscribeToNewsletter },
    children: (
      <>
        <CheckboxField
          field={termsOfService}
          label="Terms of Service"
          helperText="Better read those"
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
