import { Text } from 'src/shared/components/Text';

import { EColors } from 'src/shared/components/Text/text.interface';
import { IHeader } from './header.interface';

import styles from './header.module.css';

export const Header = ({ title = 'Введите название задачи', number = 0 }: IHeader) => {
  return (
    <div className={styles.header}>
      <Text mobileSize={14} size={16} color={EColors.white} bold>{title}</Text>
      <Text mobileSize={14} size={16} color={EColors.white}>
        {number !== 0 ? `Помидор ${number}` : ''}
      </Text>
    </div>
  );
}
