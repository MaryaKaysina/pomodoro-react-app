import LogoImg from 'src/assets/logo.png';

import styles from './logo.module.css';

export function Logo() {
  return (
    <img className={styles.img} src={LogoImg} alt='Logo Pomodoro App'/>
  );
}
