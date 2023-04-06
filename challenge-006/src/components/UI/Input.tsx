import React, { HTMLInputTypeAttribute } from "react";
import classes from "./Input.module.css";

interface InputNativeProps {
  id: string;
  type: HTMLInputTypeAttribute;
  min: string;
  max: string;
  step: string;
  defaultValue: string;
}

interface InputProps {
  input: InputNativeProps;
  label: string;
}

const Input = React.forwardRef((props: InputProps, ref: any) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
