import React from 'react';
import { Text, EColors } from '../Text';
import styles from './errorblock.css';

interface IErrorBlock {
  message: string;
}

export function ErrorBlock({ message }: IErrorBlock) {
  return (
    <Text mobileSize={14} size={16} color={EColors.white}>
      {message}
    </Text>
  );
}
