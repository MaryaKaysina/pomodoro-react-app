import { IData, ITask } from "../../store/auth/actions";

export interface ISetDataTasks {
  curentTime: number;
  currentText: string;
  curentTask: ITask;
  otherTask: ITask[];
  currentData: IData;
}

export function setDataTasks({
  curentTime,
  currentText,
  curentTask,
  otherTask,
  currentData,
}: ISetDataTasks) {
  const task = {
    id: curentTask.id,
    text: currentText,
    time: curentTime,
    currentTime: 0,
    createdAt: curentTask.createdAt,
    updateddAt: Date.now(),
    done:false,
    skip:false,
  };

  let newTasks = otherTask;

  if (curentTime !== 0 && currentText.length !== 0) {
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
