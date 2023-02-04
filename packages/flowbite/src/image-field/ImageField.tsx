import { FieldAtom, useFieldState } from "form-atoms";
import { PropsWithChildren } from "react";

export const ImageField = ({
  field,
  children,
}: PropsWithChildren<{ field: FieldAtom<{ url: string; id: string }> }>) => {
  const { value } = useFieldState(field);

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        id: {value.id}, url: {value.url}
      </div>
    </div>
  );
};
