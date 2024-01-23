import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { InputField, formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { List } from "./List";
import { listField, numberField, textField } from "../../fields";
import { NumberInput } from "../../fields/number-field/NumberInput.mock";

describe("<List />", () => {
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
      <List field={fields.friends}>
        {({ fields }) => <InputField atom={fields} component="input" />}
      </List>,
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
        <List field={fields.friends} initialValue={["Mark"]}>
          {({ fields }) => <InputField atom={fields} component="input" />}
        </List>,
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
        <List field={fields.luckyNumbers}>
          {({ RemoveButton }) => <RemoveButton />}
        </List>,
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
        <List field={fields.luckyNumbers}>
          {({ fields, RemoveButton }) => (
            <>
              <NumberInput field={fields} label="" />
              <RemoveButton />
            </>
          )}
        </List>,
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

      render(<List field={fields.luckyNumbers}>{() => <></>}</List>);

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
        <List field={fields.luckyNumbers}>
          {({ fields }) => <NumberInput field={fields} label="lucky" />}
        </List>,
      );

      const AddButton = screen.getByText("Add item");

      expect(AddButton).toBeInTheDocument();

      await act(() => userEvent.click(AddButton));

      expect(screen.queryByDisplayValue("6")).toBeInTheDocument();
      expect(screen.queryAllByLabelText("lucky")).toHaveLength(1);
    });

    it("can add item with explicit fields", async () => {
      const fields = {
        luckyNumbers: listField({
          value: [],
          builder: () => numberField(),
        }),
      };

      render(
        <List
          field={fields.luckyNumbers}
          AddButton={({ add }) => (
            <button
              type="button"
              onClick={() => add(numberField({ value: 9 }))}
            >
              add fields
            </button>
          )}
        >
          {({ fields }) => <NumberInput field={fields} label="lucky" />}
        </List>,
      );

      const AddButton = screen.getByText("add fields");

      await act(() => userEvent.click(AddButton));

      expect(screen.queryByDisplayValue("9")).toBeInTheDocument();
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
        <List field={fields.luckyNumbers} Empty={() => <p>No lucky numbers</p>}>
          {({ fields }) => <NumberInput field={fields} label="" />}
        </List>,
      );

      expect(screen.queryByText("No lucky numbers")).toBeInTheDocument();
    });
  });
});
