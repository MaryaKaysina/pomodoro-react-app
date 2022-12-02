import React from 'react';
import { Text, EColors } from '../../Text';
import styles from './dayblock.css';

interface IDayBlock {
  day?: number;
  time?: number;
}

export function DayBlock({ day = 0, time = 0 }: IDayBlock) {
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
    var num = value % 10;
    console.log(num);

    if(value > 10 && value < 20) return words[2];
    if(num > 1 && num < 5) return words[1];
    if(num == 1) return words[0];
    return words[2];
  }

  const formatHours = [' часа ',' часов ',' часа '];
  const formatMinutes = [' минуты ',' минут ',' минуты '];
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
          {hours > 0 && hours + numWord(time%60, formatHours)}
          {minutes > 0 && minutes + numWord(time%60, formatMinutes)}
          {seconds > 0 && seconds + numWord(time%60, formatSeconds)}
        </Text>
      </Text>)}
      {time === 0 && (<Text mobileSize={12} size={16} color={EColors.black}>
        Нет данных
      </Text>)}
    </div>
  );
}
