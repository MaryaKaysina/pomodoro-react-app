import React from 'react';
import { EIcons, Icon } from '../../Icon';
import styles from './countblock.css';

interface ICountBlock {
  count?: number;
}

export function CountBlock({ count = 0 }: ICountBlock) {
  return (
    <div className={styles.countBlock}>
      {count === 0 && (
        <Icon name={EIcons.tomatoNonIcon} />
      )}
    </div>
  );
}
