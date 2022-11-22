import React from 'react';
import styles from './genericlist.css';

interface IItemList {
  element: React.ReactNode;
  id: string;
  onClick?: () => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
  bg?: string;
  content?: string;
  dataAction?: string;
}

interface IGenericListProps {
  list: IItemList[];
  divider?: boolean;
  classNameDivider?: string;
}

const noop = () => {};

export function GenericList({ list, divider = false, classNameDivider }: IGenericListProps) {
  return (
    <>
      {list.map(({
        As = 'div',
        element,
        onClick = noop,
        className = '',
        id,
        href,
        bg,
        content = '',
        dataAction
      }) => (
        <div key={id}>
          <As
            className={className}
            onClick={() => onClick()}
            href={href}
            style={{ backgroundColor: bg, justifyContent: content }}
            data-action={dataAction}
          >
            {element}
          </As>
          {divider ? <div className={classNameDivider}></div> : ''}
        </div>
      ))}
    </>
  )
}
