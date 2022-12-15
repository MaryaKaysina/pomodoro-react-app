import { Icon, EIcons } from '../../../../components/Icon';
import { Text, EColors } from '../../../../components/Text';

import styles from './timer.module.css';

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
    <>
      <div className={styles.timer}>
        <Text As='h3' mobileSize={14} size={16} color={EColors.black}>{timeText}</Text>
      </div>
      <button className={styles.addButton} onClick={onClick}>
        <Icon name={EIcons.addIcon} />
      </button>
    </>
  );
}
