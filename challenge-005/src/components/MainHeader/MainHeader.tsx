import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

function MainHeader() {
  return (
    <header className={classes["main-header"]}>
      <h1>A Typical Page</h1>
      <Navigation />
    </header>
  );
}

export default MainHeader;
