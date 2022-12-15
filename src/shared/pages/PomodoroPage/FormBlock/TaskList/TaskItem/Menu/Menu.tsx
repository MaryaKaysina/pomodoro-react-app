import React, { useEffect, useRef, useState } from 'react';
import styles from './menu.css';

import { MenuItemsList } from './MenuItemsList';
import { Dropdown } from '../../../../../../components/Dropdown';
import { MenuIcon } from '../../../../../../components/Icons';

interface IPosition {
  top: number;
  left: number;
}

interface IMenu {
  taskId: number;
}

export function Menu({ taskId }: IMenu) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<IPosition>({ top: 0, left: 0 });

  function getPosition() {
    setTimeout(() => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        setPosition({ top: rect.top, left: rect.left })
      }
    }, 500)
  };

  useEffect(() => {
    getPosition();
    window.addEventListener('resize', getPosition);
    window.addEventListener('scroll', getPosition);
  }, []);

  return (
    <div className={styles.menu}>
      <div>
          <Dropdown
            taskId={taskId}
            button={
              <button
                className={styles.menuButton}
                ref={btnRef}
              >
                <MenuIcon/>
              </button>
            }
            position={position}
          >
            <div className={styles.dropdown}>
              <MenuItemsList taskId={taskId}/>
            </div>
          </Dropdown>
        </div>
    </div>
  );
}

