import { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList, { User } from "./components/Users/UsersList";
import "./App.css";

function App() {
  const [usersList, setUsersList] = useState<User[]>([]);

  const addUserHandler = (name: string, age: number) => {
    setUsersList((prev) => {
      return [...prev, { name, age, id: Math.random().toString() }];
    });
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
