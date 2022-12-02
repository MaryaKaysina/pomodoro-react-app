import React from 'react';
import { CountBlock } from './CountBlock';
import { DayBlock } from './DayBlock';
import styles from './statisticinfo.css';

export function StatisticInfo() {
  return (
    <div className={styles.infoBlock}>
      <DayBlock/>
      <CountBlock/>
      {/* <div><Icon name={EIcons.tomatoNonIcon} /></div>
      <div><Icon name={EIcons.tomatoIcon} /></div>
      <div><Icon name={EIcons.focusIcon} /></div>
      <div><Icon name={EIcons.clockIcon} /></div>
      <div><Icon name={EIcons.stopIcon} /></div> */}
    </div>
  );
}
