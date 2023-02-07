import { fieldAtom, FieldAtom, FieldAtomConfig } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";

type FileValue = FileList | undefined;

export type FileFieldAtom = FieldAtom<FileValue>;

const emptyFileList = () => {
  const input = document.createElement("input");
  input.type = "file";

  // will be problem with SSR
  return input.files!;
};

type FileConfig = Partial<FieldAtomConfig<FileValue>>;

type FileConfigBuilder = (zod: {
  zodValidate: typeof zodValidate;
  z: typeof z;
}) => FileConfig;

export const fileField = (config?: FileConfig | FileConfigBuilder) =>
  fieldAtom({
    ...config,
    value: undefined,
    // TODO: change message Input not instance of FileList
    validate: zodValidate(z.instanceof(FileList), { on: "change" }),
    ...(typeof config === "function" ? config({ zodValidate, z }) : config),
  });
