import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../Button';
import { ErrorBlock } from '../../ErrorBlock';
import { Text, EColors } from '../../Text';
import styles from './formauth.css';

interface IError {
  code: number;
  message: string;
}

interface IFormAuth {
  valueName: string;
  valueMail: string;
  valueCheck: string;
  authError: IError;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: FormEvent) => void;
}

const NOOP = () => {};

export function FormAuth(
  {
    valueName,
    valueMail,
    valueCheck,
    authError,
    onChange = NOOP,
    onSubmit = NOOP
  }: IFormAuth) {

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}>
      <Text As='h2' mobileSize={16} size={24} color={EColors.white}>
        Совсем чуть-чуть и можем начинать!
      </Text>
      <div className={styles.inputBlock}>
        <label htmlFor="name" className={styles.label}>Введите имя</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          placeholder='Ваше имя'
          onChange={onChange}
          value={valueName}
        />

        {authError && authError.code === 111 && (
          <ErrorBlock message={authError.message}/>
        )}
      </div>

      <div className={styles.inputBlock}>
        <label htmlFor="mail" className={styles.label}>Введите email</label>
        <input
          className={styles.input}
          type="mail"
          id="mail"
          placeholder='E-mail'
          onChange={onChange}
          value={valueMail}
        />

        {authError &&
        (authError.code === 112 || authError.code === 113) &&
        (
          <ErrorBlock message={authError.message}/>
        )}
      </div>

      <Button>
        {/* <Link to='/pomodoros'> */}
          Зарегистрироваться
        {/* </Link> */}
        {authError && authError.code === 114 && (
          <ErrorBlock message={authError.message}/>
        )}
      </Button>

      <label className={styles.labelCheckbox}>
        <input
          className={styles.inputCheckbox}
          type="checkbox"
          id='agree'
          placeholder='E-mail'
          defaultChecked={valueCheck === 'true'}
          onChange={onChange}
        />
        <span className={styles.checkbox}></span>
        Согласен на обработку персональных данных
      </label>
    </form>
  );
}
