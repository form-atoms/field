import { FormAtom, FormFields, formAtom, useFormActions } from "form-atoms";
import { PropsWithChildren } from "react";

import { useClearFileInputEffect } from "./useClearFileInputEffect";
import { FilesField, filesField, useFilesFieldProps } from "../../fields";

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
  title: "hooks/useClearFileInputEffect",
  component: DemoForm,
};

const UncontrolledFileInput = ({ field }: { field: FilesField }) => {
  const { value, ...props } = useFilesFieldProps(field);

  return <input type="file" {...props} />;
};

const attachment = filesField();

export const Uncontrolled = {
  args: {
    form: formAtom({ attachment }),
    children: <UncontrolledFileInput field={attachment} />,
  },
};

const profilePic = filesField();

const ControlledFileInput = ({ field }: { field: FilesField }) => {
  const { value, ...props } = useFilesFieldProps(field);
  useClearFileInputEffect(field);

  return <input type="file" {...props} />;
};

export const Controlled = {
  args: {
    form: formAtom({ profilePic }),
    children: <ControlledFileInput field={profilePic} />,
  },
};
