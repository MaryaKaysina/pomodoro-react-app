import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import { IData, authRequestAsync } from 'src/store/auth/actions';
import { Button } from 'src/shared/components/Button';
import { Icon } from 'src/shared/components/Icon';

import { EIcons } from 'src/shared/components/Icon/icon.interface';
import { IModalDelete } from './modaldelete.interface';

import styles from './modaldelete.module.css';

export const ModalDelete = ({ tasks, onClose }: IModalDelete) => {
  const body = document.querySelector('body');
  const node = document.querySelector('#modal_root');
  if (!node) return null;

  const dispatch = useDispatch<any>();

  function handleClickDelete(tasks: IData) {
    tasks.currentTask = tasks.currentTask + 1;
    dispatch(authRequestAsync(tasks));
    body?.classList.remove('isModal');
    onClose?.();
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
