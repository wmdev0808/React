import { ChangeEvent, FocusEvent, useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

interface InputState {
  value: string;
  isTouched: boolean;
}

enum InputActionTypes {
  INPUT = "INPUT",
  BLUR = "BLUR",
  RESET = "RESET",
}

interface InputAction {
  type: keyof typeof InputActionTypes;
  value?: string;
}

const inputStateReducer = (
  state: InputState,
  action: InputAction
): InputState => {
  if (action.type === InputActionTypes.INPUT) {
    return { value: action.value!, isTouched: state.isTouched };
  }
  if (action.type === InputActionTypes.BLUR) {
    return { value: state.value, isTouched: true };
  }
  if (action.type === InputActionTypes.RESET) {
    return { value: "", isTouched: false };
  }

  return initialInputState;
};

const useInput = (validateValue: (value: string) => boolean) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  function valueChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: InputActionTypes.INPUT, value: event.target.value });
  }

  function inputBlurHandler(event: FocusEvent<HTMLInputElement>) {
    dispatch({ type: InputActionTypes.BLUR });
  }

  function reset() {
    dispatch({ type: InputActionTypes.RESET });
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
