import { FieldErrors, FieldErrorsProps } from "../components";

const style = { color: "var(--del-color)" };

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
