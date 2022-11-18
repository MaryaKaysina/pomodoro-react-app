import React, { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateNewTask } from '../../store/reducer';
import { ITaskItem, tasksRequestAsync } from '../../store/tasks/actions';
import { Form } from '../Form';
import { TaskList } from '../TaskList';

export function FormBlock() {
  const newTask = useSelector<RootState, string>(state => state.newTask);
  const tasks = useSelector<RootState, ITaskItem[]>(state => state.tasks.data);
  const dispatch = useDispatch<any>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(updateNewTask(event.target.value));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (newTask.length > 0) {
      dispatch(tasksRequestAsync({ text: newTask }));
      dispatch(updateNewTask(''));
    } else {
      console.log('Our new task is empty(:');
    }
  }

  return (
    <>
      <Form
        value={newTask}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <TaskList tasks={tasks} />
    </>
  );
}
