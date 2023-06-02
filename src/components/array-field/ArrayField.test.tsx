import { act, render, renderHook, screen } from "@testing-library/react";
import { InputField, formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { ArrayField } from "./ArrayField";
import { textField } from "../../fields";

describe("<ArrayField />", () => {
  it("works with flat list of fields", async () => {
    const fields = {
      friends: [textField({ value: "Bryan" }), textField({ value: "Alice" })],
    };

    const form = formAtom(fields);
    const { result } = renderHook(() => useFormSubmit(form));
    render(
      <ArrayField path={["friends"]} form={form} builder={() => textField()}>
        {({ fields }) => <InputField atom={fields} component="input" />}
      </ArrayField>
    );

    expect(screen.getByDisplayValue("Bryan")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();

    const onSubmit = vi.fn();
    await act(async () => {
      result.current(onSubmit)();
    });

    expect(onSubmit).toHaveBeenCalledWith({ friends: ["Bryan", "Alice"] });
  });
});
