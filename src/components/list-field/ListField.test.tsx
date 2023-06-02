import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField, formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { ListField } from "./ListField";
import { numberField, textField } from "../../fields";
import { NumberInput } from "../../fields/number-field/NumberInput";

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

    it("removes the respective list item", async () => {
      const form = formAtom({
        luckyNumbers: [numberField({ value: 3 })],
      });

      render(
        <ListField
          path={["luckyNumbers"]}
          form={form}
          builder={() => numberField()}
        >
          {({ fields, RemoveItemButton }) => (
            <>
              <NumberInput field={fields} label="" /> <RemoveItemButton />
            </>
          )}
        </ListField>
      );

      const removeItemButton = screen.getByText("Remove");

      expect(removeItemButton).toBeInTheDocument();
      expect(screen.queryByDisplayValue("3")).toBeInTheDocument();

      await act(() => userEvent.click(removeItemButton));

      expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument();
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

    it("appends empty item to the list by calling the item builder prop", async () => {
      const form = formAtom({
        luckyNumbers: [numberField({ value: 3 })],
      });

      const builder = vi.fn(() => numberField({ value: 6 }));

      render(
        <ListField path={["luckyNumbers"]} form={form} builder={builder}>
          {({ fields }) => (
            <>
              <NumberInput field={fields} label="lucky" />
            </>
          )}
        </ListField>
      );

      const addItemButton = screen.getByText("Add item");

      expect(addItemButton).toBeInTheDocument();

      await act(() => userEvent.click(addItemButton));

      expect(builder).toHaveBeenCalledOnce();
      expect(screen.queryByDisplayValue("6")).toBeInTheDocument();
      expect(screen.queryAllByLabelText("lucky")).toHaveLength(2);
    });
  });
});
