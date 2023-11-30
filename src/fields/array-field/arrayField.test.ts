import { renderHook } from "@testing-library/react";
import { formAtom, useFormValues } from "form-atoms";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import { arrayField } from "./arrayField";

const elementSchema = z.string();

describe("arrayField()", () => {
  it("is initialized as empty string", () => {
    const classic = arrayField({ elementSchema });
    const explicitUndefined = arrayField({ elementSchema, value: undefined });

    const form = formAtom({ classic, explicitUndefined });
    const { result } = renderHook(() => useFormValues(form));

    expect(result.current).toEqual({
      classic: [],
      explicitUndefined: [],
    });
  });
});
