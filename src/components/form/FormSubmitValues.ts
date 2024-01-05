import { FieldAtom, FormAtom } from "form-atoms";

import {
  ListField,
  ListFieldSubmitValue,
  ZodField,
  ZodFieldSubmitValue,
} from "../../fields";

type Flatten<T> = Identity<{
  [K in keyof T]: T[K];
}>;

type Identity<T> = T;

type FormFields = {
  [key: string | number]:
    | FieldAtom<any>
    | ZodField<any>
    | FormFields
    | FormFields[]
    | FieldAtom<any>[]
    | ZodField<any>[];
};

export type FormFieldSubmitValues<Fields extends FormFields> = Flatten<{
  [Key in keyof Fields]: Fields[Key] extends ListField<
    infer Fields,
    any,
    infer Required
  >
    ? ListFieldSubmitValue<Fields, Required>
    : Fields[Key] extends ZodField
      ? ZodFieldSubmitValue<Fields[Key]>
      : Fields[Key] extends FieldAtom<infer Value>
        ? Value
        : Fields[Key] extends FormFields
          ? FormFieldSubmitValues<Fields[Key]>
          : Fields[Key] extends Array<infer Item>
            ? Item extends ZodField<any>
              ? ZodFieldSubmitValue<Fields[Key]>[]
              : Item extends FieldAtom<infer Value>
                ? Value[]
                : Item extends FormFields
                  ? FormFieldSubmitValues<Item>[]
                  : never
            : never;
}>;

export type FormSubmitValues<Form extends FormAtom<any>> =
  Form extends FormAtom<infer Fields> ? FormFieldSubmitValues<Fields> : never;
