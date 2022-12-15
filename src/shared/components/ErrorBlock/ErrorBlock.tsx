import React from 'react';
import { Text, EColors, TSizes } from '../Text';
import styles from './errorblock.css';

interface IErrorBlock {
  message: string;
  color?: EColors;
  size?: TSizes;
}

export function ErrorBlock({ message, color = EColors.white, size = 16 }: IErrorBlock) {
  return (
    <Text mobileSize={12} size={size} color={color}>
      {message}
    </Text>
  );
}
