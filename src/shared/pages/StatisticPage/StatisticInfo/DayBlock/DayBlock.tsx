import { Text } from 'src/shared/components/Text';

import { EColors } from 'src/shared/components/Text/text.interface';
import { IDayBlock } from './dayblock.interface';

import styles from './dayblock.module.css';

export const DayBlock = ({ day = 0, time = 0 }: IDayBlock) => {
  const weekDay = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресение'
  ];

  function numWord(value: number, words: string[]){
    value = Math.abs(value) % 100;
    const num = value % 10;

    if(value > 10 && value < 20) return words[2];
    if(num > 1 && num < 5) return words[1];
    if(num === 1) return words[0];
    return words[2];
  }

  const formatHours = [' часа ',' часов ',' часа '];
  const formatMinutes = [' минуты ',' минут ',' минут '];
  const formatSeconds = [' секунды ',' секунд ',' секунд '];

  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60)%60;
  const seconds = time%60;

  return (
    <div className={styles.dayBlock}>
      <Text As='h3' mobileSize={16} size={24} color={EColors.black}>{weekDay[day]}</Text>
      {time > 0 && (<Text mobileSize={12} size={16} color={EColors.black}>
        Вы работали над задачами в течение
        <Text mobileSize={12} size={16} color={EColors.red} bold>
          {hours > 0 && hours + numWord(hours, formatHours)}
          {minutes > 0 && minutes + numWord(minutes, formatMinutes)}
          {seconds > 0 && seconds + numWord(seconds, formatSeconds)}
        </Text>
      </Text>)}
      {time === 0 && (<Text mobileSize={12} size={16} color={EColors.black}>
        Нет данных
      </Text>)}
    </div>
  );
}
