import React from "react";
import { useSelector } from "react-redux";
import { IData, ITask } from "src/store/auth/actions";
import { RootState } from "src/store/reducer";
import { formatAllTime } from "src/utils/js/formatAllTime";

export const useCurrentTaskList = (onClick: (id: number) => void) => {
  const [currentTaskActiveId, setCurrentTaskActiveId] = React.useState<number>(0);
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const [allTimeText, setAllTimeText] = React.useState<string>('');

  const data = useSelector<RootState, IData>(state => state.auth.data);

  const currentTasks = data.tasks.filter((task) => !task.done);
  const currentTasksTime = data.tasks
    .filter((task) => !task.done)
    .reduce((acc, task) => task.time * task.pomodor + acc, 0) / 60 || 0;

  React.useEffect(() => {
    if (data.tasks.length === tasks.length) return;

    const tasksSort = currentTasks.sort((a, b) => a.id - b.id);
    setTasks(tasksSort);

    const current = tasksSort.filter((task) => task.id === data.currentTask)[0];
    if (current) {
      setCurrentTaskActiveId(data.currentTask);
    } else {
      const currentId = tasksSort[0]?.id;
      setCurrentTaskActiveId(currentId);
      onClick(currentId);
    }
  }, [currentTasks, data.currentTask, currentTasksTime, data.tasks.length, tasks.length, onClick]);

  React.useEffect(() => {
    setAllTimeText(formatAllTime(currentTasksTime));
  }, [currentTasksTime])

  return {
    tasks,
    currentTaskActiveId,
    allTimeText,
    setCurrentTaskActiveId
  }
}
