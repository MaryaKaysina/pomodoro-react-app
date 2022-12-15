import styles from './tasklist.module.css';
import stylesTransitions from '../../../../../app.module.css';

import { Text, EColors } from '../../../../components/Text';
import { TaskItem } from './TaskItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
}

const classes = {
  enter: stylesTransitions['transition-enter'],
  enterActive: stylesTransitions['transition-enter-active'],
  exit: stylesTransitions['transition-exit'],
  exitActive: stylesTransitions['transition-exit-active']
};

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
          <TransitionGroup>
            {tasksSort.map((task) => (
              <CSSTransition
                key={task.id}
                timeout={500}
                classNames={classes}
              >
                <TaskItem key={task.id} task={task} />
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
