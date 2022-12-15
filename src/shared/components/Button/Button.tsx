import classNames from 'classnames';
import React from 'react';
import styles from './button.module.css';

interface IButton {
  children: React.ReactNode;
  isDisabled?: boolean;
  isSuccess?: boolean;
  isDanger?: boolean;
  isDangerBg?: boolean;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

const NOOP = () => {};

export function Button({
  children,
  isSuccess = true,
  isDisabled = false,
  isDanger = false,
  isDangerBg = false,
  onClick = NOOP,
  onMouseDown = NOOP,
  onMouseUp = NOOP,
}: IButton) {

  const classes = classNames(
    styles['btn'],
    { [styles.isSuccess]: isSuccess },
    { [styles.isDisabled]: isDisabled },
    { [styles.isDanger]: isDanger },
    { [styles.isDangerBg]: isDangerBg },
  );

  return (
    <button
      className={classes}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </button>
  );
}
