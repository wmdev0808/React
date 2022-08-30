import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";
import { Task } from "../Tasks/Tasks";

interface NewTaskProps {
  onAddTask: (createdTask: Task) => void;
}

function NewTask(props: NewTaskProps) {
  const { error, isLoading, sendRequest: sendTaskRequest } = useHttp();

  function createTask(taskText: string, taskData: { name: string }) {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  function enterTaskHandler(taskText: string) {
    sendTaskRequest(
      {
        url: `${process.env.REACT_APP_API_URL}/tasks.json`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
    );
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
}

export default NewTask;
