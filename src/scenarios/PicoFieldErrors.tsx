import { FieldErrors, FieldErrorsProps } from "../components";

const style = { color: "var(--pico-color-red-550)" };

export const PicoFieldErrors = (props: Omit<FieldErrorsProps, "children">) => (
  <FieldErrors {...props}>
    {({ errors }) => (
      <>
        {errors.map((error, index) => (
          <p key={index} style={style}>
            {error}
          </p>
        ))}
      </>
    )}
  </FieldErrors>
);
