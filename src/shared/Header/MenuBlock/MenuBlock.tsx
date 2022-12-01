import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EIcons, Icon } from '../../Icon';
import { Text, EColors } from '../../Text';
import styles from './menublock.css';

export function MenuBlock() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/pomodoros' && (
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
      )}

      {location.pathname === '/statistic' && (
        <Link to='/pomodoros' className={styles.menuBlock}>
          <Icon name={EIcons.arrowIcon} />
          <Text mobileSize={12} size={20} color={EColors.red}>Назад</Text>
        </Link>
      )}
    </>
  );
}
