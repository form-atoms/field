import { FieldAtom } from "form-atoms";
import { useAtomValue } from "jotai";

const useFieldName = (fieldAtom: FieldAtom<any>) =>
  useAtomValue(useAtomValue(fieldAtom).name);

export const PicoFieldName = ({ field }: { field: FieldAtom<any> }) => {
  const name = useFieldName(field);

  return (
    <small>
      My name is <code>{name}</code>
    </small>
  );
};
