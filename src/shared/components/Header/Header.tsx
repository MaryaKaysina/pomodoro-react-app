import styles from './header.module.css';
import { LogoBlock } from './LogoBlock';
import { MenuBlock } from './MenuBlock';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <LogoBlock />
        <div className={styles.menuContainer}>
          <MenuBlock />
        </div>
      </div>
    </header>
  );
}
