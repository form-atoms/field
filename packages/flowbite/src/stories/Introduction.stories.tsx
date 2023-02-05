import React from "react";
import { formAtom } from "form-atoms";
import {
  countryOptions,
  profileFields,
} from "@react-last-field/field/dist/scenarios/profile";
import { Template } from ".";
import { TextField } from "../text-field";
import { NumberField } from "../number-field";
import { SelectField } from "../select-field";
import { TextareaField } from "../textarea-field";
import { FileField } from "../file-field";
import { CheckboxField } from "../checkbox-field";
import { RatingField } from "../rating-field";

export default {
  title: "Scenarios",
};

export const CreateProfile = Template.bind({});
CreateProfile.args = {
  form: formAtom(profileFields),
  children: (
    <>
      <TextField field={profileFields.username} label="Username" />
      <FileField field={profileFields.profilePicture} label="Profile Picture" />
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
};
