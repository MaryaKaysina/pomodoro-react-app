import React from 'react';
import { Text, EColors } from '../Text';
import styles from './notfoundpage.css';

interface INotFoundPage {
  type?: string;
}

export function NotFoundPage({type = 'page'}: INotFoundPage) {
  const title = type === 'page' ? '404 — страница не найдена' : '404 — реддит не найден';
  const text = type === 'page' ? 'запрошенная вами страница не существует (:' : 'запрошенный вами реддит не существует (:';

  return (
    <div className={styles.notFoundBlock}>
      <Text As='h2' mobileSize={16} size={20} color={EColors.grey66}>
        {title}
      </Text>
      <img src='https://www.redditstatic.com/reddit404e.png'/>
      <Text mobileSize={12} size={16} color={EColors.grey66}>
        {text}
      </Text>
    </div>
  );
}
