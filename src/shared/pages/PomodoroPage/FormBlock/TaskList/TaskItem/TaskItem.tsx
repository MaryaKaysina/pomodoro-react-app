import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import { Menu } from './Menu';
import styles from './taskitem.module.css';

interface ITaskItem {
  id: number;
  text: string;
  time: number;
}

interface ITask {
  task: ITaskItem;
  timeToOne: number;
  currentId: number;
  onClick?: (id: number) => void;
}

const NOOP = () => {};

export function TaskItem({ task, timeToOne, onClick = NOOP, currentId }: ITask) {
  const [value, setValue] = useState(task.text);
  const [classes, setClasses] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  };

  useEffect(() => {
    const classes = classNames(
      styles['taskItem'],
      { [styles.active]: task?.id === currentId },
    );
    setClasses(classes);
  }, [currentId])

  return (
    <a className={classes} data-id="taskItem" onClick={() => onClick(task.id)}>
      <span className={styles.taskNum}>{Math.floor(task.time / timeToOne)}</span>
      <input
        id={`text_task_id_${task.id}`}
        type='text'
        value={value}
        onChange={handleChange}
        disabled
        size={value.length}
      />
      <Menu taskId={task.id} />
    </a>
  );
}
