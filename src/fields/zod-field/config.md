| Param            | Value                    | Required? | Description                                                                   |
| ---------------- | ------------------------ | --------- | ----------------------------------------------------------------------------- |
| `schema`         | `z.Schema`               | Yes       | zod schema to be used in validation when field the field is required          |
| `optionalSchema` | `z.Schema = z.Undefined` | No        | zod schema to be used when field is optional. Defaults to `schema.optional()` |
