import React from 'react';
import styles from './logo.css';
import logo from './logo.png';

export function Logo() {
  return (
    <img className={styles.img} src={logo}/>
  );
}
