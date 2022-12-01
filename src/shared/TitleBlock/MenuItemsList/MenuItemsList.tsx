import React, { useEffect, useRef } from 'react';
import styles from './menuitemslist.css';
import classNames from 'classnames';
import { Text, EColors } from '../../Text';
import { GenericList } from '../../GenericList';
import { generateId } from '../../../utils/react/generateRandomIndex';
import { merge } from '../../../utils/js/merge';

const LIST = [
  {
    As: 'button' as const,
    element: <Text mobileSize={12} size={16} color={EColors.black}>Эта неделя</Text>,
    className: classNames(styles.menuItem),
    dataAction: 'Week',
  },
  {
    As: 'button' as const,
    element: <Text mobileSize={12} size={16} color={EColors.black}>Прошедшая неделя</Text>,
    className: classNames(styles.menuItem),
    dataAction: 'LastWeek',
  },
  {
    As: 'button' as const,
    element: <Text mobileSize={12} size={16} color={EColors.black}>2 недели назад</Text>,
    className: styles.menuItem,
    dataAction: 'TwoWeek',
  },
].map(generateId);

export function MenuItemsList() {
  const [list, setList] = React.useState(LIST);

  const handleClick = (event: Event) => {
    console.log('handleItemClick');
    // setList(list.filter((item) => item.id !== id));
  }

  return (
    <ul className={styles.menuItemsList}>
      <GenericList
        list={list.map(merge({ onclick: (event: Event) => handleClick(event) }))}
        divider
        classNameDivider={styles.divider}
      />
    </ul>
  );
}

