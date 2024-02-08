import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Text } from 'src/shared/components/Text';
import { TaskItem } from 'src/shared/pages/PomodoroPage/FormBlock/TaskList/TaskItem';

import { EColors } from 'src/shared/components/Text/text.interface';
import { ITaskList } from './tasklist.interface';

import stylesTransitions from 'src/app.module.css';
import styles from './tasklist.module.css';
import { useCurrentTaskList } from 'src/hooks/useCurrentTaskList';

const classes = {
  enter: stylesTransitions['transition-enter'],
  enterActive: stylesTransitions['transition-enter-active'],
  exit: stylesTransitions['transition-exit'],
  exitActive: stylesTransitions['transition-exit-active']
};

export const TaskList = ({ onClick = () => {} }: ITaskList) => {
  const {
    tasks,
    currentTaskActiveId,
    allTimeText,
    setCurrentTaskActiveId
  } = useCurrentTaskList(onClick);

  function handleClick(id: number) {
    setCurrentTaskActiveId(id);
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
                  taskId={task.id}
                  currentId={currentTaskActiveId}
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
