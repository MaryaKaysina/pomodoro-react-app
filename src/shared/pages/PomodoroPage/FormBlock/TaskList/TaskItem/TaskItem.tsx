import classNames from 'classnames';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ITask } from '../../../../../../store/auth/actions';
import { RootState } from '../../../../../../store/reducer';
import { ISettings } from '../../../../../../store/setSettings';
import { Menu } from './Menu';
import styles from './taskitem.module.css';

interface ITaskItem {
  taskId: number;
  currentId: number;
  onClick?: (id: number) => void;
}

const NOOP = () => {};

export function TaskItem({ taskId, onClick = NOOP, currentId }: ITaskItem) {
  const [value, setValue] = useState('');
  const [num, setNum] = useState(1);
  const [classes, setClasses] = useState('');

  const currentTask = useSelector<RootState, ITask[]>(state => state.auth.data.tasks)
    .filter((task) => task.id === taskId)[0];
  const timePomodoro = useSelector<RootState, number>(state => state.auth.data.settings.timePomodoro);

  useEffect(() => {
    if (!currentTask) return;
    setValue(currentTask.text);
    setNum(currentTask.pomodor);
  }, [currentTask, timePomodoro]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  };

  useEffect(() => {
    const classes = classNames(
      styles['taskItem'],
      { [styles.active]: currentTask?.id === currentId },
    );
    setClasses(classes);
  }, [currentId]);

  function handleClickLink(event: React.MouseEvent<HTMLElement>, id: number) {
    if ((event?.currentTarget as HTMLElement)?.contains(event?.target as HTMLElement)) {
      onClick(id);
    }
  }

  return (
    <>
      {currentTask && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          className={classes}
          data-id="taskItem"
          onClick={(event: React.MouseEvent<HTMLElement>) => handleClickLink(event, currentTask.id)}
          // onClick={(event: Event) => onClick(currentTask.id)}
        >
          <span className={styles.taskNum}>{num}</span>
          <input
            id={`text_task_id_${currentTask.id}`}
            type='text'
            value={value}
            onChange={handleChange}
            disabled
            size={value.length}
          />
          <Menu taskId={currentTask.id} />
        </a>
      )}
    </>
  );
}
