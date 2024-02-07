import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { Text } from 'src/shared/components/Text';
import { Icon } from 'src/shared/components/Icon';
import { GenericList } from 'src/shared/components/GenericList';
import { generateId } from 'src/utils/react/generateRandomIndex';
import { merge } from 'src/utils/js/merge';
import { ITask } from 'src/store/auth/actions';
import { RootState } from 'src/store/reducer';

import { EIcons } from 'src/shared/components/Icon/icon.interface';
import { EColors } from 'src/shared/components/Text/text.interface';
import { IMenuItemsList } from './menuitemlist.interface';

import styles from './menuitemslist.module.css';

import { LIST_DEFAULT } from './menuitemlist.const';

export const MenuItemsList = ({ taskId }: IMenuItemsList) => {
  const [list, setList] = useState<any>(LIST_DEFAULT);

  const currentPomodor = useSelector<RootState, ITask[]>(state => state.auth.data.tasks)
    .filter((task) => task.id === taskId)[0].pomodor;

  useEffect(() => {
    if (!currentPomodor) return;

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
        className: currentPomodor === 1 ? classNames(styles.menuItem, styles.isDisable) : classNames(styles.menuItem),
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

    setList(LIST);
  }, [currentPomodor])

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

