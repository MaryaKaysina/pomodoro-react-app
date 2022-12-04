import React from 'react';
import { EIcons, Icon } from '../../Icon';
import { Text, EColors } from '../../Text';
import styles from './countblock.css';

interface ICountBlock {
  count?: number;
}

export function CountBlock({ count = 0 }: ICountBlock) {
  return (
    <div className={styles.countBlock}>
      {count === 0 && (
        <div className={styles.countNon}>
          <Icon name={EIcons.tomatoNonIcon} />
        </div>
      )}
      {count > 0 && (
        <>
          <div className={styles.countInfo}>
            <Icon name={EIcons.tomatoIcon} />
            <Text mobileSize={16} size={24} color={EColors.grey99} bold>x {count}</Text>
          </div>
          <div className={styles.countFooter}>
            <Text mobileSize={16} size={24} color={EColors.white} bold>
              {count} помидора
            </Text>
          </div>
        </>
      )}
    </div>
  );
}
