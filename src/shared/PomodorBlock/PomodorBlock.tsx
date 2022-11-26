import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRequestAsync, IData } from '../../store/auth/actions';
import { RootState } from '../../store/reducer';
import { Button } from '../Button';
import { DEFAULT_TIME_BREAK } from '../conts';
import { Text, EColors } from '../Text';
import styles from './pomodorblock.css';
import { Timer } from './Timer';

export function PomodorBlock() {
  const [time, setTime] = useState<number>(0);
  const [text, setText] = useState<string>('Введите название задачи');
  const [number, setNumber] = useState<string>('');
  const [classList, setClassList] = useState<string>('');
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [isAfterStart, setIsAfterStart] = useState<boolean>(false);
  const [isBtnStartActive, setIsBtnStartActive] = useState<boolean>(false);

  let startBtnText = 'Старт';
  if (isTimerActive) startBtnText = 'Пауза';
  if (isTimerPaused) startBtnText = 'Продолжить';

  let stopBtnText = isTimerPaused ? 'Стоп' : 'Сделано';

  const data = useSelector<RootState, IData[]>(state => state.auth.data);
  const dispatch = useDispatch<any>();

  const currentAuth = data.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1)[0].auth;
  const currentTasks = data.filter((item) => item.auth === currentAuth)[0].tasks;
  const current = currentTasks.filter((task) => !task.done).sort((a, b) => a.id - b.id)[0];

  useEffect(() => {
    if (current) {
      setText(current.text);
      setNumber(`${currentTasks.indexOf(current) + 1}`);
      setTime(current.time);
    } else {
      setText('Введите название задачи');
      setNumber('');
      setTime(0);
    }
  }, [current]);

  useEffect(() => {
    if (time > 0 && isTimerActive) {
      setTimeout(setTime, 1000, time - 1);
    } else if (time === 0) {
      setIsTimerActive(false);
      current.done = true;
      dispatch(authRequestAsync(data));
      setTime(DEFAULT_TIME_BREAK);
      setIsTimerActive(true);
    } else {
      setIsTimerActive(false);
    }
  }, [isTimerActive, time]);

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
    setIsTimerActive(false);
    current.done = true;
    dispatch(authRequestAsync(data));
    setTime(DEFAULT_TIME_BREAK);
    setIsTimerActive(true);
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
