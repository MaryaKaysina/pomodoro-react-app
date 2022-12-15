import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentDay } from '../../../../../store/current_day';
import styles from './diagramblock.css';

interface IDiagramBlock {
  tasks: number[];
  currentDay: number;
}

export function DiagramBlock({ tasks, currentDay }: IDiagramBlock) {
  const dispatch = useDispatch<any>();

  const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const currentDay = +(event.target as HTMLElement).id.replace('day','');
    dispatch(updateCurrentDay(currentDay));
  }

  const dayNames = labels.map((item, i) => {
    const classes = classNames(styles.text, {
      [styles.active]: currentDay === i
    });
    return <div
      onClick={() => {}}
      key={i}
      className={classes}>
      {item}
    </div>
  });

  const columns = labels.map((_, i) => {
    const colHeight: number | undefined = tasks[i];

    const classes = classNames(styles.column, {
      [styles.active]: currentDay === i,
      [styles.noData]: tasks[i] === 0
    });

    return (
      <button
        onClick={handleClick}
        className={classes}
        style={{ gridColumn: `${i + 2}/${i + 3}`, height: colHeight && colHeight >= 120 ? Math.floor(colHeight / 60 * 3.5) : 5 }}
        key={i}
        id={`day${i}`}
      >
      </button>
    )
  });

  const displayTime = (i: number) => {
    if (i > 59) return `${Math.floor(i / 60)} ч ${i - Math.floor(i / 60) * 60} м`;
    return `${i} м`
  }

  let rows = [];
  for (let i = 4; i > 0; --i) {
    rows.push(<div className={styles.row} style={{ gridRow: `${5 - i}` }} key={i}>
      <span className={styles.bar}></span>
      <span className={styles.timeline}>{displayTime(25 * (i))}</span>
    </div>)
  };

  return (
    <div className={styles.diagramBlock}>
      <div className={styles.container}>
        {columns}
        {rows}
        <div className={styles.xAxis}>
          <div></div>
          {dayNames}
        </div>
      </div>
    </div>
  );
}
