import React, { useEffect, useRef, useState } from 'react';
import styles from './titleblock.css';
import { Text, EColors } from '../Text';
import { Dropdown } from '../Dropdown';
import { MenuItemsList } from './MenuItemsList';
import classNames from 'classnames';

interface IPosition {
  top: number;
  left: number;
}

export function TitleBlock() {
  const [isOpen, setIsOpen] = useState(false);
  const [classList, setClassList] = useState<string>('');
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<IPosition>({ top: 0, left: 0 });

  function getPosition() {
    setTimeout(() => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        setPosition({ top: rect.top, left: rect.left });
      }
    }, 500);
  };

  useEffect(() => {
    getPosition();
    window.addEventListener('resize', getPosition);
    window.addEventListener('scroll', getPosition);
  }, []);

  useEffect(() => {
    function handleClick() {
      setIsOpen(!isOpen);
    };

    btnRef.current?.addEventListener('click', handleClick, true);

    const classes = classNames(
      styles['menuButton'],
      { [styles.isOpen]: isOpen },
    );
    setClassList(classes);

    // return btnRef.current?.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <div className={styles.titleBlock}>
      <Text As='h2' mobileSize={20} size={24} color={EColors.black}>Ваша активность</Text>
      <Dropdown
        button={
          <button
            className={classList}
            ref={btnRef}
          >
            <Text mobileSize={12} size={16} color={EColors.black}>Эта неделя</Text>
          </button>
        }
        position={position}
      >
        <div className={styles.dropdown}>
          <MenuItemsList/>
        </div>
      </Dropdown>
    </div>
  );
}
