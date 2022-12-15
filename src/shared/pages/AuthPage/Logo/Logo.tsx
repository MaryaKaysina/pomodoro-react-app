import styles from './logo.module.css';
import LogoImg from '../../../../assets/logo.png';

export function Logo() {
  return (
    <img className={styles.img} src={LogoImg}/>
  );
}
