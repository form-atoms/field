import { Label, Rating, RatingProps } from "flowbite-react";
import {
  LastFieldProps,
  useNumberFieldProps,
  useSelectOptions,
} from "@react-last-field/field";
import { FieldAtom, useFieldActions } from "form-atoms";

const options = [1, 2, 3, 4, 5];

export const RatingField = ({
  field,
  size = "md",
  label,
  ...uiProps
}: RatingProps & LastFieldProps<FieldAtom<number>>) => {
  const props = useNumberFieldProps(field);
  const actions = useFieldActions(field);
  const { renderOptions } = useSelectOptions<number, number>(field, {
    getValue: (val) => val,
    getLabel: (val) => val,
    options,
  });

  return (
    <div className="flex flex-col gap-4">
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <Rating size={size} {...uiProps}>
        {renderOptions.map(({ value }) => (
          <div key={value} onClick={() => actions.setValue(value)}>
            <Rating.Star filled={value <= props.value} />
          </div>
        ))}
      </Rating>
    </div>
  );
};
