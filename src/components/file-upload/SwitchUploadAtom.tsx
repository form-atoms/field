import { FieldAtom } from "form-atoms";
import { useAtomValue } from "jotai";

import { UploadAtom } from "../../atoms";

export function useIsUploadAtom<Value>(
  field: FieldAtom<Value>,
): field is UploadAtom<Value> {
  const atoms = useAtomValue(field);

  return "uploadStatus" in atoms;
}

type UploadProps<Value> = { isUpload: true; field: UploadAtom<Value> };
type RegularProps<Value> = { isUpload: false; field: FieldAtom<Value> };

type Props<Value> = {
  field: FieldAtom<Value>;
  children: (
    props: UploadProps<Value> | RegularProps<Value>,
  ) => React.ReactNode;
};

export const SwitchUploadAtom = <Value,>({ field, children }: Props<Value>) => {
  if (useIsUploadAtom(field)) {
    return <>{children({ isUpload: true, field })}</>;
  } else {
    return <>{children({ isUpload: false, field })}</>;
  }
};
