import React from 'react';
import styles from './contentstatistic.css';

interface IContentProps {
  children?: React.ReactNode;
}

export function ContentStatistic({ children }: IContentProps) {
  return (
    <main className={styles.content}>
      {children}
    </main>
  );
}
