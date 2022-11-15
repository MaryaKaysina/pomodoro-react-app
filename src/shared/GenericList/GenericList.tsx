import React from 'react';
import styles from './genericlist.css';

interface IItemList {
  element: React.ReactNode;
  id: string;
  onClick: (id: string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
  bg?: string;
  content?: string;
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
      {list.map(({ As = 'div', element, onClick = noop, className = '', id, href, bg, content = ''}) => (
        <div key={id}>
          <As
            className={className}
            onClick={() => onClick(id)}
            href={href}
            style={{ backgroundColor: bg, justifyContent: content }}
          >
            {element}
          </As>
          {divider ? <div className={classNameDivider}></div> : ''}
        </div>
      ))}
    </>
  )
}
