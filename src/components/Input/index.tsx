import * as React from "react";
import "./styles.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { onChange, name, value, ...rest } = props;

  return (
    <input
      {...rest}
      onChange={onChange}
      name={name}
      className="input__element"
    />
  );
};

export default Input;
