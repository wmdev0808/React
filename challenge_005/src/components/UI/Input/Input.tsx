import React, { useImperativeHandle, useRef } from "react";

import classes from "./Input.module.css";

interface InputProps {
  isValid: boolean;
  id: string;
  label: string;
  value: string;
  type: React.HTMLInputTypeAttribute;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = React.forwardRef((props: InputProps, ref: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function activate() {
    inputRef.current!.focus();
  }

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        onBlur={props.onBlur}
        onChange={props.onChange}
        ref={inputRef}
        type={props.type}
        value={props.value}
      />
    </div>
  );
});

export default Input;
