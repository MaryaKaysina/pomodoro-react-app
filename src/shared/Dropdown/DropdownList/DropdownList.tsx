import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { ITask } from '../../../store/auth/actions';
import { RootState } from '../../../store/reducer';
import styles from './dropdownlist.css';

interface IPosition {
  top: number;
  left: number;
}

interface IDropdownList {
  children: React.ReactNode;
  position?: IPosition;
  taskId?: number;
  onClose?: () => void;
  onClick?: () => void;
}

export function DropdownList(props: IDropdownList) {
  const ref = useRef<HTMLDivElement>(null);
  // const tasks = useSelector<RootState, ITask[]>(state => state.auth.data.tasks);


  useEffect(() => {
    function upTime(time: number) {
      return time = time + 1;
    }

    function downTime(time: number) {
      return time = time - 1;
    }

    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        props.onClose?.();
      } else {
        const cuurentAction = ((event.target as HTMLElement).parentNode as HTMLElement).dataset.action;
        console.log((cuurentAction));
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
    let listTop = `${top + 40 + window.pageYOffset}px`;
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
      <div className={styles.list} onClick={() => {}}>
        {props.children}
      </div>
    </div>
    ), node);
}
