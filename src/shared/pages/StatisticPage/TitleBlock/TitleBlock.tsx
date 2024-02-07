import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { Text } from 'src/shared/components/Text';
import { updateCurrentDay } from 'src/store/current_day';
import { updateCurrentWeek } from 'src/store/current_week';

import { EColors } from 'src/shared/components/Text/text.interface';
import { IList } from './titleblock.interface';

import { LIST } from './titleblock.const';

import styles from './titleblock.module.css';

export const TitleBlock = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [classList, setClassList] = React.useState<string>('');
  const [list, setList] = React.useState<IList[]>(LIST);

  const btnRef = React.useRef<HTMLButtonElement>(null);
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

  React.useEffect(() => {
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

  React.useEffect(() => {
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


