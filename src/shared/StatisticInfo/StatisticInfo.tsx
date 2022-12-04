import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IData } from '../../store/auth/actions';
import { RootState } from '../../store/reducer';
import { CardItem } from './CardItem';
import { CountBlock } from './CountBlock';
import { DayBlock } from './DayBlock';
import { DiagramBlock } from './DiagramBlock';
import styles from './statisticinfo.css';

export function StatisticInfo() {
  const data = useSelector<RootState, IData[]>(state => state.auth.data);

  const now = new Date;
  const monday = new Date(now.setDate(now.getDate() - now.getDay() + 1));
  const sunday = new Date(now.setDate(now.getDate() - now.getDay() + 7));
  console.log(monday);
  console.log(sunday);

  const focusNum = 0;
  const pauseNum = 0;
  const stopNum = 0;

  return (
    <div className={styles.infoBlock}>
      <div className={styles.day}><DayBlock/></div>
      <div className={styles.count}><CountBlock/></div>
      <div className={styles.diagram}><DiagramBlock/></div>
      <div className={styles.cards}>
        <CardItem type='focus' num={focusNum} />
        <CardItem type='pause' num={pauseNum} />
        <CardItem type='stop' num={stopNum} />
      </div>
    </div>
  );
}
