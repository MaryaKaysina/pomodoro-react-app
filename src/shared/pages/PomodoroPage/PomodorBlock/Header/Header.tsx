import { Text, EColors } from '../../../../components/Text';
import styles from './header.module.css';

interface IHeader {
  title?: string;
  number?: number;
}

export function Header({ title = 'Введите название задачи', number = 0 }: IHeader) {
  return (
    <div className={styles.header}>
      <Text mobileSize={14} size={16} color={EColors.white} bold>{title}</Text>
      <Text mobileSize={14} size={16} color={EColors.white}>
        {number !== 0 ? `Помидор ${number}` : ''}
      </Text>
    </div>
  );
}
