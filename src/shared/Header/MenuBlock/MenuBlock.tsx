import React from 'react';
import { Link } from 'react-router-dom';
import { EIcons, Icon } from '../../Icon';
import { Text, EColors } from '../../Text';
import styles from './menublock.css';

export function MenuBlock() {
  return (
    <>
      <Link to='/statistic' className={styles.menuBlock}>
        <Icon name={EIcons.menuLinkIcon} />
        <Text mobileSize={12} size={20} color={EColors.red}>Статистика</Text>
      </Link>
      <Link to='/auth' className={styles.menuBlock}>
        <Icon name={EIcons.logoutIcon} />
        <Text mobileSize={12} size={20} color={EColors.red}>Выход</Text>
      </Link>
    </>
  );
}
