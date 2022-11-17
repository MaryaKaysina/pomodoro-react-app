import classNames from 'classnames';
import React from 'react';
import styles from './button.css';

interface IButton {
  children: React.ReactNode;
  isDisabled?: boolean;
}

export function Button({ children, isDisabled = false }: IButton) {

  const classes = classNames(
    styles['btn'],
    { [styles.isDisabled]: isDisabled },
  );

  return (
    <button className={classes}>
      {children}
    </button>
  );
}
