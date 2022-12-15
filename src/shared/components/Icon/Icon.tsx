import styles from './icon.module.css';
import {
  AddIcon,
  AddMenuIcon,
  ArrowIcon,
  ClockIcon,
  CloseIcon,
  DeleteMenuIcon,
  DownMenuIcon,
  EditMenuIcon,
  FocusIcon,
  LogoIcon, LogoutIcon, MenuIcon, MenuLinkIcon, NotFoundIcon, NotificationIcon, SettingsIcon, StopIcon, ThemeIcon, TomatoIcon, TomatoNonIcon
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
  logoutIcon = 'LogoutIcon',
  closeIcon = 'CloseIcon',
  arrowIcon = 'ArrowIcon',
  tomatoNonIcon = 'TomatoNonIcon',
  tomatoIcon = 'TomatoIcon',
  focusIcon = 'FocusIcon',
  clockIcon = 'ClockIcon',
  stopIcon = 'StopIcon',
  themeIcon = 'ThemeIcon',
  notificationIcon = 'NotificationIcon',
  settingsIcon = 'SettingsIcon',
  notFoundIcon = 'NotFoundIcon',
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
  [EIcons.logoutIcon]: <LogoutIcon />,
  [EIcons.closeIcon]: <CloseIcon />,
  [EIcons.arrowIcon]: <ArrowIcon />,
  [EIcons.tomatoNonIcon]: <TomatoNonIcon />,
  [EIcons.tomatoIcon]: <TomatoIcon />,
  [EIcons.focusIcon]: <FocusIcon />,
  [EIcons.clockIcon]: <ClockIcon />,
  [EIcons.stopIcon]: <StopIcon />,
  [EIcons.themeIcon]: <ThemeIcon />,
  [EIcons.notificationIcon]: <NotificationIcon />,
  [EIcons.settingsIcon]: <SettingsIcon />,
  [EIcons.notFoundIcon]: <NotFoundIcon />,
}

export function Icon({ name, size = 16 }: IIconProps) {
  return (
    <div className={sizeIcons[size]}>{icons[name]}</div>
  );
}
