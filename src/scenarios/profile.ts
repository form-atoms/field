import { z } from "zod";

import { checkboxField } from "../fields/checkbox-field";
import { filesField } from "../fields/files-field";
import { numberField } from "../fields/number-field";
import { stringField } from "../fields/string-field";
import { textField } from "../fields/text-field";

export const countryOptions = [
  { code: "SK", name: "Slovak Republic" },
  { code: "CZ", name: "Czech Republic" },
] as const;

export const profileFields = {
  username: textField({
    name: "username",
    schema: z.string().min(4),
  }),
  age: numberField({
    name: "age",
    schema: z.number().min(17).max(65),
  }),
  country: stringField({ name: "country" }),
  profilePicture: filesField({ name: "profilePicture" }),
  bio: textField({
    name: "bio",
  }),
  newsletter: checkboxField({
    name: "newsletter",
  }),
  rating: numberField(),
};
