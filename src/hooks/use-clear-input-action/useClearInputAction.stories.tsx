import { useClearInputAction } from "./useClearInputAction";
import { textField } from "../../fields";
import { useTextFieldProps } from "../use-text-field-props";

const password = textField();

const ClearInputDemo = () => {
  const props = useTextFieldProps(password);
  const { clear } = useClearInputAction(password);

  return (
    <>
      <input type="password" {...props} />
      <button type="button" className="outline secondary" onClick={clear}>
        Clear
      </button>
    </>
  );
};

export default {
  title: "hooks/useClearInputAction",
  component: ClearInputDemo,
};

export const Primary = {};
