import classNames from 'classnames';

import { IButton } from './button.interface';

import styles from './button.module.css';

export const Button = ({
  children,
  isSuccess = true,
  isDisabled = false,
  isDanger = false,
  isDangerBg = false,
  onClick = () => {},
  onMouseDown = () => {},
  onMouseUp = () => {},
}: IButton) => {

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
