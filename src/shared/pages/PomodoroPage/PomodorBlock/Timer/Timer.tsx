import { Icon } from 'src/shared/components/Icon';
import { Text } from 'src/shared/components/Text';

import { EColors } from 'src/shared/components/Text/text.interface';
import { EIcons } from 'src/shared/components/Icon/icon.interface';
import { ITimer } from './timer.interface';

import styles from './timer.module.css';

const formatTime = (time: number) => {
  if (time < 10) return `0${time}`;
  return time;
}

export const Timer = ({ time, onClick = () => {} }: ITimer) => {
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
