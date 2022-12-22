import { useEffect, useState } from 'react';
import styles from './menuitemslist.module.css';
import classNames from 'classnames';

import { Text, EColors } from '../../../../../../../components/Text';
import { EIcons, Icon } from '../../../../../../../components/Icon';
import { GenericList } from '../../../../../../../components/GenericList';
import { generateId } from '../../../../../../../../utils/react/generateRandomIndex';
import { merge } from '../../../../../../../../utils/js/merge';
import { useSelector } from 'react-redux';
import { ITask } from '../../../../../../../../store/auth/actions';
import { RootState } from '../../../../../../../../store/reducer';

interface IMenuItemsList {
  taskId: number;
}

const LIST_DEFAULT = [
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

