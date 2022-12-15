import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { authRequestAsync, IData } from '../../../../store/auth/actions';
import { RootState } from '../../../../store/reducer';

import { Form } from './Form';
import { TaskList } from './TaskList';
import { updateNewTask } from '../../../../store/new_task';

export function FormBlock() {
  const [mounred, setMounted] = useState(false);
  const dispatch = useDispatch<any>();

  const localDefault = JSON.stringify([{auth: "", tasks: [], logInDate: 0}]);
  const localString = localStorage.getItem('token-pomodoro') || localDefault;
  const local: IData[] = JSON.parse(localString);

  useEffect(() => {
    dispatch(authRequestAsync(local));
    setMounted(true);
  }, []);

  const newTask = useSelector<RootState, string>(state => state.newTask);
  const data = useSelector<RootState, IData[]>(state => state.auth.data);
  const loading = useSelector<RootState, boolean>(state => state.auth.loading);

  const currentAuth = data.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1)[0].auth;
  const current = data.filter((item) => item.auth === currentAuth)[0];
  const taskList = current.tasks.filter((task) => !task.done);
  const other = data.filter((item) => item.auth !== currentAuth);
  const newId = current.tasks?.sort((a, b) => b?.id - a?.id).slice(0, 1)[0]?.id + 1 || 0;

  const timePomodoro = current.settings?.timePomodoro;
  const logInDate = current?.logInDate;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(updateNewTask(event.target.value));
  }

  function handleSubmit(event: FormEvent) {
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
      };
      const newTasks = [ ...current.tasks, task];

      const newAuthData: IData[] = [{
        auth: currentAuth,
        tasks: newTasks,
        logInDate: logInDate,
        pauseTime: [{
          createdAt: 0,
          time: 0,
        }],
        isDark: current.isDark,
        settings: current.settings,
      }];

      const newData: IData[] = [ ...other, ...newAuthData ];

      dispatch(authRequestAsync(newData));
      dispatch(updateNewTask(''));
    } else {
      console.log('Our new task is empty(:');
    }
  }

  return (
    <>
      {mounred && currentAuth.length === 0 && (<Navigate to="/auth" replace />)}
      <Form
        value={newTask}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <TaskList tasks={taskList} />
    </>
  );
}
