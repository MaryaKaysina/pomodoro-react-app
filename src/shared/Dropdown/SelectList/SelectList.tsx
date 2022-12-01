import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './selectlist.css';

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

export function SelectList(props: IDropdownList) {
  const [calcListTop, setCalcListTop] = useState<string>('0');
  const [calcListLeft, setCalcListLeft] = useState<number>(0);

  const ref = useRef<HTMLDivElement>(null);

  function calcPositionMenu() {
    const top = props.position?.top || 0;
    let listTop = `${top + window.pageYOffset}px`;
    const left = props.position?.left || 0;
    let listLeft = left;

    return { listTop, listLeft};
  };

  useEffect(() => {
    setCalcListTop(calcPositionMenu().listTop);
    setCalcListLeft(calcPositionMenu().listLeft);
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        props.onClose?.();
      } else {
        const currentAction = ((event.target as HTMLElement).parentNode as HTMLElement).dataset.action;
        console.log(currentAction);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  const node = document.querySelector('#dropdown_root');
  if (!node) return null;

  return ReactDOM.createPortal(
    (<>
      <div
        className={styles.listContainer}
        ref={ref}
        style={
          {
            top: calcListTop,
            left: calcListLeft
          }
        }
      >
        <div className={styles.list} onClick={() => {}}>
          {props.children}
        </div>
      </div>
    </>
    ), node);
}
