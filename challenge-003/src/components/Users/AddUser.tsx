import { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

interface AddUserProps {
  onAddUser: (name: string, age: number) => void;
}

const AddUser = ({ onAddUser }: AddUserProps) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState<{
    title: string;
    message: string;
  } | null>();

  const addUserHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    onAddUser(username, +age);
    setUsername("");
    setAge("");
  };

  const usernameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setUsername(e.target.value);
  };

  const ageChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAge(e.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          message={error.message}
          onConfirm={errorHandler}
          title={error.title}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
