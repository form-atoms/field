import { renderHook } from "@testing-library/react";
import { formAtom, useFormValues } from "form-atoms";
import { describe, expect, it } from "vitest";

import { listBuilder } from "./listBuilder";
import { textField } from "../../fields";

describe("listBuilder()", () => {
  describe("building plain atoms", () => {
    const builder = listBuilder((value) =>
      textField({ name: "street", value }),
    );

    it("initializes empty atom when called without argument", async () => {
      const field = builder();

      const form = formAtom({ test: field });
      const { result } = renderHook(() => useFormValues(form));

      expect(result.current).toEqual({ test: "" });
    });

    it("initialized multiple items", async () => {
      const streets = builder(["foo", "bar"]);

      const form = formAtom({ streets });
      const { result } = renderHook(() => useFormValues(form));

      expect(result.current).toEqual({ streets: ["foo", "bar"] });
    });
  });

  describe("building form fields object", () => {
    const addressBuilder = listBuilder(({ street, city }) => ({
      street: textField({ name: "street", value: street }),
      city: textField({ name: "city", value: city }),
    }));

    it("initializes empty form fields when called without argument", async () => {
      const fields = addressBuilder();

      const form = formAtom(fields);
      const { result } = renderHook(() => useFormValues(form));

      expect(result.current).toEqual({ street: "", city: "" });
    });

    it("initialized multiple items", async () => {
      const addresses = addressBuilder([
        { city: "Kosice", street: "Hlavna" },
        { city: "Bratislava", street: "Hrad" },
      ]);

      const form = formAtom({ addresses });
      const { result } = renderHook(() => useFormValues(form));

      expect(result.current).toEqual({
        addresses: [
          { city: "Kosice", street: "Hlavna" },
          { city: "Bratislava", street: "Hrad" },
        ],
      });
    });
  });
});
