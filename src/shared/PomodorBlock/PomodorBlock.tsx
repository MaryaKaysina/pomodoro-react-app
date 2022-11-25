import React from 'react';
import { useSelector } from 'react-redux';
import { IData } from '../../store/auth/actions';
import { RootState } from '../../store/reducer';
import { Button } from '../Button';
import { Text, EColors } from '../Text';
import styles from './pomodorblock.css';
import { Timer } from './Timer';

export function PomodorBlock() {
  const data = useSelector<RootState, IData[]>(state => state.auth.data);

  const currentAuth = data.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1)[0].auth;
  const currentTasks = data.filter((item) => item.auth === currentAuth)[0].tasks;

  const current = currentTasks.filter((task) => !task.done).sort((a, b) => a.id - b.id)[0];
  let text = 'Введите название задачи';
  let number = '';
  let time = 0;

  if (current) {
    text = current.text;
    number = `${currentTasks.indexOf(current) + 1}`;
    time = current.time;
  }

  return (
    <div className={styles.block}>
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
          <Button>Старт</Button>
          <Button isDisabled>Стоп</Button>
        </div>
      </div>
    </div>
  );
}
