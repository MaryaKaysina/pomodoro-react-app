import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IData } from 'src/store/auth/actions';
import { updateCurrentDay } from 'src/store/current_day';
import { RootState } from 'src/store/reducer';
import { getWeek, formatDate } from 'src/utils/js/getWeek';

import { CardItem } from 'src/shared/pages/StatisticPage/StatisticInfo/CardItem';
import { CountBlock } from 'src/shared/pages/StatisticPage/StatisticInfo/CountBlock';
import { DayBlock } from 'src/shared/pages/StatisticPage/StatisticInfo/DayBlock';
import { DiagramBlock } from 'src/shared/pages/StatisticPage/StatisticInfo/DiagramBlock';

import styles from './statisticinfo.module.css';

export const StatisticInfo = () => {
  const [dayTime, setDayTime] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);
  const [focus, setFocus] = React.useState<number>(0);
  const [pause, setPause] = React.useState<number>(0);
  const [stop, setStop] = React.useState<number>(0);
  const [weekTasks, setWeekTasks] = React.useState<number[]>([]);
  const currentData = useSelector<RootState, IData>(state => state.auth.data);

  const currentDay = useSelector<RootState, number>(state => state.currentDay);
  const currentWeek = useSelector<RootState, number>(state => state.currentWeek);

  const dispatch = useDispatch<any>();

  React.useEffect(() => {
    const today = new Date();
    const weekNum = [6, 0, 1, 2, 3, 4, 5]
    dispatch(updateCurrentDay(weekNum[today.getDay()]));
  }, [])

  React.useEffect(() => {
    if (currentData.auth.length === 0) return;
    const tasks = currentData.tasks;
    if (tasks.length === 0) return;

    const offset = [6, 0, 1, 2, 3, 4, 5];
    const week = getWeek(currentWeek);

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
    const currentFocus = timeTask > 0 ? Math.ceil(timeTask / (timeTask + currentPause) * 100) : 0;

    setWeekTasks(taskWeek);
    setDayTime(timeTask);
    setCount(dayTasks.length);

    setFocus(currentFocus);
    setPause(Math.ceil(currentPause / 60));
    setStop(currentStop.length);
  }, [currentDay, currentWeek]);

  return (
    <div className={styles.infoBlock}>
      <div className={styles.day}><DayBlock day={currentDay} time={dayTime}/></div>
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
