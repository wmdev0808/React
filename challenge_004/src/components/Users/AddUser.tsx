import { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

export interface User {
  id: string;
  name: string;
  age: number;
}

interface AddUserProps {
  onAddUser: (name: string, age: number) => void;
}

const AddUser = (props: AddUserProps) => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const ageInputRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<{
    title: string;
    message: string;
  } | null>();

  const addUserHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const name = nameInputRef.current!.value;
    const age = ageInputRef.current!.value;

    if (name.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid age",
        message: "please enter a valid age (> 0).",
      });
      return;
    }

    // If inputs are valid
    props.onAddUser(name, +age);
    nameInputRef.current!.value = "";
    ageInputRef.current!.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" id="usrname" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input type="number" id="age" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
