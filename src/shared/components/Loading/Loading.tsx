import React from 'react';
import styles from './loading.css';

export function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}
