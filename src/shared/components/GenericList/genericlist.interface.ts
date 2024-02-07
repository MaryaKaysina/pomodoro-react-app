export interface IItemList {
  element: React.ReactNode;
  id: string;
  onClick?: () => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
  bg?: string;
  content?: string;
  dataAction?: string;
  isDisabled?: string;
}

export interface IGenericListProps {
  list: IItemList[];
  divider?: boolean;
  classNameDivider?: string;
}
