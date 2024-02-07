import React from 'react';
import classNames from 'classnames';

import { LogoBlock } from './LogoBlock';
import { MenuBlock } from './MenuBlock';

import styles from './header.module.css';
import { useWindowSize } from 'src/hooks/useWindowSize';

export const Header = () => {
  const [ isActive, setIsActive ] = React.useState(false);
  const windowSize = useWindowSize();

  const toggleMenu = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  }

  React.useEffect(() => {
    if (windowSize.width > 650) setIsActive(false);
  }, [windowSize])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <LogoBlock />
        <div
          className={classNames(styles.menuContainer, {[styles.active]: isActive})}
        >
          <MenuBlock />
        </div>
        <button
          className={classNames(styles.hamburger, {[styles.active]: isActive})}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
