import { useState, Fragment } from "react";

import AddUser, { User } from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState<User[]>([]);

  const addUserHandler = (name: string, age: number) => {
    setUsersList((prev) => {
      return [...prev, { name, age, id: Math.random().toString() }];
    });
  };

  return (
    <Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </Fragment>
  );
}

export default App;
