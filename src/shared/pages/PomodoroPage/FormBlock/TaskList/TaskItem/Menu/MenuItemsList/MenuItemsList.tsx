import React from 'react';
import styles from './menuitemslist.module.css';
import classNames from 'classnames';

import { Text, EColors } from '../../../../../../../components/Text';
import { EIcons, Icon } from '../../../../../../../components/Icon';
import { GenericList } from '../../../../../../../components/GenericList';
import { generateId } from '../../../../../../../../utils/react/generateRandomIndex';
import { merge } from '../../../../../../../../utils/js/merge';

interface IMenuItemsList {
  taskId: number;
}

const LIST = [
  {
    As: 'button' as const,
    element:
    <>
      <Icon name={EIcons.addMenuIcon} size={16}/>
      <Text mobileSize={12} size={16} color={EColors.grey99}>Увеличить</Text>
    </>,
    className: classNames(styles.menuItem),
    dataAction: 'UpTime',
  },
  {
    As: 'button' as const,
    element:
    <>
      <Icon name={EIcons.downMenuIcon} size={16}/>
      <Text mobileSize={12} size={16} color={EColors.grey99}>Уменьшить</Text>
    </>,
    className: classNames(styles.menuItem),
    dataAction: 'DownTime',
  },
  {
    As: 'button' as const,
    element:
    <>
      <Icon name={EIcons.editMenuIcon} size={16}/>
      <Text mobileSize={12} size={16} color={EColors.grey99}>Редактировать</Text>
    </>,
    className: styles.menuItem,
    dataAction: 'EditTask',
  },
  {
    As: 'button' as const,
    element:
      <>
        <Icon name={EIcons.deleteMenuIcon} size={16}/>
        <Text mobileSize={12} size={16} color={EColors.grey99}>Удалить</Text>
      </>,
    className: classNames(styles.menuItem),
    dataAction: 'DeleteTask',
  },
].map(generateId);

export function MenuItemsList({ taskId }: IMenuItemsList) {
  const [list, setList] = React.useState(LIST);

  const handleClick = (taskId: number, event: Event) => {
    // setList(list.filter((item) => item.id !== id));
  }

  return (
    <ul className={styles.menuItemsList}>
      <GenericList
        list={list.map(merge({ onclick: (event: Event) => handleClick(taskId, event) }))}
      />
    </ul>
  );
}

