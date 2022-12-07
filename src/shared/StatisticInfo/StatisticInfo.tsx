import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IData } from '../../store/auth/actions';
import { RootState } from '../../store/reducer';
import { CardItem } from './CardItem';
import { CountBlock } from './CountBlock';
import { DayBlock } from './DayBlock';
import { DiagramBlock } from './DiagramBlock';
import styles from './statisticinfo.css';

interface IStatisticInfo {
  currentDay?: number;
}

function formatDate(date: Date) {
  return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + (date.getUTCDate());
};

export function StatisticInfo({ currentDay = 0 }: IStatisticInfo) {
  const [day, setDay] = useState<number>(0);
  const [dayTime, setDayTime] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [focus, setFocus] = useState<number>(0);
  const [pause, setPause] = useState<number>(0);
  const [stop, setStop] = useState<number>(0);
  const [weekTasks, setWeekTasks] = useState<number[]>([]);
  const data = useSelector<RootState, IData[]>(state => state.auth.data);
  const currentData = data.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1)[0];

  useEffect(() => {
    const tasks = currentData.tasks;
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

    const currentTasks = tasks.filter(function (task) {
      return task.updateddAt >= Date.parse(week[0]) &&
      task.updateddAt <= Date.parse(week[6]);
    });

    const taskWeek = [];
    for (let i = 0; i < 7; i++) {
      let taskItem = 0;
      currentTasks.forEach((task) => {
        if (formatDate(new Date(task.updateddAt)) === week[i] && !task.skip) {
          taskItem = taskItem + task.currentTime;
        }
      })
      taskWeek.push(taskItem)
    };

    const dayTasks = tasks.filter(function (task) {
      return formatDate(new Date(task.updateddAt)) === week[currentDay] &&
        task.done &&
        !task.skip;
    });

    const currentStop = tasks.filter(function (task) {
      return formatDate(new Date(task.updateddAt)) === week[currentDay] &&
      task.done &&
      task.skip;
    });

    const currentPause = currentData.pauseTime
      .filter(pause => formatDate(new Date(pause.createdAt)) === week[currentDay])
      .map(pause => pause.time)
      .reduce((item, acc) => item + acc, 0);

    const timeTask = dayTasks.map((task) => task.currentTime).reduce((item, acc) => item + acc, 0);
    const currentFocus = Math.ceil(timeTask / (timeTask + currentPause) * 100);

    setWeekTasks(taskWeek);
    setDay(offset[new Date(week[currentDay]).getDay()]);
    setDayTime(timeTask);
    setCount(dayTasks.length);

    setFocus(currentFocus);
    setPause(currentPause / 60);
    setStop(currentStop.length);
  }, [data]);

  return (
    <div className={styles.infoBlock}>
      <div className={styles.day}><DayBlock day={day} time={dayTime}/></div>
      <div className={styles.count}><CountBlock count={count}/></div>
      <div className={styles.diagram}><DiagramBlock tasks={weekTasks} currentDay={currentDay}/></div>
      <div className={styles.cards}>
        <CardItem type='focus' num={focus} />
        <CardItem type='pause' num={pause} />
        <CardItem type='stop' num={stop} />
      </div>
    </div>
  );
}
