import { ChangeEvent } from "react";

import { FieldProps, useFieldProps } from "../";
import { type NumberField } from "../../fields/";

export type NumberFieldProps = FieldProps<NumberField>;

const getNumber = (event: ChangeEvent<HTMLInputElement>) => {
  const { valueAsNumber } = event.currentTarget;
  // empty input "" is read as NaN, so we transform it to the undefined
  return Number.isNaN(valueAsNumber) ? undefined : valueAsNumber;
};

export const useNumberFieldProps = (field: NumberField) => {
  // transform undefined to "" to make the number input empty
  const { value = "", ...props } = useFieldProps(field, getNumber);

  return { ...props, value };
};
