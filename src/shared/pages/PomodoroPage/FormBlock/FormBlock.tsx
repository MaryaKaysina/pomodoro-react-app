import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { authRequestAsync, IData, ITask } from '../../../../store/auth/actions';
import { RootState } from '../../../../store/reducer';

import { Form } from './Form';
import { TaskList } from './TaskList';
import { updateNewTask } from '../../../../store/new_task';
import { useLoadLocal } from '../../../../hooks/useLoadLocal';

export function FormBlock() {
  const [mounred, setMounted] = useState(false);
  const dispatch = useDispatch<any>();

  useLoadLocal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const newTask = useSelector<RootState, string>(state => state.newTask);
  const data = useSelector<RootState, IData>(state => state.auth.data);
  const currentTasks = useSelector<RootState, ITask[]>(state => state.auth.data.tasks)
    .filter((task) => !task.done);

  const newId = data.tasks?.sort((a, b) => b?.id - a?.id).slice(0, 1)[0]?.id + 1 || 0;
  const timePomodoro = data.settings?.timePomodoro;
  const logInDate = data?.logInDate;

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
