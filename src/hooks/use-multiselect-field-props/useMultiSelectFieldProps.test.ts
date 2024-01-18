import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { useMultiSelectFieldProps } from "./useMultiSelectFieldProps";
import { stringArrayField } from "../../fields";

describe("useMultiSelectFieldProps()", () => {
  const options = ["electric", "gas", "manual"] as const;
  const getValue = (opt: string) => opt;

  test("initialize the field via options", () => {
    // NOTE: test got stuck when the options are inlined
    const fieldOptions = { initialValue: ["gas", "manual"] };

    const field = stringArrayField();

    const { result } = renderHook(() =>
      useMultiSelectFieldProps({ field, options, getValue }, fieldOptions),
    );

    expect(result.current.value).toEqual(["1", "2"]);
  });
});
