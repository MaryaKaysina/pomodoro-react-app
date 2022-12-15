import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, EIcons } from '../../components/Icon';
import { Content } from './Content';
import styles from './notfoundpage.css';

export function NotFoundPage() {
  const title = '404 — страница не найдена';
  const text = 'запрошенная вами страница не существует (:';

  return (
    <div className={styles.notFoundBlock}>
      <Content>
        <p>404: Page not found</p>
        <Icon name={EIcons.notFoundIcon} />
        <div>
          <span>How did you get here?! You should </span>
          <Link to='/auth'>go back to work!</Link>
        </div>
      </Content>
    </div>
  );
}
