import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";
import classes from "./Login.module.css";

export enum ActionType {
  USER_INPUT = "USER_INPUT",
  INPUT_BLUR = "INPUT_BLUR",
}

interface Action {
  type: keyof typeof ActionType;
  val?: string;
}

interface State {
  value: string;
  isValid: boolean | null;
}

const emailReducer = (state: State, action: Action): State => {
  if (action.type === ActionType.USER_INPUT) {
    return {
      value: action.val || "",
      isValid: action.val ? action.val.includes("@") : false,
    };
  }
  if ((action.type = ActionType.INPUT_BLUR)) {
    return {
      value: state.value,
      isValid: state.value ? state.value.includes("@") : false,
    };
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state: State, action: Action): State => {
  if (action.type === ActionType.USER_INPUT) {
    return {
      value: action.val || "",
      isValid: action.val ? action.val.trim().length > 6 : false,
    };
  }
  if (action.type === ActionType.INPUT_BLUR) {
    return {
      value: state.value,
      isValid: state.value ? state.value.trim().length > 6 : false,
    };
  }

  return { value: "", isValid: false };
};

function Login() {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(!!emailIsValid && !!passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  function emailChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatchEmail({ type: ActionType.USER_INPUT, val: event.target.value });
  }

  function passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatchPassword({ type: ActionType.USER_INPUT, val: event.target.value });
  }

  function validateEmailHanlder() {
    dispatchEmail({ type: ActionType.INPUT_BLUR });
  }

  function validatePasswordHandler() {
    dispatchPassword({ type: ActionType.INPUT_BLUR });
  }

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current!.focus();
    } else {
      passwordInputRef.current!.focus();
    }
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={!!emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHanlder}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={!!passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;
