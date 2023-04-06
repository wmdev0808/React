import { Component } from "react";

import classes from "./User.module.css";

interface UserProps {
  name: string;
}

class User extends Component<UserProps> {
  componentWillUnmount() {
    console.log("User will unmount!");
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

export default User;
