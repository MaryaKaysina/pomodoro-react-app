import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdownlist.css';

interface IPosition {
  top: number;
  left: number;
}

interface IDropdownList {
  children: React.ReactNode;
  position?: IPosition;
  onClose?: () => void;
  onClick?: () => void;
}

export function DropdownList(props: IDropdownList) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        props.onClose?.();
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  const node = document.querySelector('#dropdown_root');
  if (!node) return null;

  function calcPositionMenu() {
    const top = props.position?.top || 0;
    let listTop = `${top + 60 + window.pageYOffset}px`;
    if (window.innerWidth < 1540) {
      listTop = `${top + 60 + window.pageYOffset}px`;
    }
    if (window.innerWidth < 1024) {
      listTop = `${top + 45 + window.pageYOffset}px`;
    }
    const left = props.position?.left || 0;
    let listLeft = left;

    return { listTop, listLeft};
  }

  return ReactDOM.createPortal(
    (
    <div
      className={styles.listContainer}
      ref={ref}
      style={
        {
          top: calcPositionMenu().listTop,
          left: calcPositionMenu().listLeft
        }
      }
    >
      <div className={styles.list} onClick={() => props.onClose?.()}>
        {props.children}
      </div>
    </div>
    ), node);
}
