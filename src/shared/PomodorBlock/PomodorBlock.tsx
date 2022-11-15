import React from 'react';
import { Text, EColors } from '../Text';
import styles from './pomodorblock.css';

export function PomodorBlock() {
  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <Text mobileSize={14} size={16} color={EColors.white}>Сверстать сайт</Text>
        <Text mobileSize={14} size={16} color={EColors.white}>Помидор 1</Text>
      </div>
      <div className={styles.content}>
        <div>
          
        </div>
      </div>
    </div>
  );
}
