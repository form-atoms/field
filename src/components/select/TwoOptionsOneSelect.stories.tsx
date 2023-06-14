import { useCallback, useState } from "react";
import { RenderProp } from "react-render-prop-type";

import { SelectField } from "./SelectField.mock";
import { stringField } from "../../fields";
import { countryOptions } from "../../scenarios/mocks";
import { formStory, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "components/Select",
};

const mutatedCountries = [
  ...countryOptions.slice(0, countryOptions.length - 1),
  { name: "Austria", key: "AT", flag: "🇦🇹" },
];

export const TwoOptionsOneSelect = formStory({
  parameters: {
    docs: {
      description: {
        story:
          "Illustrates behavior when the options change to equal-length array",
      },
    },
  },
  args: {
    fields: {
      country: stringField().optional(),
    },
    children: ({ fields }) => (
      <SwapCountries>
        {({ countries }) => (
          <SelectField
            field={fields.country}
            label="Country of Origin"
            options={countries}
            getValue={({ key }) => key}
            getLabel={({ name }) => name}
          />
        )}
      </SwapCountries>
    ),
  },
});

const SwapCountries = ({
  children,
}: RenderProp<{ countries: typeof countryOptions }>) => {
  const [countries, setCountries] = useState(countryOptions);

  const swapCountries = useCallback(() => {
    setCountries(
      countries === countryOptions ? mutatedCountries : countryOptions
    );
  }, [countries]);

  return (
    <>
      {children({ countries })}
      <button type="button" onClick={swapCountries}>
        Swap countriess
      </button>
    </>
  );
};
