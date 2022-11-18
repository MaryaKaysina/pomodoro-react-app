import React, { useEffect, useRef } from 'react';
import styles from './menuitemslist.css';
import classNames from 'classnames';
import { Text, EColors } from '../../../../Text';
import { EIcons, Icon } from '../../../../Icon';
import { GenericList } from '../../../../GenericList';
import { generateId } from '../../../../../utils/react/generateRandomIndex';
import { merge } from '../../../../../utils/js/merge';

interface IMenuItemsList {
  taskId?: number;
}

const LIST = [
  {
    As: 'li' as const,
    element:
    <>
      <Icon name={EIcons.addMenuIcon} size={16}/>
      <Text mobileSize={12} size={16} color={EColors.grey99}>Увеличить</Text>
    </>,
    className: classNames(styles.menuItem),
  },
  {
    As: 'li' as const,
    element:
    <>
      <Icon name={EIcons.downMenuIcon} size={16}/>
      <Text mobileSize={12} size={16} color={EColors.grey99}>Уменьшить</Text>
    </>,
    className: classNames(styles.menuItem),
  },
  {
    As: 'li' as const,
    element:
    <>
      <Icon name={EIcons.editMenuIcon} size={16}/>
      <Text mobileSize={12} size={16} color={EColors.grey99}>Редактировать</Text>
    </>,
    className: styles.menuItem,
  },
  {
    As: 'li' as const,
    element:
      <>
        <Icon name={EIcons.deleteMenuIcon} size={16}/>
        <Text mobileSize={12} size={16} color={EColors.grey99}>Удалить</Text>
      </>,
    className: classNames(styles.menuItem),
  },
].map(generateId);

export function MenuItemsList({ taskId }: IMenuItemsList) {
  const [list, setList] = React.useState(LIST);

  const handleItemClick = (id: string) => {
    // setList(list.filter((item) => item.id !== id));
  }

  return (
    <ul className={styles.menuItemsList}>
      <GenericList
        list={list.map(merge({ onClick: handleItemClick }))}
      />
    </ul>
  );
}

