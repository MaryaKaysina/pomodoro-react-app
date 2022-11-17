import React from 'react';
import styles from './icon.css';
import {
  AddIcon,
  AddMenuIcon,
  DeleteMenuIcon,
  DownMenuIcon,
  EditMenuIcon,
  LogoIcon, MenuIcon, MenuLinkIcon
} from '../Icons';

export enum EIcons {
  logoIcon = 'LogoIcon',
  menuIcon = 'MenuIcon',
  menuLinkIcon = 'MenuLinkIcon',
  addIcon = 'AddIcon',
  addMenuIcon = 'AddMenuIcon',
  downMenuIcon = 'DownMenuIcon',
  editMenuIcon = 'EditMenuIcon',
  deleteMenuIcon = 'DeleteMenuIcon',
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
  [EIcons.addIcon]: <AddIcon />,
  [EIcons.addMenuIcon]: <AddMenuIcon />,
  [EIcons.downMenuIcon]: <DownMenuIcon />,
  [EIcons.editMenuIcon]: <EditMenuIcon />,
  [EIcons.deleteMenuIcon]: <DeleteMenuIcon />,
  [EIcons.menuLinkIcon]: <MenuLinkIcon />,
}

export function Icon({ name, size = 16 }: IIconProps) {
  return (
    <div className={sizeIcons[size]}>{icons[name]}</div>
  );
}
