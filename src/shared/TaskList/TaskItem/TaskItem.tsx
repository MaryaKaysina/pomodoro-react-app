import React from 'react';
import { Menu } from './Menu';
import styles from './taskitem.css';

interface ITaskItem {
  id: string;
  text: string;
  time: number;
}

interface ITask {
  task: ITaskItem;
}

export function TaskItem({ task }: ITask) {
  return (
    <li className={styles.taskItem}>
      {task.text}
      <Menu taskId={task.id} />
    </li>
  );
}
