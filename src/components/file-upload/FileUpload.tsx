import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { RenderProp } from "react-render-prop-type";

import { UploadAtom } from "../../atoms";

type ChildrenProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

type Props<Value> = { field: UploadAtom<Value> } & RenderProp<ChildrenProps>;

export function FileUpload<Value>({ field, children }: Props<Value>) {
  const atoms = useAtomValue(field);
  const validate = useSetAtom(atoms.validate);
  const status = useAtomValue(atoms.uploadStatus);

  // runs the upload
  useEffect(() => validate(), []);

  return children({
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
  });
}
