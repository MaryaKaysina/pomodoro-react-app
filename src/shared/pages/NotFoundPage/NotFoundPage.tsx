import { Link } from 'react-router-dom';

import { Icon } from 'src/shared/components/Icon';
import { Content } from 'src/shared/pages/NotFoundPage/Content';

import { EIcons } from 'src/shared/components/Icon/icon.interface';

import styles from './notfoundpage.module.css';

export const NotFoundPage = () => {
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
