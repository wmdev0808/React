import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

import "./Input.css";

interface InputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  name: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errorMessage: string;
  isValid: boolean;
  value: string;
}

function InputField(props: InputProps) {
  const { label, type, name, handleChange, errorMessage, isValid, value } =
    props;

  return (
    <div className="inputContainer">
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={handleChange} />
      {errorMessage && !isValid && (
        <span className="error">{errorMessage}</span>
      )}
    </div>
  );
}

export default React.memo(InputField);
