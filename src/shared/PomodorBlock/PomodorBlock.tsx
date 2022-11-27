import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRequestAsync, IData } from '../../store/auth/actions';
import { RootState } from '../../store/reducer';
import { Button } from '../Button';
import { DEFAULT_TIME_BREAK, DEFAULT_TIME_BREAK_LONG } from '../conts';
import { Text, EColors } from '../Text';
import styles from './pomodorblock.css';
import { Timer } from './Timer';

export function PomodorBlock() {
  const [time, setTime] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('Введите название задачи');
  const [number, setNumber] = useState<string>('');
  const [classList, setClassList] = useState<string>('');
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [isAfterStart, setIsAfterStart] = useState<boolean>(false);
  const [isBtnStartActive, setIsBtnStartActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

  let startBtnText = 'Старт';
  if (isTimerActive) startBtnText = 'Пауза';
  if (isTimerPaused) startBtnText = 'Продолжить';

  let stopBtnText = isTimerPaused ? 'Стоп' : 'Сделано';

  const data = useSelector<RootState, IData[]>(state => state.auth.data);
  const currentAuth = data.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1)[0].auth;
  const currentTasks = data.filter((item) => item.auth === currentAuth)[0].tasks;
  const current = currentTasks.filter((task) => !task.done).sort((a, b) => a.id - b.id)[0];

  const dispatch = useDispatch<any>();

  useEffect(() => {
    setText(current ? current.text : 'Введите название задачи');
    setNumber(current ? `${currentTasks.indexOf(current) + 1}` : '');
    setTime(current ? current.time : 0);

    if (isBreak) {
      setText('Перерыв');
      setNumber('');
      if (count < 4) {
        setTime(DEFAULT_TIME_BREAK);
      } else {
        setTime(DEFAULT_TIME_BREAK_LONG);
        setCount(0);
      }
    }
  }, [current, isBreak]);

  useEffect(() => {
    if (current || isBreak) {
      if (isTimerActive) {
        if (time > 0) {
          const currentTimerId = setTimeout(() => {
            setTime(time - 1);
            clearTimeout(currentTimerId);
          }, 1000);
        } else {
          if (!isBreak) {
            current.done = true;
            dispatch(authRequestAsync(data));
            setCount(count + 1);
          }
          setIsTimerActive(false);
          setIsBreak(!isBreak);
        }
      }
    }
  }, [isTimerActive, time])

  // useEffect(() => {
  //   const current = currentTasks.filter((task) => !task.done).sort((a, b) => a.id - b.id)[0];
  //   setCurrentTask(current);
  //   console.log('currentTask', currentTask);
  // }, [currentTasks])

  // useEffect(() => {
  //   if (isBreak) {
  //     setText('Перерыв');
  //     setNumber('');
  //     setTime(DEFAULT_TIME_BREAK);
  //     return;
  //   }

  //   if (currentTask && currentTask?.id !== -1) {
  //     setText(currentTask.text);
  //     setNumber(`${currentTasks.indexOf(currentTask) + 1}`);
  //     setTime(currentTask.time);
  //   } else {
  //     setText('Введите название задачи');
  //     setNumber('');
  //     setTime(0);
  //   }
  // }, [isTimerActive]);

  // useEffect(() => {

  //   if (isBreak) {

  //     if (time > 0) {
  //       const currentTimerId = setTimeout(() => {
  //         setTime(time - 1);
  //         clearTimeout(currentTimerId);
  //       }, 1000);
  //     } else {
  //       setIsBreak(false);
  //       setIsTimerActive(false);
  //     }
  //   } else if (isTimerActive && currentTask?.id !== -1 ) {

  //     if (time > 0) {
  //       const currentTimerId = setTimeout(() => {
  //         setTime(time - 1);
  //         clearTimeout(currentTimerId);
  //       }, 1000);
  //     } else {
  //       currentTask.done = true;
  //       dispatch(authRequestAsync(data));
  //       setIsTimerActive(false);
  //       setIsBreak(true);
  //     }
  //   }
  //   else {
  //     setIsTimerActive(false);
  //   }
  // }, [isBreak, isTimerActive, time]);

  useEffect(() => {
    const classes = classNames(
      styles['block'],
      { [styles.isTimerPaused]: isTimerPaused },
      { [styles.isBtnStartActive]: isBtnStartActive && isAfterStart },
    );
    setClassList(classes);
  }, [isTimerPaused, isBtnStartActive]);

  function handleClickStart() {
    if (!isTimerActive && !isTimerPaused) {
      setIsTimerActive(true);
      setIsAfterStart(true);
    }
    if (isTimerActive && !isTimerPaused) {
      setIsTimerActive(false);
      setIsTimerPaused(true);
    }
    if (isTimerPaused) {
      setIsTimerActive(true);
      setIsTimerPaused(false);
    }
  };

  function handleClickEnd() {
    // currentTask.done = true;
    // setIsTimerActive(false);
    // dispatch(authRequestAsync(data));
    // setIsBreak(true);
  };



  return (
    <div className={classList}>
      <div className={styles.header}>
        <Text mobileSize={14} size={16} color={EColors.white} bold>{text}</Text>
        <Text mobileSize={14} size={16} color={EColors.white}>
          {number.length !== 0 ? `Помидор ${number}` : ''}
        </Text>
      </div>
      <div className={styles.content}>
        <Timer time={time}/>
        {number.length !== 0 && (
          <Text As='p' mobileSize={14} size={16} color={EColors.grey99}>
            Задача {number} -
            <Text mobileSize={14} size={16} color={EColors.black}> {text}</Text>
          </Text>
        )}
        <div className={styles.btns}>
          <Button
            onClick={handleClickStart}
            onMouseDown={() => setIsBtnStartActive(true)}
            onMouseUp={() => setIsBtnStartActive(false)}
          >
            {startBtnText}
          </Button>
          <Button
            isDisabled = {!isTimerActive && !isTimerPaused}
            isDanger = {isTimerActive && !isTimerPaused}
            isDangerBg = {isTimerPaused}
            onClick={handleClickEnd}
          >
            {stopBtnText}
          </Button>
        </div>
      </div>
    </div>
  );
}
