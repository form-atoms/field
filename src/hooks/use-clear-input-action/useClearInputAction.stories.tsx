import { useClearInputAction } from "./useClearInputAction";
import { textField, useTextFieldProps } from "../../fields";

const password = textField();

const ClearInputDemo = () => {
  const props = useTextFieldProps(password);
  const { clear } = useClearInputAction(password);

  return (
    <>
      <input type="password" {...props} />
      <button className="outline secondary" onClick={clear}>
        Clear
      </button>
    </>
  );
};

export default {
  title: "useClearInputAction",
  component: ClearInputDemo,
};

export const Primary = {};
