import { Fragment } from "react";

import { useAppSelector } from "./hooks";

import { RootState } from "./store";
import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";

function App() {
  const isAuth = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Fragment>
      <Header />
      {!isAuth && <Auth />}
      {isAuth && <UserProfile />}
      <Counter />
    </Fragment>
  );
}

export default App;
