import { fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";

import { ArrayField } from "./ArrayField";
import { ImageField } from "../image-field";
import { FormStory, VariantProps, meta } from "../stories";

export default {
  title: "ArrayField",
  ...meta,
};

type Image = {
  id: string;
  url: string;
};

const imageBuilder = (
  { id, url }: Image | undefined = {
    id: "",
    url: "",
  }
) =>
  fieldAtom<Image>({
    value: { id, url },
    validate: zodValidate(
      z.object({
        url: z.string(),
        id: z.string().cuid(),
      }),
      {
        on: "change",
      }
    ),
  });

const fields = {
  images: [
    fieldAtom({
      value: { id: "1", url: "https://" },
    }),
    fieldAtom({
      value: { id: "2", url: "https://" },
    }),
  ],
};

export const ImageUploadArrayField: FormStory = {
  args: {
    fields,
    children: ({ form }: VariantProps<typeof fields>) => (
      <ArrayField path={["images"]} form={form} builder={imageBuilder}>
        {({ fields, index }) => <ImageField key={index} field={fields} />}
      </ArrayField>
    ),
  },
};
