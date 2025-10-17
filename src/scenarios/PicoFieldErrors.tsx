import { FieldErrors, FieldErrorsProps } from "../components";

const style = { color: "var(--pico-color-red-550)" };

export function PicoFieldErrors(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Omit<FieldErrorsProps<any>, "children">,
) {
  return (
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
}
