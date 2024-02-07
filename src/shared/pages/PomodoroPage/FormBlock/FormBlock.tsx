import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { authRequestAsync, IData, ITask } from 'src/store/auth/actions';
import { updateNewTask } from 'src/store/new_task';
import { RootState } from 'src/store/reducer';
import { useLoadLocal } from 'src/hooks/useLoadLocal';
import { Form } from 'src/shared/pages/PomodoroPage/FormBlock/Form';
import { TaskList } from 'src/shared/pages/PomodoroPage/FormBlock/TaskList';

export const FormBlock = () => {
  const [mounred, setMounted] = React.useState(false);
  const dispatch = useDispatch<any>();

  useLoadLocal();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const newTask = useSelector<RootState, string>(state => state.newTask);
  const data = useSelector<RootState, IData>(state => state.auth.data);
  const currentTasks = useSelector<RootState, ITask[]>(state => state.auth.data.tasks)
    .filter((task) => !task.done);

  const newId = data.tasks?.sort((a, b) => b?.id - a?.id).slice(0, 1)[0]?.id + 1 || 0;
  const timePomodoro = data.settings?.timePomodoro;
  const logInDate = data?.logInDate;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(updateNewTask(event.target.value));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (newTask.length > 0) {
      const task = {
        id: newId,
        text: newTask,
        time: timePomodoro,
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
        logInDate: logInDate,
        pauseTime: [{
          createdAt: 0,
          time: 0,
        }],
        isDark: data.isDark,
        settings: data.settings,
        currentTask: data.currentTask,
      };

      const newData: IData = newAuthData;
      dispatch(authRequestAsync(newData));
      dispatch(updateNewTask(''));
    } else {
      console.log('Our new task is empty(:');
    }
  }

  function handleClickTask(id: number) {
    data.currentTask = id;
    dispatch(authRequestAsync(data));
  }

  return (
    <>
      {mounred && data.auth.length === 0 && (<Navigate to="/auth" replace />)}
      <Form
        value={newTask}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <TaskList
        tasks={currentTasks}
        settings={data.settings}
        onClick={handleClickTask}
        auth={data.auth}
      />
    </>
  );
}
