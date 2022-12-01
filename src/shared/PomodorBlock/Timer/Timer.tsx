import React from 'react';
import { Icon, EIcons } from '../../Icon';
import { Text, EColors } from '../../Text';
import styles from './timer.css';

interface ITimer {
  time?: number;
  onClick?: () => void;
}

const NOOP = () => {};

function formatTime(time: number) {
  if (time < 10) return `0${time}`;
  return time;
}

export function Timer({ time, onClick = NOOP }: ITimer) {
  let timeText = '00:00';

  if (time) {
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60)%60;
    const seconds = time%60;
    timeText = hours === 0
    ? `${formatTime(minutes)}:${formatTime(seconds)}`
    : `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  }

  return (
    <div className={styles.timer}>
      <Text As='h3' mobileSize={14} size={16} color={EColors.black}>{timeText}</Text>
      <button className={styles.addButton} onClick={onClick}>
        <Icon name={EIcons.addIcon} />
      </button>
    </div>
  );
}
