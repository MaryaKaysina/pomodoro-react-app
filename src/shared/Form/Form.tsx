import React, { ChangeEvent, FormEvent } from 'react';
import { Button } from '../Button';
import styles from './form.css';

interface IForm {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
}

const NOOP = () => {};

export function Form({ value, onChange = NOOP, onSubmit = NOOP }: IForm) {
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
