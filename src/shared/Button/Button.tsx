import classNames from 'classnames';
import React from 'react';
import styles from './button.css';

interface IButton {
  children: React.ReactNode;
  isDisabled?: boolean;
  isSuccess?: boolean;
  isDanger?: boolean;
}

export function Button({ children, isSuccess = true, isDisabled = false, isDanger = false }: IButton) {

  const classes = classNames(
    styles['btn'],
    { [styles.isSuccess]: isSuccess },
    { [styles.isDisabled]: isDisabled },
    { [styles.isDanger]: isDanger },
  );

  return (
    <button className={classes}>
      {children}
    </button>
  );
}
