import { act, renderHook } from "@testing-library/react";
import { useFieldState } from "form-atoms";
import { describe, expect, it } from "vitest";

import { useListFieldInitialValue } from "./useListFieldInitialValue";
import { listAtom } from "../../atoms";
import { numberField } from "../../fields";
import { useListActions } from "../use-list-actions";

describe("useListFieldInitialValue()", () => {
  it("reinitializes the field value", async () => {
    const field = listAtom({
      value: [] as number[],
      builder: (value) => numberField({ value }),
    });

    const { result: state } = renderHook(() => useFieldState(field));
    const { rerender } = renderHook(
      (props) => useListFieldInitialValue(field, props.initialValue),
      { initialProps: { initialValue: [1, 2] } },
    );

    // make list dirty
    const { result: listActions } = renderHook(() => useListActions(field));
    await act(async () => listActions.current.add());
    expect(state.current.dirty).toBe(true);

    const initialValue = [42, 84];

    // initialization makes field pristine
    rerender({ initialValue });
    expect(state.current.dirty).toBe(false);

    // make list dirty again
    await act(async () => listActions.current.add());
    expect(state.current.dirty).toBe(true);

    // re-inititialation skipped with the same initialValue (useEffect dependency)
    rerender({ initialValue });
    expect(state.current.dirty).toBe(true);
  });
});
