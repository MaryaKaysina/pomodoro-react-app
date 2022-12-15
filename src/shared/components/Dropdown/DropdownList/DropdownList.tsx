import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './dropdownlist.css';

import { IData, authRequestAsync } from '../../../../store/auth/actions';
import { RootState } from '../../../../store/reducer';

import { ModalDelete } from '../../../pages/PomodoroPage/ModalDelete';
import { setDataTasks } from '../../../../utils/js/setDataTasks';

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
  const [calcListTop, setCalcListTop] = useState<string>('0');
  const [calcListLeft, setCalcListLeft] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [otherData, setOtherData] = useState<IData[]>([]);

  const data = useSelector<RootState, IData[]>(state => state.auth.data);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<any>();

  function calcPositionMenu() {
    const top = props.position?.top || 0;
    let listTop = `${top + 40 + window.pageYOffset}px`;
    const left = props.position?.left || 0;
    let listLeft = left;

    return { listTop, listLeft};
  };

  useEffect(() => {
    setCalcListTop(calcPositionMenu().listTop);
    setCalcListLeft(calcPositionMenu().listLeft);
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');

    const currentData = data.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1)[0];
    const tasks = currentData.tasks;
    const other = data.filter((item) => item.auth !== currentData.auth);
    const curentTask = tasks.filter((task) => task.id === props.taskId)[0];
    const otherTask = tasks.filter((task) => task.id !== props.taskId);

    let curentTime = curentTask.time;
    let currentText = curentTask.text;

    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        props.onClose?.();
        setIsOpenModal(false);
        body?.classList.remove('isModal');
      } else {
        const currentAction = ((event.target as HTMLElement).parentNode as HTMLElement).dataset.action;

        if(currentAction === 'UpTime' || (currentAction === 'DownTime' && curentTime > 0)) {
          if(currentAction === 'UpTime') {
            curentTime = curentTask.time + currentData.settings.timePomodoro;
            props.onClose?.();
          }

          if(currentAction === 'DownTime' && curentTime > 0) {
            curentTime = curentTask.time - currentData.settings.timePomodoro;
            props.onClose?.();
          }
          const newData = setDataTasks({ curentTime, currentText, curentTask, otherTask, currentData,other });
          dispatch(authRequestAsync(newData));
        }

        if(currentAction === 'EditTask') {
          const textInput = (document.querySelector(`input#text_task_id_${curentTask.id}`) as HTMLInputElement);
          textInput.disabled = false;
          textInput.disabled = false;
          textInput.focus();
          textInput.addEventListener('blur', () => {
            currentText = textInput.value;
            const newData = setDataTasks({ curentTime, currentText, curentTask, otherTask, currentData,other });
            dispatch(authRequestAsync(newData));
          });
          props.onClose?.();
        }

        if(currentAction === 'DeleteTask') {
          body?.classList.add('isModal');
          setIsOpenModal(true);

          const newAuthData: IData[] = [{
            auth: currentData.auth,
            tasks: otherTask,
            logInDate: currentData.logInDate,
            pauseTime: currentData.pauseTime,
            isDark: currentData.isDark,
            settings: currentData.settings,
          }];

          setOtherData(newAuthData);
        }
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
      {isOpenModal && <ModalDelete tasks={otherData} />}
    </>
    ), node);
}
