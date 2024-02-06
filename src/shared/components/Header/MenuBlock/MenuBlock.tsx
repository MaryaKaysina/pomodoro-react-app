import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { authRequestAsync, IData } from '../../../../store/auth/actions';
import { RootState } from '../../../../store/reducer';
import { EIcons, Icon } from '../../Icon';
import { Text, EColors } from '../../Text';
import { ModalSettings } from '../ModalSettings';
import styles from './menublock.module.css';
import { APP_LOCAL_KEY } from '../../../../utils/conts';

export function MenuBlock() {
  const [isDark, setIsDark] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const location = useLocation();

  const ref = useRef<HTMLButtonElement>(null);

  const currentData = useSelector<RootState, IData>(state => state.auth.data);
  const settings = currentData.settings;

  const dispatch = useDispatch<any>();

  useEffect(() => {
    const localDefault = JSON.stringify([{auth: "", tasks: [], logInDate: 0}]);
    const localString = localStorage.getItem(APP_LOCAL_KEY) || localDefault;
    const localData: IData[] = JSON.parse(localString);
    const currentLocalData = localData.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1)[0];

    setIsDark(currentLocalData.isDark);
  }, []);

  function handleClick() {
    setIsDark(!isDark);
    currentData.isDark = !isDark;
    dispatch(authRequestAsync(currentData));
  }

  useEffect(() => {
    const body = document.querySelector('body');
    if (isDark) {
      body?.classList.add('isDark');
    } else {
      body?.classList.remove('isDark');
    }
  }, [isDark]);

  useEffect(() => {
    const body = document.querySelector('body');

    function handleClick(event: MouseEvent) {
      const modal = document.getElementById('modalBlock');

      if (event.target instanceof Node && ref.current?.contains(event.target)) {
        setIsOpenModal(true);
        body?.classList.add('isModal');
      } else {
        if (!modal?.contains(event.target as HTMLElement)) {
          body?.classList.remove('isModal');
          setIsOpenModal(false);
        }
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <>
      <label className={styles.switch}>
        <input
          type="checkbox"
          className={styles.switchInput}
          onChange={handleClick}
          checked={isDark}
        />
        <span className={styles.switchSlider}></span>
      </label>
      <button className={styles.settings} ref={ref}>
        <Icon name={EIcons.settingsIcon} />
      </button>
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
      {isOpenModal && <ModalSettings onClick={() => setIsOpenModal(false)} settings={settings}/>}
    </>
  );
}
