import React from 'react';
import { Text, EColors } from '../Text';
import { TaskItem } from './TaskItem';
import styles from './tasklist.css';

interface ITaskItem {
  id: number;
  text: string;
  time: number;
}

interface ITaskList {
  tasks: ITaskItem[];
}

export function TaskList({ tasks }: ITaskList) {
  const tasksSort = tasks.sort((a, b) => a.id - b.id);
  const allTime = tasks?.reduce((acc, task) => task.time + acc, 0) / 60 || 0;
  let allTimeText = '';

  if (allTime < 60) {
    allTimeText = `${allTime} мин`;
  } else if (allTime%60 !== 0) {
    allTimeText = `${Math.floor(allTime / 60)} час ${allTime%60} мин`;
  } else {
    allTimeText = `${Math.floor(allTime / 60)} час`;
  }

  return (
    <>
    {tasksSort?.length > 0 && (
      <>
        <ul className={styles.taskList}>
          {tasksSort?.map((task: ITaskItem) =>
            <TaskItem key={task.id} task={task} />
          )}
        </ul>
        <Text mobileSize={12} size={16} color={EColors.grey99}>{allTimeText}</Text>
      </>
    )}
    </>
  );
}
