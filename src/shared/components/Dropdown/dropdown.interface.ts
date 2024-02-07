export interface IPosition {
  top: number;
  left: number;
}

export interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  position?: IPosition;
  taskId?: number;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
