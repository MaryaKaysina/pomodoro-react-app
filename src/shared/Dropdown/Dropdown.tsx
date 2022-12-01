import React, { useEffect } from 'react';
import styles from './dropdown.css';
import { DropdownList } from './DropdownList';
import { SelectList } from './SelectList';

interface IPosition {
  top: number;
  left: number;
}

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  position?: IPosition;
  taskId?: number;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function Dropdown(
  {
    button,
    children,
    position,
    isOpen,
    taskId = -1,
    onOpen = NOOP,
    onClose = NOOP
  }: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);

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
      {isDropdownOpen && taskId === -1 &&
      <SelectList
        position={position}
        onClose={() => setIsDropdownOpen(false)}
      >
        {children}
      </SelectList>
      }
    </div>
  );
}
