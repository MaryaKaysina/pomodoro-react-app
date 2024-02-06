import classNames from 'classnames';
import React from 'react';
import styles from './input.module.css';
import { IInput } from './input.interface';
import { ErrorBlock } from 'src/shared/components/ErrorBlock';

export function Input({
    label,
    placeholder,
    error,
    id,
    type,
    onChange = () => {},
    value
  }: IInput) {
  return (
    <div className={styles.inputBlock}>
      <label htmlFor="name" className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />

      {error && error.code && <ErrorBlock message={error.message}/>}
    </div>
  );
}
