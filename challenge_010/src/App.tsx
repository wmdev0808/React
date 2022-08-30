import { Fragment, useEffect, useState } from "react";

import Tasks, { Task } from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { error, isLoading, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj: Record<string, { text: string }>) => {
      const loadedTasks: Task[] = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: `${process.env.REACT_APP_API_URL}/tasks.json`,
      },
      transformTasks
    );
  }, [fetchTasks]);

  function taskAddHandler(task: Task) {
    setTasks((prevTasks) => prevTasks.concat(task));
  }

  function fetchAndTransformTasks() {
    const transformTasks = (tasksObj: Record<string, { text: string }>) => {
      const loadedTasks: Task[] = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: `${process.env.REACT_APP_API_URL}/tasks.json`,
      },
      transformTasks
    );
  }

  return (
    <Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchAndTransformTasks}
      />
    </Fragment>
  );
}

export default App;
