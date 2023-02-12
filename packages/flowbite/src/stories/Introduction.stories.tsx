import {
  countryOptions,
  profileFields,
} from "@form-atoms/field/dist/scenarios/profile";

import { CheckboxField } from "../checkbox-field";
import { FileField } from "../file-field";
import { NumberField } from "../number-field";
import { RatingField } from "../rating-field";
import { SelectField } from "../select-field";
import { TextField } from "../text-field";
import { TextareaField } from "../textarea-field";

import { FormStory, StoryForm } from ".";

export default {
  title: "Scenarios",
  component: StoryForm,
};

export const CreateProfile: FormStory = {
  args: {
    fields: profileFields,
    children: () => (
      <>
        <TextField field={profileFields.username} label="Username" />
        <FileField
          field={profileFields.profilePicture}
          label="Profile Picture"
        />
        <NumberField field={profileFields.age} label="Age" />
        <SelectField<{ code: string; name: string }>
          field={profileFields.country}
          label="Country"
          options={countryOptions}
          placeholder="Pick a country"
          getValue={({ code }) => code}
          getLabel={({ name }) => name}
        />
        <TextareaField field={profileFields.bio} label="Bio" />
        <CheckboxField
          field={profileFields.newsletter}
          label="Subscribe to newsletter"
        />
        <RatingField
          field={profileFields.rating}
          label="How much do you like this?"
        />
      </>
    ),
  },
};
