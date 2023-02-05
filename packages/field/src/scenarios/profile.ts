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
    value: "",
    validate: zodValidate(z.string().min(4), { on: "change" }),
  }),
  age: fieldAtom({
    value: 0,
    validate: zodValidate(z.number().min(17), { on: "change" }),
  }),
  country: fieldAtom({
    value: "SK",
  }),
  profilePicture: fileFieldAtom(),
  bio: fieldAtom({
    value: "",
    validate: zodValidate(z.string()),
  }),
  newsletter: fieldAtom({
    value: false,
    validate: zodValidate(z.boolean()),
  }),
};
