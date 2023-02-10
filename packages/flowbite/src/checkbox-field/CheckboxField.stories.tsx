import { CheckboxField } from "./CheckboxField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { checkboxField } from "@form-atoms/field";

export default {
  title: "CheckboxField",
  component: CheckboxField,
};

const termsOfService = checkboxField();
const subscribeToNewsletter = checkboxField({ optional: true });

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ termsOfService }),
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
};
