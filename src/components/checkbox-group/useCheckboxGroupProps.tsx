import { useAtomValue } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";

import { ZodFieldValue } from "../../fields";
import {
  UseMultiSelectFieldProps as UseCheckboxGroupFieldProps,
  ZodArrayField,
  useFieldProps,
} from "../../hooks";

export const useCheckboxGroupFieldProps = <
  Option,
  Field extends ZodArrayField,
>({
  field,
  options,
  getValue,
}: UseCheckboxGroupFieldProps<Option, Field>) => {
  const atom = useAtomValue(field);
  const fieldValue = useAtomValue(atom.value);
  const [value, setValue] = useState<number[]>(() =>
    fieldValue.map((activeOption) => options.indexOf(activeOption)),
  );

  const getEventValue = (event: ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event.currentTarget.value);
    console.log("inner", value);
    const values = event.currentTarget.checked
      ? [...value, index]
      : value.filter((val) => val != index);

    setValue(values);

    const activeOptions = values
      .map((idx) => options[idx])
      .filter(Boolean) as Option[];

    return activeOptions.map(getValue) as ZodFieldValue<Field>;
  };

  useEffect(() => {
    if (fieldValue.length === 0 && value.length !== 0) {
      // reset local state, when form was reset
      setValue([]);
    }
  }, [fieldValue]);

  const props = useFieldProps<Field, HTMLInputElement>(field, getEventValue);

  return { ...props, value };
};
