import { DEFAULT_TIME } from '../../conts';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authRequestAsync, IData } from '../../../store/auth/actions';
import { RootState } from '../../../store/reducer';
import styles from './dropdownlist.css';
import { ModalDelete } from '../../ModalDelete';

interface IPosition {
  top: number;
  left: number;
}

interface IDropdownList {
  children: React.ReactNode;
  position?: IPosition;
  taskId: number;
  onClose?: () => void;
  onClick?: () => void;
}

export function DropdownList(props: IDropdownList) {
  const [calcListTop, setCalcListTop] = useState<string>('0');
  const [calcListLeft, setCalcListLeft] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [otherData, setOtherData] = useState<IData[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const data = useSelector<RootState, IData[]>(state => state.auth.data);
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

    function upTime(time: number) {
      return time = time + DEFAULT_TIME;
    }

    function downTime(time: number) {
      return time = time - DEFAULT_TIME;
    }

    function setData(curentTime: number, currentText: string) {
      const task = {
        id: curentTask.id,
        text: currentText,
        time: curentTime,
        currentTime: 0,
        createdAt: curentTask.createdAt,
        updateddAt: Date.now(),
        done:false,
        skip:false,
      };

      let newTasks = otherTask;

      if (curentTime !== 0 && currentText.length !== 0) {
        newTasks = [ ... otherTask, task];
      }

      const newAuthData: IData[] = [{
        auth: currentData.auth,
        tasks: newTasks,
        logInDate: currentData.logInDate,
      }];

      const newData: IData[] = [ ...other, ... newAuthData ];
      dispatch(authRequestAsync(newData));
    }

    function handleClick(event: MouseEvent) {
      const modalBlock = document.querySelector('#modal_root > div > div');
      const modalContainer = document.querySelector('#modal_root > div');
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        if (event.target.contains(modalContainer) && event.target != modalBlock) {
          props.onClose?.();
          setIsOpenModal(false);
          body?.classList.remove('isModal');
        }

        if (!event.target.contains(modalContainer)) {
          props.onClose?.();
          setIsOpenModal(false);
        }

      } else {
        const cuurentAction = ((event.target as HTMLElement).parentNode as HTMLElement).dataset.action;

        if(cuurentAction === 'UpTime' || (cuurentAction === 'DownTime' && curentTime > 0)) {
          if(cuurentAction === 'UpTime') {
            curentTime = upTime(curentTask.time);
            props.onClose?.();
          }

          if(cuurentAction === 'DownTime' && curentTime > 0) {
            curentTime = downTime(curentTask.time);
            props.onClose?.();
          }

          setData(curentTime, currentText);
        }

        if(cuurentAction === 'EditTask') {
          const textInput = (document.querySelector(`input#text_task_id_${curentTask.id}`) as HTMLInputElement);
          textInput.disabled = false;
          textInput.disabled = false;
          textInput.focus();
          textInput.addEventListener('blur', () => {
            currentText = textInput.value;
            setData(curentTime, currentText);
          });
          props.onClose?.();
        }

        if(cuurentAction === 'DeleteTask') {
          body?.classList.add('isModal');
          setIsOpenModal(true);

          const newAuthData: IData[] = [{
            auth: currentData.auth,
            tasks: otherTask,
            logInDate: currentData.logInDate,
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
