import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import { IData, authRequestAsync } from '../../../../store/auth/actions';

import { Button } from '../../../components/Button';
import { Icon, EIcons } from '../../../components/Icon';


import styles from './modaldelete.module.css';

interface IModalDelete {
  tasks: IData[];
  onClose?: () => void;
}

const NOOP = () => {};

export function ModalDelete({ tasks, onClose }: IModalDelete) {
  const body = document.querySelector('body');
  const node = document.querySelector('#modal_root');
  if (!node) return null;

  const dispatch = useDispatch<any>();

  function handleClickDelete(tasks: IData[]) {
    dispatch(authRequestAsync(tasks));
    body?.classList.remove('isModal');
  }

  function handleClick() {
    onClose?.();
    body?.classList.remove('isModal');
  }

  return (
    ReactDOM.createPortal((
      <div className={styles.container}>
        <div className={styles.modalBlock} id="modalBlock">
          <h3 className={styles.modalTitle}>Удалить задачу?</h3>
          <Button isDangerBg onClick={() => handleClickDelete(tasks)}>Удалить</Button>
          <button className={styles.modalClose} onClick={handleClick}>Отмена</button>
          <button className={styles.modalCloseBtn} onClick={handleClick}>
            <Icon name={EIcons.closeIcon} />
          </button>
        </div>
      </div>
    ), node)
  );
}
