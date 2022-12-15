import { ChangeEvent, useState } from 'react';
import { Menu } from './Menu';
import styles from './taskitem.module.css';

interface ITaskItem {
  id: number;
  text: string;
  time: number;
}

interface ITask {
  task: ITaskItem;
}

export function TaskItem({ task }: ITask) {
  const [value, setValue] = useState(task.text);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  };

  return (
    <li className={styles.taskItem}>
      <input
        id={`text_task_id_${task.id}`}
        type='text'
        value={value}
        onChange={handleChange}
        disabled
        size={value.length}
      />
      <Menu taskId={task.id} />
    </li>
  );
}
