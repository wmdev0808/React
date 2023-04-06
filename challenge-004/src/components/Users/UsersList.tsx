import Card from "../UI/Card";
import { User } from "./AddUser";
import classes from "./UsersList.module.css";

interface UsersListProps {
  users: User[];
}

const UsersList = (props: UsersListProps) => {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
