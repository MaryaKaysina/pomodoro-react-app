import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRequestAsync, IData } from '../../store/auth/actions';
import { RootState } from '../../store/reducer';
import { Button } from '../Button';
import { DEFAULT_TIME_ADD, DEFAULT_TIME_BREAK, DEFAULT_TIME_BREAK_LONG } from '../conts';
import { Text, EColors } from '../Text';
import styles from './pomodorblock.css';
import { Timer } from './Timer';

export function PomodorBlock() {
  const [time, setTime] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('Введите название задачи');
  const [number, setNumber] = useState<string>('');

  const [classList, setClassList] = useState<string>('');
  const [startBtnText, setStartBtnText] = useState<string>('Старт');
  const [stopBtnText, setStopBtnText] = useState<string>('Стоп');

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [isAfterStart, setIsAfterStart] = useState<boolean>(false);
  const [isBtnStartActive, setIsBtnStartActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

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
            if (current) {
              current.time = time - 1;
              current.currentTime = current.currentTime + 1;
              dispatch(authRequestAsync(data));
            }
          }, 1000);
          return () => clearTimeout(currentTimerId);
        } else {
          if (!isBreak) {
            current.done = true;
            current.updateddAt = Date.now();
            dispatch(authRequestAsync(data));
            setCount(count + 1);
            setStopBtnText('Пропустить');
          }
          setIsTimerActive(false);
          setIsBreak(!isBreak);
          setStartBtnText('Старт');
          setIsAfterStart(false);
        }
      }
    }
  }, [isTimerActive, time])

  useEffect(() => {
    const classes = classNames(
      styles['block'],
      { [styles.isTimerPaused]: isTimerPaused },
      { [styles.isBtnStartActive]: isBtnStartActive && isAfterStart },
    );
    setClassList(classes);
  }, [isTimerPaused, isBtnStartActive]);

  function handleClickStart() {
    if (current) {
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
    if (current) {
      current.done = true;
      current.skip = true;
      current.updateddAt = Date.now();
      dispatch(authRequestAsync(data));
      setCount(count + 1);
      setIsBreak(true);
      setIsTimerActive(false);
      setIsAfterStart(false);
      setStartBtnText('Старт');
      setStopBtnText('Пропустить');
    }
  };

  function handleClickAddTime() {
    if (current) {
      current.time = current.time + DEFAULT_TIME_ADD;
      current.updateddAt = Date.now();
      dispatch(authRequestAsync(data));
      setTime(current.time);
    }
  }

  return (
    <div className={classList}>
      <div className={styles.header}>
        <Text mobileSize={14} size={16} color={EColors.white} bold>{text}</Text>
        <Text mobileSize={14} size={16} color={EColors.white}>
          {number.length !== 0 ? `Помидор ${number}` : ''}
        </Text>
      </div>
      <div className={styles.content}>
        <Timer time={time} onClick={handleClickAddTime}/>
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
            isDisabled = {!isTimerActive && !isTimerPaused && !isBreak}
            isDanger
            onClick={handleClickEnd}
          >
            {stopBtnText}
          </Button>
        </div>
      </div>
    </div>
  );
}
