export interface IPosition {
  top: number;
  left: number;
}

export interface IDropdownList {
  children: React.ReactNode;
  position?: IPosition;
  taskId?: number;
  onClose?: () => void;
  onClick?: () => void;
}
