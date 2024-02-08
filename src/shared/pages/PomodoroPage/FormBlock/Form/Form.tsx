import { Button } from 'src/shared/components/Button';
import { ErrorBlock } from 'src/shared/components/ErrorBlock';

import { EColors } from 'src/shared/components/Text/text.interface';
import { IForm } from './form.interface';

import styles from './form.module.css';

export const Form = ({ value, error, onChange = () => {}, onSubmit = () => {} }: IForm) => {
  return (
    <form
      action="#"
      className={styles.form}
      onSubmit={onSubmit}
    >
      <div className={styles.error}>
        {error && ( <ErrorBlock message={error.message} color={EColors.red} size={12}/> )}
      </div>
      <label htmlFor="newTask" className={styles.label}>Введите название задачи</label>
      <input
        className={styles.input}
        type="text"
        id="newTask"
        placeholder='Название задачи'
        onChange={onChange}
        value={value}
      />
      <Button>Добавить</Button>
    </form>
  );
}
