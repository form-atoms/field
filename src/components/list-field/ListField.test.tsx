import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { InputField, formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { ListField } from "./ListField";
import { listField, numberField, textField } from "../../fields";
import { NumberInput } from "../../fields/number-field/NumberInput.mock";

describe("<ListField />", () => {
  it("works with flat list of fields", async () => {
    const fields = {
      friends: listField({
        value: ["Bob", "Alice"],
        builder: (value) => textField({ value }),
      }),
    };

    const form = formAtom(fields);
    const { result } = renderHook(() => useFormSubmit(form));
    render(
      <ListField field={fields.friends}>
        {({ fields }) => <InputField atom={fields} component="input" />}
      </ListField>,
    );

    expect(screen.getByDisplayValue("Bob")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();

    const onSubmit = vi.fn();
    await act(async () => result.current(onSubmit)());

    expect(onSubmit).toHaveBeenCalledWith({ friends: ["Bob", "Alice"] });
  });

  describe("initialValue prop", () => {
    it("is used as submit value", async () => {
      const fields = {
        friends: listField({
          value: ["Bob", "Alice"],
          builder: (value) => textField({ value }),
        }),
      };

      const form = formAtom(fields);
      const { result } = renderHook(() => useFormSubmit(form));
      render(
        <ListField field={fields.friends} initialValue={["Mark"]}>
          {({ fields }) => <InputField atom={fields} component="input" />}
        </ListField>,
      );

      const onSubmit = vi.fn();
      await act(async () => result.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalledWith({ friends: ["Mark"] });
    });
  });

  describe("RemoveButton", () => {
    it("has 'Remove' label by default", () => {
      const fields = {
        luckyNumbers: listField({
          value: [3],
          builder: (value) => numberField({ value }),
        }),
      };

      render(
        <ListField field={fields.luckyNumbers}>
          {({ RemoveButton }) => (
            <>
              <RemoveButton />
            </>
          )}
        </ListField>,
      );

      const RemoveButton = screen.getByText("Remove");

      expect(RemoveButton).toBeInTheDocument();
      expect(RemoveButton).toHaveAttribute("type", "button");
    });

    it("removes the respective list item", async () => {
      const fields = {
        luckyNumbers: listField({
          value: [3],
          builder: (value) => numberField({ value }),
        }),
      };

      render(
        <ListField field={fields.luckyNumbers}>
          {({ fields, RemoveButton }) => (
            <>
              <NumberInput field={fields} label="" /> <RemoveButton />
            </>
          )}
        </ListField>,
      );

      const RemoveButton = screen.getByText("Remove");

      expect(RemoveButton).toBeInTheDocument();
      expect(screen.queryByDisplayValue("3")).toBeInTheDocument();

      await act(() => userEvent.click(RemoveButton));

      expect(screen.queryByDisplayValue("3")).not.toBeInTheDocument();
    });
  });

  describe("AddButton", () => {
    it("has 'Add item' label by default", () => {
      const fields = {
        luckyNumbers: listField({
          value: [3, 6, 9],
          builder: (value) => numberField({ value }),
        }),
      };

      render(<ListField field={fields.luckyNumbers}>{() => <></>}</ListField>);

      const AddButton = screen.getByText("Add item");

      expect(AddButton).toBeInTheDocument();
      expect(AddButton).toHaveAttribute("type", "button");
    });

    it("appends empty item to the list by calling the item builder prop", async () => {
      const fields = {
        luckyNumbers: listField({
          value: [],
          builder: () => numberField({ value: 6 }),
        }),
      };

      render(
        <ListField field={fields.luckyNumbers}>
          {({ fields }) => (
            <>
              <NumberInput field={fields} label="lucky" />
            </>
          )}
        </ListField>,
      );

      const AddButton = screen.getByText("Add item");

      expect(AddButton).toBeInTheDocument();

      await act(() => userEvent.click(AddButton));

      expect(screen.queryByDisplayValue("6")).toBeInTheDocument();
      expect(screen.queryAllByLabelText("lucky")).toHaveLength(1);
    });
  });

  describe("Empty", () => {
    it("renders when the initial list is empty", async () => {
      const fields = {
        luckyNumbers: listField({
          value: [],
          builder: (value) => numberField({ value }),
        }),
      };

      render(
        <ListField
          field={fields.luckyNumbers}
          Empty={() => <p>No lucky numbers</p>}
        >
          {({ fields }) => (
            <>
              <NumberInput field={fields} label="" />
            </>
          )}
        </ListField>,
      );

      expect(screen.queryByText("No lucky numbers")).toBeInTheDocument();
    });
  });
});
