import React, { ReactNode } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  console.log("Button RUNNING");
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default React.memo(Button);
