import React from 'react';
import { EIcons, Icon } from '../../Icon';
import { Text, EColors } from '../../Text';
import styles from './countblock.css';

interface ICountBlock {
  count?: number;
}

export function CountBlock({ count = 0 }: ICountBlock) {
  function numWord(value: number, words: string[]){
    value = Math.abs(value) % 100;
    const num = value % 10;

    if(value > 10 && value < 20) return words[2];
    if(num > 1 && num < 5) return words[1];
    if(num == 1) return words[0];
    return words[2];
  }

  const formatWord = ['помидор','помидора','помидоров'];

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
              {count} {numWord(count, formatWord)}
            </Text>
          </div>
        </>
      )}
    </div>
  );
}
