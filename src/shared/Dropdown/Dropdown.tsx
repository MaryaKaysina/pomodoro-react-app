import React, { useEffect, useRef } from 'react';
import styles from './dropdown.css';
import { DropdownList } from './DropdownList';

interface IPosition {
  top: number;
  left: number;
}

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  position?: IPosition;
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
      {isDropdownOpen &&
      <DropdownList position={position} onClose={() => setIsDropdownOpen(false)}>
        {children}
      </DropdownList>
      }
    </div>
  );
}
