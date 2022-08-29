import { Component } from "react";

import User from "./User";
import classes from "./Users.module.css";

interface UserItem {
  id: string;
  name: string;
}

interface UsersProps {
  users: UserItem[];
}

interface UsersState {
  showUsers: boolean;
  more: string;
}

class Users extends Component<UsersProps, UsersState> {
  constructor(props: UsersProps) {
    super(props);
    this.state = {
      showUsers: true,
      more: "Test",
    };
  }

  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error("No users provided!");
    }
  }

  toggleUsersHandler() {
    this.setState((prevState: UsersState) => {
      return { showUsers: !prevState.showUsers };
    });
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"}
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

export default Users;
