import React from 'react';
import styles from './logo.css';
import LogoImg from '../../../../assets/logo.png';

export function Logo() {
  return (
    <img className={styles.img} src={LogoImg}/>
  );
}
