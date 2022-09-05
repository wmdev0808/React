import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";

import { logout } from "../store/auth";
import classes from "./Header.module.css";

function Header() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  function logoutHandler() {
    dispatch(logout());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
