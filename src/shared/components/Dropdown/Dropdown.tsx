import React from 'react';

import { DropdownList } from './DropdownList';

import { IDropdownProps } from './dropdown.interface';

import styles from './dropdown.module.css';

export const Dropdown = (
  {
    button,
    children,
    position,
    isOpen,
    taskId = -1,
    onOpen = () => {},
    onClose = () => {}
  }: IDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);

  return (
    <div className={styles.container}>
      <div onClick={handleOpen}>
        {button}
      </div>
      {isDropdownOpen && taskId !== -1 &&
      <DropdownList
        taskId={taskId}
        position={position}
        onClose={() => setIsDropdownOpen(false)}
      >
        {children}
      </DropdownList>
      }
    </div>
  );
}
