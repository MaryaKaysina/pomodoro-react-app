import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './pomodorblock.module.css';
import stylesTransitions from '../../../../app.module.css';

import { IData, ITask, authRequestAsync } from '../../../../store/auth/actions';
import { RootState } from '../../../../store/reducer';
import { DEFAULT_TIME_ADD } from '../../../../utils/conts';
import { Button } from '../../../components/Button';
import { Timer } from './Timer';
import { Notification } from '../../../components/Notification';
import { Header } from './Header';
import { Description } from './Description';

const classes = {
  enter: stylesTransitions['timer-enter'],
  enterActive: stylesTransitions['timer-enter-active'],
  exit: stylesTransitions['timer-exit'],
  exitActive: stylesTransitions['timer-exit-active']
};

export function PomodorBlock() {
  const [time, setTime] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('Введите название задачи');
  const [number, setNumber] = useState<string>('');
  const [pomodor, setPomodor] = useState<string>('');
  const [pauseTime, setPauseTime] = useState<number>(0);

  const [classList, setClassList] = useState<string>('');
  const [startBtnText, setStartBtnText] = useState<string>('Старт');
  const [stopBtnText, setStopBtnText] = useState<string>('Стоп');

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [isAfterStart, setIsAfterStart] = useState<boolean>(false);
  const [isBtnStartActive, setIsBtnStartActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [current, setCurrent] = useState<ITask>();

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

  useEffect(() => {
    const currentTaskActive = currentTasks.filter((task) => task.id === currentTaskId && !task.done);

    const current = currentTaskActive.length !== 0 ?
      currentTaskActive[0] :
      currentTasks.filter((task) => !task.done).sort((a, b) => a.id - b.id)[0];
    setCurrent(current);
  }, [currentTasks, currentTaskId]);

  useEffect(() => {
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
      setPomodor(current ? `${Math.ceil(current.time / timePomodoro)}` : '');
      setTime(current ? current.time - current.currentTime : 0);
    }
  }, [current, isBreak, currentData]);

  useEffect(() => {
    function isActiveTask(currentData: IData, current: ITask) {
      if (current && !isBreak) {
        if (time > 0) {
          currentTimerId = setTimeout(() => {
            setTime(time - 1);
            current.currentTime = current.currentTime + 1;
            dispatch(authRequestAsync(currentData));
          }, 1000);
        } else {
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

  useEffect(() => {
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
