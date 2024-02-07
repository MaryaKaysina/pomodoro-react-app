import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import { IData, ITask, authRequestAsync } from 'src/store/auth/actions';
import { RootState } from 'src/store/reducer';
import { DEFAULT_TIME_ADD } from 'src/utils/conts';
import { Button } from 'src/shared/components/Button';
import { Notification } from 'src/shared/components/Notification';
import { Timer } from 'src/shared/pages/PomodoroPage/PomodorBlock/Timer';
import { Header } from 'src/shared/pages/PomodoroPage/PomodorBlock/Header';
import { Description } from 'src/shared/pages/PomodoroPage/PomodorBlock/Description';

import stylesTransitions from 'src/app.module.css';
import styles from './pomodorblock.module.css';

const classes = {
  enter: stylesTransitions['timer-enter'],
  enterActive: stylesTransitions['timer-enter-active'],
  exit: stylesTransitions['timer-exit'],
  exitActive: stylesTransitions['timer-exit-active']
};

export const PomodorBlock = () => {
  const [time, setTime] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);
  const [text, setText] = React.useState<string>('Введите название задачи');
  const [number, setNumber] = React.useState<string>('');
  const [pomodor, setPomodor] = React.useState<number>(0);
  const [pauseTime, setPauseTime] = React.useState<number>(0);

  const [classList, setClassList] = React.useState<string>('');
  const [startBtnText, setStartBtnText] = React.useState<string>('Старт');
  const [stopBtnText, setStopBtnText] = React.useState<string>('Стоп');

  const [isTimerActive, setIsTimerActive] = React.useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = React.useState<boolean>(false);
  const [isAfterStart, setIsAfterStart] = React.useState<boolean>(false);
  const [isBtnStartActive, setIsBtnStartActive] = React.useState<boolean>(false);
  const [isBreak, setIsBreak] = React.useState<boolean>(false);
  const [isNotification, setIsNotification] = React.useState<boolean>(false);
  const [current, setCurrent] = React.useState<ITask>();

  const currentData = useSelector<RootState, IData>(state => state.auth.data);

  const currentTasks = useSelector<RootState, ITask[]>(state => state.auth.data.tasks);
  const currentTaskId = useSelector<RootState, number>(state => state.auth.data.currentTask);

  const timePomodoro = currentData.settings?.timePomodoro;
  const timeShortBreak = currentData.settings?.timeShortBreak;
  const timeLongBreak = currentData.settings?.timeLongBreak;
  const isActivePush = currentData.settings?.isActivePush;
  const frequencyLongBreak = currentData.settings?.frequencyLongBreak;

  const dispatch = useDispatch<any>();
  let currentTimerId: any;

  React.useEffect(() => {
    const currentTaskActive = currentTasks.filter((task) => task.id === currentTaskId && !task.done);

    const current = currentTaskActive.length !== 0 ?
      currentTaskActive[0] :
      currentTasks.filter((task) => !task.done).sort((a, b) => a.id - b.id)[0];
    setCurrent(current);
  }, [currentTasks, currentTaskId]);

  React.useEffect(() => {
    if (isBreak) {
      setText('Перерыв');
      setNumber('');
      if (count < (frequencyLongBreak - 1)) {
        setTime(timeShortBreak);
        setPauseTime(timeShortBreak);
      } else {
        setTime(timeLongBreak);
        setPauseTime(timeLongBreak);
        setCount(0);
      }
    } else {
      setText(current ? current.text : 'Введите название задачи');
      setNumber(current ? `${current.id + 1}` : '');
      setPomodor(current ? current.currentPomodor : 0);
      setTime(current ? current.time * current.currentPomodor - current.currentTime : 0);
    }
  }, [current, isBreak, currentData]);

  React.useEffect(() => {
    function isActiveTask(currentData: IData, current: ITask) {
      if (current && !isBreak) {
        if (time > 0) {
          currentTimerId = setTimeout(() => {
            setTime(time - 1);
            current.currentTime = current.currentTime + 1;
            dispatch(authRequestAsync(currentData));
          }, 1000);
        } else if (pomodor === current.pomodor) {
          current.done = true;
          current.updateddAt = Date.now();
          currentData.currentTask = currentData.currentTask + 1;
          dispatch(authRequestAsync(currentData));
          setCount(count + 1);
          setIsTimerActive(false);
          setIsBreak(true);
          setIsAfterStart(false);
          setStopBtnText('Пропустить');
          setStartBtnText('Старт');
          setIsNotification(true);
          setPomodor(0);
        } else {
          setPomodor(0);
          current.currentPomodor = current.currentPomodor + 1;
          dispatch(authRequestAsync(currentData));
          setTime(current.time);
          setCount(count + 1);
          setIsTimerActive(false);
          setIsBreak(true);
          setIsAfterStart(false);
          setStopBtnText('Пропустить');
          setStartBtnText('Старт');
          setIsNotification(true);
        }
      }
    };

    function isActiveBreak(currentData: IData) {
      if (isBreak) {
        if (time > 0) {
          currentTimerId = setTimeout(() => {
            setTime(time - 1);
          }, 1000);
        } else {
          currentData.pauseTime.push({ createdAt: Date.now(), time: pauseTime });
          dispatch(authRequestAsync(currentData));
          setIsBreak(false);
          setIsTimerActive(false);
          setStartBtnText('Старт');
          setIsAfterStart(false);
          setIsNotification(true);
        }
      }
    };

    if (isTimerActive) {
      if (current && !isBreak) isActiveTask(currentData, current);
      if (isBreak) isActiveBreak(currentData);
    }
  }, [isTimerActive, time, current, isBreak])

  React.useEffect(() => {
    const classes = classNames(
      styles['block'],
      { [styles.isTimerPaused]: isTimerPaused },
      { [styles.isBtnStartActive]: isBtnStartActive && isAfterStart },
    );
    setClassList(classes);
  }, [isTimerPaused, isBtnStartActive]);

  function handleClickStart() {
    setIsNotification(false);
    if (current && !isBreak) {
      if (!isTimerActive && !isTimerPaused) {
        setIsTimerActive(true);
        setIsAfterStart(true);
        setStartBtnText('Пауза');
        setStopBtnText('Стоп');
      }
      if (isTimerActive && !isTimerPaused) {
        setIsTimerActive(false);
        setIsTimerPaused(true);
        setStartBtnText('Продолжить');
        setStopBtnText('Сделано');
      }
      if (isTimerPaused) {
        setIsTimerActive(true);
        setIsTimerPaused(false);
        setStartBtnText('Пауза');
        setStopBtnText('Стоп');
      }
    }
    if (isBreak) {
      setStopBtnText('Пропустить');
      if (!isTimerActive && !isTimerPaused) {
        setIsTimerActive(true);
        setIsAfterStart(true);
        setStartBtnText('Пауза');
      }
      if (isTimerActive && !isTimerPaused) {
        setIsTimerActive(false);
        setIsTimerPaused(true);
        setStartBtnText('Продолжить');
      }
      if (isTimerPaused) {
        setIsTimerActive(true);
        setIsTimerPaused(false);
        setStartBtnText('Пауза');
      }
    }
  };

  function handleClickEnd() {
    clearTimeout(currentTimerId);
    if (current && !isBreak) {
      current.done = true;
      current.skip = true;
      current.updateddAt = Date.now();
      currentData.currentTask = currentData.currentTask + 1;
      dispatch(authRequestAsync(currentData));
      setCount(count + 1);
      setIsBreak(true);
      setIsTimerActive(false);
      setIsAfterStart(false);
      setStartBtnText('Старт');
      setStopBtnText('Пропустить');
    }
    if (isBreak) {
      setIsBreak(false);
      setIsTimerActive(false);
      setIsAfterStart(false);
      setStartBtnText('Старт');
      setStopBtnText('Стоп');
    }
  };

  function handleClickAddTime() {
    if (current) {
      current.time = current.time - current.currentTime + DEFAULT_TIME_ADD;
      current.updateddAt = Date.now();
      dispatch(authRequestAsync(currentData));
      setTime(current.time);
    }
  }

  return (
    <div className={classList}>
      <Header title={text} number={pomodor} />
      <div className={styles.content}>
        <TransitionGroup>
          <CSSTransition key={time} timeout={200} classNames={classes}>
            <Timer time={time} onClick={handleClickAddTime}/>
          </CSSTransition>
        </TransitionGroup>
        <Description title={text} number={number} />
        <div className={styles.btns}>
          <Button
            onClick={handleClickStart}
            onMouseDown={() => setIsBtnStartActive(true)}
            onMouseUp={() => setIsBtnStartActive(false)}
          >
            {startBtnText}
          </Button>
          <Button
            isDisabled = {!isTimerActive && !isTimerPaused && !isBreak}
            isDanger
            onClick={handleClickEnd}
          >
            {stopBtnText}
          </Button>
        </div>
      </div>
      {isActivePush && isNotification && <Notification />}
    </div>
  );
}
