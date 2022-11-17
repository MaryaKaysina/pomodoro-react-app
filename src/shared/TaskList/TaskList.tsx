import React from 'react';
import { generateId } from '../../utils/react/generateRandomIndex';
import { Text, EColors } from '../Text';
import { TaskItem } from './TaskItem';
import styles from './tasklist.css';

interface ITaskItem {
  id: string;
  text: string;
  time: number;
}

const tasks = [
  { text: 'Сверстать сайт', time: 25 },
  { text: 'Проверить валидность', time: 50 },
].map(generateId);

export function TaskList() {
  const allTime = tasks.reduce((acc, task) => task.time + acc, 0) || 0;
  let allTimeText = '';
  console.log(allTime);

  if (allTime < 60) {
    allTimeText = `${allTime} мин`;
  } else if (allTime%60 !== 0) {
    allTimeText = `${Math.floor(allTime / 60)} час ${allTime%60} мин`;
  } else {
    allTimeText = `${Math.floor(allTime / 60)} час`;
  }

  return (
    <>
      <ul className={styles.taskList}>
        {tasks.map((task: ITaskItem) =>
          <TaskItem key={task.id} task={task} />
        )}
      </ul>
      <Text mobileSize={12} size={16} color={EColors.grey99}>{allTimeText}</Text>
    </>
  );
}
