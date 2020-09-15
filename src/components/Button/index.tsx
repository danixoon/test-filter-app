import * as React from "react";
import { mergeProps } from "../../utils";
import "./styles.scss";

interface ButtonProps
  extends React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > {
  color?: "secondary" | "primary";
  size?: "sm" | "md";
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const [active, toggle] = React.useState(() => false);
  const { children, color = "secondary", size = "md", ...rest } = props;

  return (
    <button
      onClick={() => toggle(!active)}
      {...mergeProps({ className: `btn btn_${color} btn_${size}` }, rest)}
    >
      {children}
    </button>
  );
};

export default Button;
