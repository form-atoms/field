import { selectField } from "@form-atoms/field";

export const options = [
  { code: "SK", name: "Slovak Republic" },
  { code: "CZ", name: "Czech Republic" },
] as const;

type Country = { code: string; name: string };

export const getValue = (opt: Country) => opt.code;
export const getLabel = (opt: Country) => opt.name;

export const country = selectField();
