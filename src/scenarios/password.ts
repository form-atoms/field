import { zodValidate } from "form-atoms/zod";
import { z } from "zod";

import { textField } from "../fields/text-field";

export const passwordInitial = textField({
  schema: z.string().min(6),
});

export const password = textField({
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
