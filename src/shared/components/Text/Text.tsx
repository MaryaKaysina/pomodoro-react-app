import classNames from 'classnames';

import { EColors, ITextProps } from './text.interface';

import styles from './text.module.css';

export const Text = (props: ITextProps) => {
  const {
    As = 'span',
    color = EColors.black,
    bold = false,
    children,
    size,
    mobileSize,
    tabletSize,
    desktopSize
  } = props;

  const classes = classNames(
    styles[`s${size}`],
    styles[color],
    { [styles.bold]: bold },
    { [styles[`m${mobileSize}`]]: mobileSize },
    { [styles[`t${tabletSize}`]]: tabletSize },
    { [styles[`d${desktopSize}`]]: desktopSize },
  );

  return (
    <As className={classes}>
      { children }
    </As>
  );
}
