import { Text, EColors } from '../../../../components/Text';

interface IDescription {
  title?: string;
  number?: string;
}

export function Description({ title = 'Введите название задачи', number = '' }: IDescription) {
  return (
    <>
      {number.length !== 0 && (
        <Text As='p' mobileSize={14} size={16} color={EColors.grey99}>
          Задача {number} -
          <Text mobileSize={14} size={16} color={EColors.black}> {title}</Text>
        </Text>
      )}
    </>
  );
}
