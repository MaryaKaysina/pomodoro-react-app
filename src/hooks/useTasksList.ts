import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { ITaskItem } from "../store/tasks/actions";

export function useTasksList() {
  const tasks = useSelector<RootState, ITaskItem[]>(state => state.tasks.data);
  const [taskList, setTasksList] = useState(tasks);
  console.log(tasks);

  useEffect(() => {
    setTasksList(tasks);
  }, []);

  return taskList;
}
