import { fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { fileFieldAtom } from "../file-field";

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
  age: fieldAtom({
    name: "age",
    value: 0,
    validate: zodValidate(z.number().min(17), { on: "change" }),
  }),
  country: fieldAtom({
    name: "country",
    value: "SK",
  }),
  profilePicture: fileFieldAtom({ name: "profile" }),
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
  rating: fieldAtom({
    value: 0,
  }),
};
