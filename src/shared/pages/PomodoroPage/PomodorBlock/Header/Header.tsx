import React from 'react';
import { Text, EColors } from '../../../../components/Text';
import styles from './header.css';

interface IHeader {
  title?: string;
  number?: string;
}

export function Header({ title = 'Введите название задачи', number = '' }: IHeader) {
  return (
    <div className={styles.header}>
      <Text mobileSize={14} size={16} color={EColors.white} bold>{title}</Text>
      <Text mobileSize={14} size={16} color={EColors.white}>
        {number.length !== 0 ? `Помидор ${number}` : ''}
      </Text>
    </div>
  );
}
