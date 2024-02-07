import { useEffect, useRef, useState } from 'react';

import { Dropdown } from 'src/shared/components/Dropdown';
import { MenuIcon } from 'src/shared/components/Icons';
import { MenuItemsList } from 'src/shared/pages/PomodoroPage/FormBlock/TaskList/TaskItem/Menu/MenuItemsList';
import { IMenu, IPosition } from './menu.interface';

import styles from './menu.module.css';

export const Menu = ({ taskId }: IMenu) => {
  const [isOpen, setIsOpen] = useState(false);
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
              <button className={styles.menuButton} ref={btnRef} onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon/>
              </button>
            }
            position={position}
            isOpen={isOpen}
          >
            <div className={styles.dropdown}>
              <MenuItemsList taskId={taskId}/>
            </div>
          </Dropdown>
        </div>
    </div>
  );
}

