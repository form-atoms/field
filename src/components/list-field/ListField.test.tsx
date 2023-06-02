import { act, render, renderHook, screen } from "@testing-library/react";
import { InputField, formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { ListField } from "./ListField";
import { numberField, textField } from "../../fields";

describe("<ListField />", () => {
  it("works with flat list of fields", async () => {
    const fields = {
      friends: [textField({ value: "Bryan" }), textField({ value: "Alice" })],
    };

    const form = formAtom(fields);
    const { result } = renderHook(() => useFormSubmit(form));
    render(
      <ListField path={["friends"]} form={form} builder={() => textField()}>
        {({ fields }) => <InputField atom={fields} component="input" />}
      </ListField>
    );

    expect(screen.getByDisplayValue("Bryan")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();

    const onSubmit = vi.fn();
    await act(async () => {
      result.current(onSubmit)();
    });

    expect(onSubmit).toHaveBeenCalledWith({ friends: ["Bryan", "Alice"] });
  });

  describe("RemoveItemButton", () => {
    it("has 'Remove' label by default", () => {
      const form = formAtom({
        luckyNumbers: [numberField({ value: 3 })],
      });

      render(
        <ListField
          path={["luckyNumbers"]}
          form={form}
          builder={() => numberField()}
        >
          {({ RemoveItemButton }) => (
            <>
              <RemoveItemButton />
            </>
          )}
        </ListField>
      );

      const removeItemButton = screen.getByText("Remove");

      expect(removeItemButton).toBeInTheDocument();
      expect(removeItemButton).toHaveAttribute("type", "button");
    });
  });

  describe("AddItemButton", () => {
    it("has 'Add item' label by default", () => {
      const form = formAtom({
        luckyNumbers: [numberField({ value: 3 })],
      });

      render(
        <ListField
          path={["luckyNumbers"]}
          form={form}
          builder={() => numberField()}
        >
          {() => <></>}
        </ListField>
      );

      const addItemButton = screen.getByText("Add item");

      expect(addItemButton).toBeInTheDocument();
      expect(addItemButton).toHaveAttribute("type", "button");
    });
  });
});
