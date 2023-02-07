import { HelperText, Label, Rating, RatingProps } from "flowbite-react";
import {
  LastFieldProps,
  NumberFieldAtom,
  useNumberFieldProps,
  useSelectOptions,
} from "@react-last-field/field";
import { useFieldActions } from "form-atoms";
import { Field } from "../field";
import { useFieldError } from "../hooks";

const options = [1, 2, 3, 4, 5];

export const RatingField = ({
  field,
  size = "md",
  label,
  ...uiProps
}: RatingProps & LastFieldProps<NumberFieldAtom>) => {
  const props = useNumberFieldProps(field);
  const actions = useFieldActions(field);
  const { renderOptions } = useSelectOptions<number, number | undefined>(
    field,
    {
      getValue: (val) => val,
      getLabel: (val) => val,
      options,
    }
  );

  const { error, color } = useFieldError(field);

  return (
    <Field>
      {label && (
        <Label color={color} htmlFor={props.id}>
          {label}
        </Label>
      )}
      <Rating size={size} {...uiProps}>
        {renderOptions.map(({ value }) => (
          <div key={value} onClick={() => actions.setValue(value)}>
            <Rating.Star
              filled={props.value && value ? value <= props.value : false}
            />
          </div>
        ))}
      </Rating>
      {error && <HelperText color={color}>{error}</HelperText>}
    </Field>
  );
};
