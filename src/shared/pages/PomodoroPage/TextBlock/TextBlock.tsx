import { Text } from 'src/shared/components/Text';

import { EColors } from 'src/shared/components/Text/text.interface';

import styles from './textblock.module.css';

export const TextBlock = () => {
  return (
    <>
      <Text As='h2' mobileSize={20} size={24} color={EColors.black}>Ура! Теперь можно начать работать:</Text>
      <ul className={styles.list}>
        <li>
          <Text mobileSize={14} size={16} color={EColors.black}>
            Выберите категорию и напишите название текущей задачи
          </Text>
        </li>
        <li>
          <Text mobileSize={14} size={16} color={EColors.black}>
            Запустите таймер («помидор»)
          </Text>
        </li>
        <li>
          <Text mobileSize={14} size={16} color={EColors.black}>
            Работайте пока «помидор» не прозвонит
          </Text>
        </li>
        <li>
          <Text mobileSize={14} size={16} color={EColors.black}>
            Сделайте короткий перерыв (3-5 минут)
          </Text>
        </li>
        <li>
          <Text mobileSize={14} size={16} color={EColors.black}>
            Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15&#8209;30 минут).
          </Text>
        </li>
      </ul>
    </>
  );
}
