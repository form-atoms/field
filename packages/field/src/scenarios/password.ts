import { fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";

export const passwordInitial = fieldAtom({
  value: "",
  validate: zodValidate(z.string().min(6), { on: "change" }),
});

export const password = fieldAtom({
  value: "",
  validate: zodValidate(
    (get) => {
      const initialPassword = get(get(passwordInitial).value);

      return z.string().min(6).and(z.literal(initialPassword));
    },
    {
      on: "change",
      formatError: ({ issues }) => {
        return issues.map(({ code, message }) =>
          code === "invalid_literal" ? "Passwords must match" : message
        );
      },
    }
  ),
});
