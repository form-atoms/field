import { FormAtom, FormFields, formAtom, useFormActions } from "form-atoms";
import { PropsWithChildren } from "react";

import { useClearFileInputEffect } from "./useClearFileInputEffect";
import { FileField, fileField, useFileFieldProps } from "../../fields";

const DemoForm = <Fields extends FormFields>({
  form,
  children,
}: PropsWithChildren<{ form: FormAtom<Fields> }>) => {
  const { reset } = useFormActions(form);

  return (
    <form>
      {children}
      <button className="outline secondary" type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default {
  title: "useClearFileInputEffect",
  component: DemoForm,
};

const UncontrolledFileInput = ({ field }: { field: FileField }) => {
  const { value, ...props } = useFileFieldProps(field);

  return <input type="file" {...props} />;
};

const attachment = fileField();

export const Uncontrolled = {
  args: {
    form: formAtom({ attachment }),
    children: <UncontrolledFileInput field={attachment} />,
  },
};

const profilePic = fileField();

const ControlledFileInput = ({ field }: { field: FileField }) => {
  const { value, ...props } = useFileFieldProps(field);
  useClearFileInputEffect(field);

  return <input type="file" {...props} />;
};

export const Controlled = {
  args: {
    form: formAtom({ profilePic }),
    children: <ControlledFileInput field={profilePic} />,
  },
};
