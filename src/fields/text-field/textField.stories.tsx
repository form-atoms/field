import { textField } from "./textField";
import { TextInput } from "./TextInput.mock";
import { formStory, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/textField",
};

export const Required = formStory({
  args: {
    fields: {
      name: textField({ name: "name" }),
    },
    children: ({ fields }) => (
      <TextInput field={fields.name} label="Your Name" />
    ),
  },
});

export const Optional = formStory({
  args: {
    fields: {
      nick: textField({ name: "nick" }).optional(),
    },
    children: ({ fields }) => (
      <TextInput field={fields.nick} label="Your Nick" />
    ),
  },
});

export const Initialized = formStory({
  args: {
    fields: {
      title: textField({ name: "title" }).optional(),
    },
    children: ({ fields }) => (
      <TextInput
        field={fields.title}
        label="Blog Post Title"
        initialValue="How to initialize input"
      />
    ),
  },
});

export const ExtendedSchema = formStory({
  args: {
    fields: {
      email: textField({ name: "email", schema: (s) => s.email() }),
    },
    children: ({ fields }) => (
      <TextInput field={fields.email} label="Your email" />
    ),
  },
});
