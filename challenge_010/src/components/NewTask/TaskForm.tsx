import { FormEvent, useRef } from "react";

import classes from "./TaskForm.module.css";

interface TaskFormProps {
  onEnterTask: (val: string) => void;
  loading: boolean;
}

function TaskForm(props: TaskFormProps) {
  const taskInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredValue = taskInputRef.current!.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button>{props.loading ? "Sending..." : "Add Task"}</button>
    </form>
  );
}

export default TaskForm;
