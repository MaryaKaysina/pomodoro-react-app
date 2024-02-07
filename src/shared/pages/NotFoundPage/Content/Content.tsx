import { IContentProps } from './content.interface';

import styles from './content.module.css';

export const Content = ({ children }: IContentProps) => {
  return (
    <main className={styles.content}>
      {children}
    </main>
  );
}
