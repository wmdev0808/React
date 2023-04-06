import Card from "../UI/Card";
import classes from "./UsersList.module.css";

export interface User {
  id: string;
  name: string;
  age: number;
}

interface UsersListProps {
  users: User[];
}

const UsersList = ({ users }: UsersListProps) => {
  return (
    <Card className={classes.users}>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
