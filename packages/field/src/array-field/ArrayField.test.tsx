import { fieldAtom, formAtom } from "form-atoms";

import { ArrayField, ArrayFieldProps } from "./ArrayField";

const fields = {
  envs: [{ varName: fieldAtom({ value: 0 }) }],
  z: fieldAtom({ value: 2 }),
};
type One = ArrayFieldProps<typeof fields, [""]>;

const flat = {
  envs: [fieldAtom({ value: 0 })],
};
type Flat = ArrayFieldProps<typeof flat, ["envs"]>;

const envs = [fieldAtom({ value: 0 })];
const deep = {
  foo: {
    envs: [fieldAtom({ value: 0 })],
  },
};

type Deep = ArrayFieldProps<typeof deep, [3]>;

const d3 = { deep };

type Deep3 = ArrayFieldProps<typeof d3, ["deep", "foo", "envs"]>;

const nested = { addresses: [{ people: [{ age: fieldAtom({ value: 0 }) }] }] };

type Nested = ArrayFieldProps<typeof nested, ["addresses", 0, "people"]>;

const Simple = () => (
  <ArrayField
    path={["envs"]}
    form={formAtom(fields)}
    builder={() => ({ varName: fieldAtom({ value: 0 }) })}
  >
    {({ fields }) => <></>}
  </ArrayField>
);
