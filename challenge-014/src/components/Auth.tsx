import { useAppDispatch } from "../hooks";
import classes from "./Auth.module.css";
import { login } from "../store/auth";
import { FormEvent } from "react";

function Auth() {
  const dispatch = useAppDispatch();

  function loginHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(login());
  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
}

export default Auth;
