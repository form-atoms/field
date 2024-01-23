import { fieldAtom } from "form-atoms";
import { Atom, atom } from "jotai";

import { ExtendFieldAtom, extendFieldAtom } from "../extendFieldAtom";

type UploadStatus = "loading" | "error" | "success";

export type UploadAtom<Value> = ExtendFieldAtom<
  Value,
  {
    /**
     * A read-only atom containing the field's upload status.
     */
    uploadStatus: Atom<UploadStatus>;
  }
>;

type UploadAtomConfig = {
  name?: string;
};

export const uploadAtom =
  <Value>(upload: (file: File) => Promise<Value>) =>
  (file: File, config?: UploadAtomConfig): UploadAtom<Value> => {
    const requestAtom = atom(async () => upload(file));

    const field = fieldAtom<Value | undefined>({
      ...config,
      value: undefined,
      validate: async ({ get, set, value }) => {
        if (value) {
          // the file was already uploaded, the value is the response
          return [];
        }

        try {
          const result = await get(requestAtom);

          set(get(field).value, result);

          return [];
        } catch (err) {
          if (typeof err !== "string") {
            console.warn(
              "uploadAtom: The error thrown from failed upload is not a string.",
            );
            return ["Failed to upload!"];
          } else {
            return [err];
          }
        }
      },
    });

    return extendFieldAtom(field, ({ validateStatus }) => ({
      uploadStatus: atom<UploadStatus>((get) => {
        const status = get(validateStatus);

        if (status === "validating") {
          return "loading";
        } else if (status === "valid") {
          return "success";
        } else {
          return "error";
        }
      }),
    }));
  };
