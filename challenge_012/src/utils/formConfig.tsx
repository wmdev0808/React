import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

import Input from "../components/Input";
import {
  maxLengthRule,
  minLengthRule,
  passwordMatchRule,
  requiredRule,
  ValidationConfig,
} from "./inputValidationRules";

export interface FormField {
  renderInput: (
    handleChange: ChangeEventHandler<HTMLInputElement>,
    value: string,
    isValid: boolean,
    error: string,
    key: string
  ) => JSX.Element;
  label: string;
  value: string;
  valid: boolean;
  errorMessage: string;
  touched: boolean;
  validationRules?: ValidationConfig[];
}

export type FormObject = Record<string, FormField>;

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {HTMLInputTypeAttribute} type - input type
 * @param {string} defaultValue - default value for the input
 */
function createFormFieldConfig(
  label: string,
  name: string,
  type: HTMLInputTypeAttribute,
  defaultValue: string = ""
): FormField {
  return {
    renderInput: (
      handleChange: ChangeEventHandler<HTMLInputElement>,
      value: string,
      isValid: boolean,
      error: string,
      key: string
    ) => {
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          handleChange={handleChange}
          errorMessage={error}
        />
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: "",
    touched: false,
  };
}

// object representation of signup form
export const signupForm: FormObject = {
  name: {
    ...createFormFieldConfig("Full Name", "name", "text"),
    validationRules: [
      requiredRule("name"),
      minLengthRule("name", 3),
      maxLengthRule("name", 25),
    ],
  },
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [
      requiredRule("email"),
      minLengthRule("email", 10),
      maxLengthRule("email", 25),
    ],
  },
  password: {
    ...createFormFieldConfig("Password", "password", "password"),
    validationRules: [
      requiredRule("password"),
      minLengthRule("password", 8),
      maxLengthRule("password", 20),
    ],
  },
  confirmPassword: {
    ...createFormFieldConfig("Confirm Password", "confirmPassword", "password"),
    validationRules: [passwordMatchRule()],
  },
};
