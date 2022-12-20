import styles from './tasklist.module.css';
import stylesTransitions from '../../../../../app.module.css';

import { Text, EColors } from '../../../../components/Text';
import { TaskItem } from './TaskItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ISettings } from '../../../../../store/setSettings';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IData, ITask } from '../../../../../store/auth/actions';
import { RootState } from '../../../../../store/reducer';

interface ITaskItem {
  id: number;
  text: string;
  time: number;
  currentTime: number;
  createdAt: number;
  updateddAt: number;
  done: boolean;
  skip: boolean;
}

interface ITaskList {
  tasks: ITaskItem[];
  settings: ISettings;
  onClick?: (id: number) => void;
  auth: string;
}

const NOOP = () => {};

const classes = {
  enter: stylesTransitions['transition-enter'],
  enterActive: stylesTransitions['transition-enter-active'],
  exit: stylesTransitions['transition-exit'],
  exitActive: stylesTransitions['transition-exit-active']
};

export function TaskList({ settings, onClick = NOOP }: ITaskList) {
  const [currentTaskActive, setCurrentTaskActive] = useState<number>(0);
  const [tasks, setTasks] = useState<ITask[]>([])

  const data = useSelector<RootState, IData>(state => state.auth.data);
  const currentTask = useSelector<RootState, number>(state => state.auth.data.currentTask);
  const currentTasks = useSelector<RootState, ITask[]>(state => state.auth.data.tasks)
    .filter((task) => !task.done);

  useEffect(() => {
    if (currentTasks.length === tasks.length) return;

    const tasksSort = currentTasks.sort((a, b) => a.id - b.id);
    setTasks(tasksSort);

    const current = tasksSort.filter((task) => task.id === data.currentTask)[0];
    if (current) {
      setCurrentTaskActive(data.currentTask);
    } else {
      const currentId = tasksSort[0]?.id;
      setCurrentTaskActive(currentId);
      onClick(currentId);
      setCurrentTaskActive(currentId);
    }
  }, [currentTasks, currentTask])

  const allTime = tasks?.reduce((acc, task) => task.time + acc, 0) / 60 || 0;
  let allTimeText = '';

  if (allTime < 60) {
    if (allTime * 10 % 10 === 0) {
      allTimeText = `${allTime} мин`;
    } else {
      allTimeText = `${allTime.toFixed(2).toString()} мин`;
    }

  } else if (allTime%60 !== 0) {
    allTimeText = `${Math.floor(allTime / 60)} час ${(allTime%60)} мин`;
  } else {
    allTimeText = `${Math.floor(allTime / 60)} час`;
  }

  function handleClick(id: number) {
    setCurrentTaskActive(id);
    onClick(id);
  }

  return (
    <>
    {tasks?.length > 0 && (
      <>
        <ul className={styles.taskList} id="taskList">
          <TransitionGroup>
            {tasks.map((task) => (
              <CSSTransition
                key={task.id}
                timeout={500}
                classNames={classes}
              >
                <TaskItem
                  key={task.id}
                  task={task}
                  timeToOne={settings?.timePomodoro}
                  currentId={currentTaskActive}
                  onClick={() => handleClick(task.id)}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
        <Text mobileSize={12} size={16} color={EColors.grey99}>{allTimeText}</Text>
      </>
    )}
    </>
  );
}
