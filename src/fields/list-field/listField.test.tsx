import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFormSubmit,
} from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { listField } from "./listField";
import { useFieldError } from "../../hooks";
import { numberField } from "../number-field";
import { textField } from "../text-field";

describe("listField()", () => {
  describe("when required (default)", () => {
    it("can't be submitted with empty value", async () => {
      const list = listField({
        fields: () => ({ age: numberField({ value: 0 }) }),
        required_error: "List is required",
      });

      const form = formAtom({ list });

      const { result: submit } = renderHook(() => useFormSubmit(form));
      const onSubmit = vi.fn();
      await act(async () => submit.current(onSubmit)());

      expect(onSubmit).not.toHaveBeenCalled();

      const { result: error } = renderHook(() => useFieldError(list));
      expect(error.current.error).toBe("List is required");
    });

    it("has the default error when submitted empty", async () => {
      const list = listField({
        fields: () => ({ age: numberField({ value: 0 }) }),
      });

      const form = formAtom({ list });

      const { result: submit } = renderHook(() => useFormSubmit(form));
      const onSubmit = vi.fn();
      await act(async () => submit.current(onSubmit)());

      const { result } = renderHook(() => useFieldError(list));

      expect(result.current.error).toBe(
        "Array must contain at least 1 element(s)",
      );
    });
  });

  describe("when optional", () => {
    it("can submit with empty value", async () => {
      const list = listField({
        fields: () => ({ age: numberField({ value: 0 }) }),
      }).optional();

      const form = formAtom({ list });

      const { result: submit } = renderHook(() => useFormSubmit(form));
      const onSubmit = vi.fn();
      await act(async () => submit.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalled();
    });

    it("returns the same field when calling optional", () => {
      const list = listField({
        fields: () => ({ age: numberField({ value: 0 }) }),
      }).optional();

      const listRef = list.optional().optional();

      expect(listRef).toEqual(list);
    });
  });

  describe("schema", () => {
    it("extends the internal schema", async () => {
      const field = listField({
        value: [
          { email: "primary@email.com" },
          { email: "secondary@email.com" },
          { email: "other@email.com" },
        ],
        fields: () => ({
          email: textField({ value: "" }),
        }),
        schema: (s) => s.max(2),
      });

      const { result: actions } = renderHook(() => useFieldActions(field));
      const { result: errors } = renderHook(() => useFieldErrors(field));

      await act(async () => actions.current.validate());
      expect(errors.current).toEqual([
        "Array must contain at most 2 element(s)",
      ]);
    });
  });

  // describe("empty atom", () => {
  //   it("is true when values is empty array", () => {
  //     const list = listField({
  //       value: [],
  //       builder: ({ age }) => ({ age: numberField({ value: age }) }),
  //     });

  //     const { result } = renderHook(() =>
  //       useAtomValue(useAtomValue(list).empty),
  //     );

  //     expect(result.current).toBe(true);
  //   });

  //   it("is false when value contain data", () => {
  //     const list = listField({
  //       value: [{ age: 3 }],
  //       builder: ({ age }) => ({ age: numberField({ value: age }) }),
  //     });

  //     const { result } = renderHook(() =>
  //       useAtomValue(useAtomValue(list).empty),
  //     );

  //     expect(result.current).toBe(false);
  //   });
  // });

  // describe("resetting value", () => {
  //   test("nested list is reset", async () => {
  //     const users = listField({
  //       name: "users",
  //       value: [{ name: "Johnson", accounts: [] }],
  //       builder: ({ name, accounts }) => ({
  //         name: textField({ value: name }),
  //         accounts: listField({
  //           name: "bank-accounts",
  //           value: accounts,
  //           builder: (iban) => textField({ name: "iban", value: iban }),
  //         }),
  //       }),
  //     });

  //     const form = formAtom({ users });
  //     const { result: formActions } = renderHook(() => useFormActions(form));

  //     render(
  //       <List field={users}>
  //         {({ fields }) => (
  //           <List
  //             field={fields.accounts}
  //             AddButton={({ add }) => (
  //               <button onClick={() => add()} type="button">
  //                 add iban
  //               </button>
  //             )}
  //           >
  //             {({ fields }) => (
  //               <InputField
  //                 atom={fields}
  //                 render={(props) => (
  //                   <input {...props} data-testid="input-iban" />
  //                 )}
  //               />
  //             )}
  //           </List>
  //         )}
  //       </List>,
  //     );

  //     expect(screen.getByText("add iban")).toBeInTheDocument();
  //     expect(screen.queryByTestId("input-iban")).not.toBeInTheDocument();

  //     await userEvent.click(screen.getByText("add iban"));

  //     expect(screen.queryByTestId("input-iban")).toBeInTheDocument();

  //     await act(async () => formActions.current.reset());

  //     expect(screen.queryByTestId("input-iban")).not.toBeInTheDocument();
  //   });
  // });
});
