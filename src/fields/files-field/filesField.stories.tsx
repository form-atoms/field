import { z } from "zod";

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

export const Multiple = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "Pass custom schema to field config e.g. `z.array(z.instanceof(File)).nonempty().max(2)` to limit min/max number of files.",
      },
    },
  },
  args: {
    fields: {
      attachments: filesField({
        schema: z.array(z.instanceof(File)).nonempty().max(2),
      }),
    },
    children: ({ fields }) => (
      <FilesInput
        field={fields.attachments}
        label="Upload attachments (max 2)"
        multiple
      />
    ),
  },
});
