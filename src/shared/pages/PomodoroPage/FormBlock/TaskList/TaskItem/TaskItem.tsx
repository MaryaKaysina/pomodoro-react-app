import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { ITask } from 'src/store/auth/actions';
import { RootState } from 'src/store/reducer';
import { Menu } from 'src/shared/pages/PomodoroPage/FormBlock/TaskList/TaskItem/Menu';

import { ITaskItem } from './taskitem.interface';

import styles from './taskitem.module.css';

export const TaskItem = ({ taskId, onClick = () => {}, currentId }: ITaskItem) => {
  const [value, setValue] = React.useState('');
  const [num, setNum] = React.useState(1);
  const [classes, setClasses] = React.useState('');

  const currentTask = useSelector<RootState, ITask[]>(state => state.auth.data.tasks)
    .filter((task) => task.id === taskId)[0];
  const timePomodoro = useSelector<RootState, number>(state => state.auth.data.settings.timePomodoro);

  React.useEffect(() => {
    if (!currentTask) return;
    setValue(currentTask.text);
    setNum(currentTask.pomodor);
  }, [currentTask, timePomodoro]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  };

  React.useEffect(() => {
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
