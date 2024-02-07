import { Button } from 'src/shared/components/Button';

import { IForm } from './form.interface';

import styles from './form.module.css';

export const Form = ({ value, onChange = () => {}, onSubmit = () => {} }: IForm) => {
  return (
    <form
      action="#"
      className={styles.form}
      onSubmit={onSubmit}
    >
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
