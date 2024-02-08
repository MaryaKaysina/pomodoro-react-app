import { IData } from "src/store/auth/actions";

export const GenerateNewData = ( data: IData, newId: number, newTask: string ): IData => {

  const task = {
    id: newId,
    text: newTask,
    time: data.settings?.timePomodoro,
    currentTime: 0,
    createdAt: Date.now(),
    updateddAt: 0,
    done:false,
    skip:false,
    pomodor: 1,
    currentPomodor: 1
  };

  const newTasks = [ ...data.tasks, task];

  const newAuthData: IData = {
    auth: data.auth,
    tasks: newTasks,
    logInDate: data?.logInDate,
    pauseTime: [{
      createdAt: 0,
      time: 0,
    }],
    isDark: data.isDark,
    settings: data.settings,
    currentTask: data.currentTask,
  };

  return newAuthData;
}
