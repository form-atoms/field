import { z } from "zod";

import { checkboxField } from "../checkbox-field";
import { fileField } from "../file-field";
import { numberField } from "../number-field";
import { selectField } from "../select-field";
import { textField } from "../text-field";

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
  country: selectField({ name: "country" }),
  profilePicture: fileField({ name: "profilePicture" }),
  bio: textField({
    name: "bio",
  }),
  newsletter: checkboxField({
    name: "newsletter",
  }),
  rating: numberField(),
};
