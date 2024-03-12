import { filesField } from "./filesField";
import { FilesInput } from "./FilesInput.mock";
import { formStory, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/filesField",
};

export const Required = formStory({
  args: {
    fields: {
      profilePic: filesField(),
    },
    children: ({ fields }) => (
      <FilesInput field={fields.profilePic} label="Your avatar" />
    ),
  },
});

export const Optional = formStory({
  args: {
    fields: {
      attachment: filesField().optional(),
    },
    children: ({ fields }) => (
      <FilesInput field={fields.attachment} label="Upload attachment" />
    ),
  },
});

export const MultipleMax3 = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "Pass a custom schema function to extend the default schema to limit min/max number of files. Here, we add `{schema: (s) => s.max(3)}` to the field config.",
      },
    },
  },
  args: {
    fields: {
      attachments: filesField({
        schema: (s) => s.max(3),
      }),
    },
    children: ({ fields }) => (
      <FilesInput
        field={fields.attachments}
        label="Upload attachments (max 3)"
        multiple
      />
    ),
  },
});
