import { useAtomValue } from "jotai";
import { ChangeEvent, useCallback } from "react";
import { ZodBoolean, ZodNumber, ZodString, z } from "zod";

import { serializeValue, useFieldProps } from "..";
import {
  BooleanField,
  NumberField,
  StringArrayField,
  StringField,
  ZodFieldValue,
} from "../../fields";

// primitive fields which can be serialized by useOptions & coerced back to original type
export type OptionField =
  | BooleanField
  | NumberField
  | StringField
  | StringArrayField;

const isSelectMultipleEvent = (
  event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
): event is ChangeEvent<HTMLSelectElement> =>
  event.currentTarget.type === "select-multiple";

export const useOptionFieldProps = <Field extends OptionField>(
  field: Field
) => {
  const atom = useAtomValue(field);
  const schema = useAtomValue(atom.schema);

  const getEventValue = useCallback(
    (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
      if (isSelectMultipleEvent(event)) {
        return [...event.currentTarget.options]
          .filter(({ selected }) => selected)
          .map(({ value }) => value) as ZodFieldValue<Field>;
      }

      const coerceSchema =
        schema instanceof ZodBoolean
          ? z.coerce.boolean()
          : schema instanceof ZodNumber
          ? z.coerce.number()
          : schema instanceof ZodString
          ? z.coerce.string()
          : z.never();

      // TODO: this can throw with wrong runtime atom; perhaps catch & set error into the field?
      return coerceSchema.parse(event.target.value) as ZodFieldValue<Field>;
    },
    [schema]
  );

  const props = useFieldProps<Field, HTMLSelectElement | HTMLInputElement>(
    field,
    getEventValue
  );

  return { ...props, value: serializeValue(props.value) };
};
