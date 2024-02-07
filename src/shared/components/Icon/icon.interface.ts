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

export type TSizes = 20 | 16 | 14;

export interface IIconProps {
  name: EIcons;
  size?: TSizes;
}
