import { dateField } from "./dateField";
import { DateInput } from "./DateInput.mock";
import { RadioGroupField } from "../../components/radio-group/RadioGroupField.mock";
import { formStory, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/dateField",
};

export const RequiredInput = formStory({
  args: {
    fields: {
      birthDate: dateField({ name: "birthDate" }),
    },
    children: ({ fields }) => (
      <DateInput field={fields.birthDate} label="Birth date" />
    ),
  },
});

export const OptionalInput = formStory({
  args: {
    fields: {
      weddingDate: dateField({ name: "weddingDate" }).optional(),
    },
    children: ({ fields }) => (
      <DateInput field={fields.weddingDate} label="Wedding date" />
    ),
  },
});

export const InitializedInput = formStory({
  args: {
    fields: {
      dueDate: dateField({ name: "dueDate" }).optional(),
    },
    children: ({ fields }) => (
      <DateInput
        field={fields.dueDate}
        label="Due Date"
        initialValue={new Date(2024, 2, 30)}
      />
    ),
  },
});

export const ExtendSchema = formStory({
  args: {
    fields: {
      deadline: dateField({
        name: "deadline",
        schema: (s) => s.min(new Date(), { message: "Must be in the future" }),
      }),
    },
    children: ({ fields }) => (
      <DateInput
        field={fields.deadline}
        label="Dead line (can't be in the past)"
      />
    ),
  },
});

const nowPlusDays = (days = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return date;
};

export const RadioGroupOption = formStory({
  args: {
    fields: {
      movieNightDate: dateField({ name: "movieNightDate" }),
    },
    children: ({ fields }) => (
      <RadioGroupField
        field={fields.movieNightDate}
        label="Movie night date"
        options={[nowPlusDays(), nowPlusDays(1), nowPlusDays(2)]}
        getLabel={(date) => date.toLocaleDateString()}
        getValue={(date) => date}
      />
    ),
  },
});
