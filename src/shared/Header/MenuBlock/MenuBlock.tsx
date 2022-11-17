import React from 'react';
import { EIcons, Icon } from '../../Icon';
import { Text, EColors } from '../../Text';
import styles from './menublock.css';

export function MenuBlock() {
  return (
    <a href='#' className={styles.menuBlock}>
      <Icon name={EIcons.menuLinkIcon} />
      <Text mobileSize={12} size={20} color={EColors.red}>Статистика</Text>
    </a>
  );
}
