import React from 'react';
import { Text, EColors } from '../../../../components/Text';
import styles from './description.css';

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
