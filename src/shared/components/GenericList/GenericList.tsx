import { IGenericListProps } from './genericlist.interface';

export const GenericList = ({ list, divider = false, classNameDivider }: IGenericListProps) => {
  return (
    <>
      {list.map(({
        As = 'div',
        element,
        onClick = () => {},
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
