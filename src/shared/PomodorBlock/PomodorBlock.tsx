import React from 'react';
import { Button } from '../Button';
import { Text, EColors } from '../Text';
import styles from './pomodorblock.css';
import { Timer } from './Timer';

export function PomodorBlock() {
  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <Text mobileSize={14} size={16} color={EColors.white} bold>Сверстать сайт</Text>
        <Text mobileSize={14} size={16} color={EColors.white}>Помидор 1</Text>
      </div>
      <div className={styles.content}>
        <Timer/>
        <Text As='p' mobileSize={14} size={16} color={EColors.grey99}>
          Задача 1 -
          <Text mobileSize={14} size={16} color={EColors.black}> Сверстать сайт</Text>
        </Text>
        <div className={styles.btns}>
          <Button>Старт</Button>
          <Button isDisabled>Стоп</Button>
        </div>
      </div>
    </div>
  );
}
