import React from 'react';
import { Button } from '../Button';
import styles from './form.css';

export function Form() {
  return (
    <form action="#" className={styles.form}>
      <label htmlFor="newTask" className={styles.label}>Введите название задачи</label>
      <input className={styles.input} type="text" id="newTask" placeholder='Название задачи'/>
      <Button>Добавить</Button>
    </form>
  );
}
