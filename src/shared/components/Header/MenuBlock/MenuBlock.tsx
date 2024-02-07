import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { authRequestAsync, IData } from 'src/store/auth/actions';
import { RootState } from 'src/store/reducer';
import { Icon } from 'src/shared/components/Icon';
import { Text } from 'src/shared/components/Text';
import { ModalSettings } from 'src/shared/components/Header/ModalSettings';
import { APP_LOCAL_KEY } from 'src/utils/conts';

import { EIcons } from 'src/shared/components/Icon/icon.interface';
import { EColors } from 'src/shared/components/Text/text.interface';

import styles from './menublock.module.css';

export const MenuBlock = () => {
  const [isDark, setIsDark] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const location = useLocation();

  const ref = React.useRef<HTMLButtonElement>(null);

  const currentData = useSelector<RootState, IData>(state => state.auth.data);
  const settings = currentData.settings;

  const dispatch = useDispatch<any>();

  React.useEffect(() => {
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

  React.useEffect(() => {
    const body = document.querySelector('body');
    if (isDark) {
      body?.classList.add('isDark');
    } else {
      body?.classList.remove('isDark');
    }
  }, [isDark]);

  React.useEffect(() => {
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
            <Text mobileSize={16} size={20} color={EColors.red}>Статистика</Text>
          </Link>
          <Link to='/auth' className={styles.menuBlock}>
            <Icon name={EIcons.logoutIcon} />
            <Text mobileSize={16} size={20} color={EColors.red}>Выход</Text>
          </Link>
        </>
      )}

      {location.pathname === '/statistic' && (
        <Link to='/pomodoros' className={styles.menuBlock}>
          <Icon name={EIcons.arrowIcon} />
          <Text mobileSize={16} size={20} color={EColors.red}>Назад</Text>
        </Link>
      )}
      {isOpenModal && <ModalSettings onClick={() => setIsOpenModal(false)} settings={settings}/>}
    </>
  );
}
