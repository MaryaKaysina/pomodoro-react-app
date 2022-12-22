import { IData, ITask } from "../../store/auth/actions";

export interface ISetDataTasks {
  currentPomodor: number;
  currentText: string;
  curentTask: ITask;
  otherTask: ITask[];
  currentData: IData;
}

export function setDataTasks({
  currentPomodor,
  currentText,
  curentTask,
  otherTask,
  currentData,
}: ISetDataTasks) {
  const task = {
    id: curentTask.id,
    text: currentText,
    time: curentTask.time,
    currentTime: 0,
    createdAt: curentTask.createdAt,
    updateddAt: Date.now(),
    done:false,
    skip:false,
    pomodor: currentPomodor,
    currentPomodor: curentTask.currentPomodor
  };

  let newTasks = otherTask;

  if (currentPomodor !== 0 && currentText.length !== 0) {
    newTasks = [ ...otherTask, task];
  }

  const newAuthData: IData = {
    auth: currentData.auth,
    tasks: newTasks,
    logInDate: currentData.logInDate,
    pauseTime: currentData.pauseTime,
    isDark: currentData.isDark,
    settings: currentData.settings,
    currentTask: currentData.currentTask,
  };

  return newAuthData;
}
