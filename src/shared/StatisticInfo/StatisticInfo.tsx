import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IData } from '../../store/auth/actions';
import { RootState } from '../../store/reducer';
import { CardItem } from './CardItem';
import { CountBlock } from './CountBlock';
import { DayBlock } from './DayBlock';
import { DiagramBlock } from './DiagramBlock';
import styles from './statisticinfo.css';

export function StatisticInfo() {
  const [day, setDay] = useState<number>(0);
  const [dayTime, setDayTime] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const data = useSelector<RootState, IData[]>(state => state.auth.data);

  function formatDate(date: Date) {
    return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + (date.getUTCDate());
  };

  useEffect(() => {
    const tasks = data.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1)[0].tasks;
    if (tasks.length === 0) return;

    const now = new Date();
    const offset = [6, 0, 1, 2, 3, 4, 5];
    const week: string[] = [];

    const mondayStr = new Date(now.setDate(now.getDate() - offset[now.getDay()]));

    week.push(formatDate(mondayStr));
    for (let i = 0; i < 6; i++) {
      const day = new Date(mondayStr.setDate(mondayStr.getDate() + 1));
      week.push(formatDate(day));
    }

    const currentTasks = tasks.filter((task) => formatDate(new Date(task.updateddAt)) >= week[0] &&
      formatDate(new Date(task.updateddAt)) <= week[6]);

    const dayTasks = tasks.filter(function (task) {
      return formatDate(new Date(task.updateddAt)) === week[0] &&
        task.done &&
        !task.skip;
    });

    var timeTask = dayTasks.map((task) => task.currentTime).reduce((item, acc) => item + acc, 0);

    setDay(offset[new Date(week[0]).getDay()]);
    setDayTime(timeTask);
    setCount(dayTasks.length);

    // console.log(formatDate(mondayStr));
    // console.log(timeTask);
  }, [data]);

  const focusNum = 0;
  const pauseNum = 0;
  const stopNum = 0;

  return (
    <div className={styles.infoBlock}>
      <div className={styles.day}><DayBlock day={day} time={dayTime}/></div>
      <div className={styles.count}><CountBlock count={count}/></div>
      <div className={styles.diagram}><DiagramBlock/></div>
      <div className={styles.cards}>
        <CardItem type='focus' num={focusNum} />
        <CardItem type='pause' num={pauseNum} />
        <CardItem type='stop' num={stopNum} />
      </div>
    </div>
  );
}
