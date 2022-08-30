import { FormObject } from "./formConfig";

export interface ValidationConfig {
  name: string;
  message: string;
  validate: (value: string, formObj?: {}) => boolean;
}

/**
 * creates and returns a validation rule object that is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleName - name of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validationFunc - validation function
 */
function createValidationRule(
  ruleName: string,
  errorMessage: string,
  validateFunc: (value: string, formObj?: FormObject) => boolean
): ValidationConfig {
  return {
    name: ruleName,
    message: errorMessage,
    validate: validateFunc,
  };
}

export function requiredRule(inputName: string) {
  return createValidationRule(
    "required",
    `${inputName} required`,
    (inputValue) => inputValue.length !== 0
  );
}

export function minLengthRule(inputName: string, minCharacters: number) {
  return createValidationRule(
    "minLength",
    `${inputName} should contain at least ${minCharacters} characters`,
    (inputValue) => inputValue.length >= minCharacters
  );
}

export function maxLengthRule(inputName: string, maxCharacters: number) {
  return createValidationRule(
    "minLength",
    `${inputName} cannot contain more than ${maxCharacters} characters`,
    (inputValue) => inputValue.length <= maxCharacters
  );
}

export function passwordMatchRule() {
  return createValidationRule(
    "passwordMatch",
    `passwords do not match`,
    (inputValue: string, formObj?: FormObject) =>
      inputValue === formObj!.password.value
  );
}
