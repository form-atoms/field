import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { formAtom, useFormActions } from "form-atoms";
import { describe, expect, it } from "vitest";

import { useFilesFieldProps } from "./useFilesFieldProps";
import { filesField } from "../../fields";

describe("useFilesFieldProps", () => {
  it("gives file input type", () => {
    const field = filesField();
    const { result } = renderHook(() => useFilesFieldProps(field));

    expect(result.current.type).toBe("file");
  });

  describe("with required field", () => {
    it("clears input when the form is reset", async () => {
      const field = filesField();
      const form = formAtom({ field });
      const { result: props } = renderHook(() => useFilesFieldProps(field));
      const { result: formActions } = renderHook(() => useFormActions(form));

      render(<input data-testid="fileInput" {...props.current} />);

      const input = screen.getByTestId("fileInput");

      await userEvent.upload(
        input,
        new File(["content"], "file-name.png", {
          type: "image/png",
        }),
      );

      expect(input).toHaveValue("C:\\fakepath\\file-name.png");

      await act(() => formActions.current.reset());

      expect(input).toHaveValue("");
    });
  });

  describe("with optional field", () => {
    it("clears input when the form is reset", async () => {
      const field = filesField().optional();
      const form = formAtom({ field });
      const { result: props } = renderHook(() => useFilesFieldProps(field));
      const { result: formActions } = renderHook(() => useFormActions(form));

      render(<input data-testid="fileInput" {...props.current} />);

      const input = screen.getByTestId("fileInput");

      await userEvent.upload(
        input,
        new File(["content"], "file-name.png", {
          type: "image/png",
        }),
      );

      expect(input).toHaveValue("C:\\fakepath\\file-name.png");

      await act(() => formActions.current.reset());

      expect(input).toHaveValue("");
    });
  });
});
