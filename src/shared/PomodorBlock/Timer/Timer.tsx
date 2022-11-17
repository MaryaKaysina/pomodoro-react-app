import React from 'react';
import { Icon, EIcons } from '../../Icon';
import { Text, EColors } from '../../Text';
import styles from './timer.css';

export function Timer() {
  return (
    <div className={styles.timer}>
      <Text As='h3' mobileSize={14} size={16} color={EColors.black}>25:00</Text>
      <Icon name={EIcons.addIcon} />
    </div>
  );
}
