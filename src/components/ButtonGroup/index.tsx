import * as React from "react";
import "./styles.scss";

interface ButtonGroupProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroupProps>> = (
  props
) => {
  const { children, ...rest } = props;

  const count = React.Children.count(children);

  if (count === 1) return children || "";
  else
    return (
      <div {...rest} className="button-group">
        {React.Children.map<any, any>(children, (child, i) => {
          let c = child as React.ReactElement;

          let style: any = {
            borderRadius: "0",
            margin: "0.1rem 0",

            // borderWidth: "1px 0px",
          };

          if (i === 0)
            style = {
              borderRadius: "5px 0px 0px 5px",
              margin: "0.1rem 0 0.1rem 0.1rem",
            };
          else if (i === count - 1)
            style = {
              borderRadius: "0px 5px 5px 0px",
              margin: "0.1rem 0.1rem 0.1rem 0",
            };

          return React.cloneElement(c, {
            style: {
              ...(c.props.style || {}),
              ...style,
              boxSizing: "border-box",
            },
          });
        })}
      </div>
    ) as any;
};

export default ButtonGroup;
