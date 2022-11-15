import React from 'react';
import styles from './icon.css';
import {
  LogoIcon, MenuIcon
} from '../Icons';

export enum EIcons {
  logoIcon = 'LogoIcon',
  menuIcon = 'MenuIcon',
}

type TSizes = 20 | 16 | 14;

interface IIconProps {
  name: EIcons;
  size?: TSizes;
}

const sizeIcons = {
  14: styles.smallIcon,
  16: styles.middleIcon,
  20: styles.largeIcon,
}

const icons = {
  [EIcons.logoIcon]: <LogoIcon />,
  [EIcons.menuIcon]: <MenuIcon />,
}

export function Icon({ name, size = 16 }: IIconProps) {
  return (
    <div className={sizeIcons[size]}>{icons[name]}</div>
  );
}
