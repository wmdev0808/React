import { ReactNode } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button(props: ButtonProps) {
  return (
    <button
      className={`${classes.button} ${props.className}`}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type || "button"}
    >
      {props.children}
    </button>
  );
}

export default Button;
