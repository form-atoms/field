import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { UploadAtom } from "../../atoms";

type ChildrenProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

type Props<Value> = {
  field: UploadAtom<Value>;
  children: (props: ChildrenProps) => React.ReactElement;
};

export function FileUpload<Value>({ field, children }: Props<Value>) {
  const atoms = useAtomValue(field);
  const validate = useSetAtom(atoms.validate);
  const status = useAtomValue(atoms.uploadStatus);

  useEffect(() => validate(), [validate]);

  return children({
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
  });
}
