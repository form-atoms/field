import { FieldAtom } from "form-atoms";
import { useAtomValue } from "jotai";
import { RenderProp } from "react-render-prop-type";

import { UploadAtom } from "../../atoms";

export function useIsUploadAtom(
  field: FieldAtom<any>,
): field is UploadAtom<any> {
  const atoms = useAtomValue(field);

  return !!(atoms as any).uploadStatus;
}

type UploadProps<Value> = { isUpload: true; field: UploadAtom<Value> };

type RegularProps<Value> = { isUpload: false; field: FieldAtom<Value> };

export const SwitchUploadAtom = <Value,>({
  field,
  children,
}: { field: FieldAtom<Value> } & RenderProp<
  UploadProps<Value> | RegularProps<Value>
>) => {
  if (useIsUploadAtom(field)) {
    return <>{children({ isUpload: true, field })}</>;
  } else {
    return <>{children({ isUpload: false, field })}</>;
  }
};
