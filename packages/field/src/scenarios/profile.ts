import { fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { fileField } from "../file-field";
import { numberField } from "../number-field";
import { selectFieldAtom } from "../select-field";

export const countryOptions = [
  { code: "SK", name: "Slovak Republic" },
  { code: "CZ", name: "Czech Republic" },
] as const;

export const profileFields = {
  username: fieldAtom({
    name: "username",
    value: "",
    validate: zodValidate(z.string().min(4), { on: "change" }),
  }),
  age: numberField(({ zodValidate, z }) => ({
    name: "age",
    validate: zodValidate(z.number().min(17).max(30), { on: "change" }),
  })),
  country: selectFieldAtom({ name: "country" }),
  profilePicture: fileField({ name: "profile" }),
  bio: fieldAtom({
    name: "bio",
    value: "",
    validate: zodValidate(z.string()),
  }),
  newsletter: fieldAtom({
    name: "newsletter",
    value: false,
    validate: zodValidate(z.boolean()),
  }),
  rating: numberField(),
};
