export interface IButton {
  children: React.ReactNode;
  isDisabled?: boolean;
  isSuccess?: boolean;
  isDanger?: boolean;
  isDangerBg?: boolean;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}
