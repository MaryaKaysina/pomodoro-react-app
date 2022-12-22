import React from 'react';

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
  isDisabled?: string;
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
        dataAction,
        isDisabled = 'false'
      }) => (
        <div key={id}>
          <As
            className={className}
            onClick={() => onClick()}
            href={href}
            style={{ backgroundColor: bg, justifyContent: content }}
            data-action={dataAction}
            disabled={isDisabled === 'true'}
          >
            {element}
          </As>
          {divider ? <div className={classNameDivider}></div> : ''}
        </div>
      ))}
    </>
  )
}
