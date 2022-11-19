import React from 'react';
import styles from './copyright.css';
import { Text, EColors } from '../../Text';

export function Copyright() {
  return (
    <Text size={10} color={EColors.white}>
      Skillbox® | 2021
    </Text>
  );
}
