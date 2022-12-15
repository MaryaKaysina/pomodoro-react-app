import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './titleblock.css';

import { Text, EColors } from '../../../components/Text';
import { useDispatch } from 'react-redux';
import { updateCurrentDay } from '../../../../store/current_day';
import { updateCurrentWeek } from '../../../../store/current_week';


interface IList {
  id: string;
  dataAction: string;
  isActive: boolean;
  element: React.ReactNode;
}

const LIST: IList[] = [
  {
    id: 'week',
    element: <Text mobileSize={12} size={16} color={EColors.black}>Эта неделя</Text>,
    dataAction: 'Week',
    isActive: true,
  },
  {
    id: 'lastweek',
    element: <Text mobileSize={12} size={16} color={EColors.black}>Прошедшая неделя</Text>,
    dataAction: 'LastWeek',
    isActive: false,
  },
  {
    id: 'twoweek',
    element: <Text mobileSize={12} size={16} color={EColors.black}>2 недели назад</Text>,
    dataAction: 'TwoWeek',
    isActive: false,
  },
];

export function TitleBlock() {
  const [isOpen, setIsOpen] = useState(false);
  const [classList, setClassList] = useState<string>('');
  const [list, setList] = useState<IList[]>(LIST);

  const btnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<any>();

  function handleClick() {
    setIsOpen(!isOpen);
  };

  const options = list.map(option => {
    if (option.isActive) return;
    return (
      <button
        className={styles.option}
        key={option.id}
        data-action={option.dataAction}
      >
        {option.element}
      </button>
    )
  });

  const optionActive = list.map(option => {
    if (!option.isActive) return;
    return (
      <button
        ref={btnRef}
        className={styles.menuButton}
        onClick={handleClick}
        key={option.id}
      >
        {option.element}
      </button>
    )
  });

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !btnRef.current?.contains(event.target)) {
        const currentAction = ((event.target as HTMLElement).parentNode as HTMLElement).dataset.action;
        if (!currentAction) return;

        const currentList: IList[] = list.map(option => {
          option.isActive = false;
          if (option.dataAction === currentAction) option.isActive = true;
          return option;
        });

        let currentWeek = 0;
        if (currentAction === 'LastWeek') currentWeek = 1;
        if (currentAction === 'TwoWeek') currentWeek = 2;

        dispatch(updateCurrentWeek(currentWeek));
        dispatch(updateCurrentDay(0));

        setList(currentList);
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  useEffect(() => {
    const classes = classNames(
      styles['selectBlock'],
      { [styles.isOpen]: isOpen },
    );
    setClassList(classes);
  }, [isOpen]);

  return (
    <div className={styles.titleBlock}>
      <Text As='h2' mobileSize={20} size={24} color={EColors.black}>Ваша активность</Text>
      <div className={classList}>
        {optionActive}
        <div className={styles.dropdown}>
        <div className={styles.selectWrapper}>
          {options}
        </div>
        </div>
      </div>
    </div>
  );
}


