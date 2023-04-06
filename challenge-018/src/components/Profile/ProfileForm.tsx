import { useRef, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const navigate = useNavigate();

  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current!.value;

    // add validation

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      // assumption: Always succeeds!

      navigate("/", { replace: true });
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength={7}
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
